---
title: Optimistic Concurrency in RavenDB
date: 2013-06-30
layout: blogdetail
published: true
---

This post is my digest of [this article](http://ravendb.net/kb/16/using-optimistic-concurrency-in-real-world-scenarios).

Suppose I have a table called `sales`:

```sql
create table sales (
    ID              bigint identity constraint PK_SALES primary key,
    ...
    Version         bigint not null     -- this column for optimistic concurrency
)
```

To implement poor man optimistic concurrency with SQL, in an update statement I would include the version in the where clause so in case someone else has modified the row, this statement would not modify any rows. I would also increment the version number to not let my update get overwritten by someone else:

```sql
update sales set ... , version = 2 where id = 1 and version = 1
```

I was planning to do the same with RavenDB, but it turned out RavenDB implements optimistic concurrency differently. RavenDB follows [HTTP ETag](http://en.wikipedia.org/wiki/HTTP_ETag) mechanism.

To activate optimistic concurrency, first set the session object's `Advanced.UseOptimisticConcurrency` property to true:

```c#
var session = store.OpenSession();
session.Advanced.UseOptimisticConcurrency = true;
```

RavenDB session will remember the ETag of each entity whenever it loads the entity from database.

Next add a property to the entity class to store the ETag. If you don't want to persist this property, attach `JsonIgnore` attribute to it:

```c#
public class Sales
{
    public long Id { get; set; }
    ...
    [Raven.Imports.Newtonsoft.Json.JsonIgnore]
    public Guid? Etag { get; set; }
    ...
}
```

Next create an implementation of IDocumentConversionListener that fills the entity's ETag property during load:

```c#
public class EtagConversionListener : Raven.Client.Listeners.IDocumentConversionListener
{
    public void DocumentToEntity(string key, object entity, Raven.Json.Linq.RavenJObject document, Raven.Json.Linq.RavenJObject metadata)
    {
        var prop = entity.GetType().GetProperty("Etag");
        if (prop != null)
        {
            prop.SetValue(entity, metadata.Value<Guid>("@etag"), null);
        }
    }

    public void EntityToDocument(string key, object entity, Raven.Json.Linq.RavenJObject document, Raven.Json.Linq.RavenJObject metadata)
    {
        return;
    }
}
```

Next create an implementation of IDocumentStoreListener that fills the entity's ETag property after a successful save:

```c#
public class EtagStoreListener : Raven.Client.Listeners.IDocumentStoreListener
{
    public void AfterStore(string key, object entityInstance, Raven.Json.Linq.RavenJObject metadata)
    {
        var prop = entityInstance.GetType().GetProperty("Etag");
        if (prop != null)
        {
            prop.SetValue(entityInstance, metadata.Value<Guid>("@etag"), null);
        }
    }

    public bool BeforeStore(string key, object entityInstance, Raven.Json.Linq.RavenJObject metadata, Raven.Json.Linq.RavenJObject original)
    {
        return false;
    }
}
```

In my project's client server scenario, the flow of data modification is like this:

1. Server loads document 1.
2. Server creates viewmodel A from document 1.
3. Server sends viewmodel A to browser.
4. Browser modifies viewmodel A.
5. Browser sends viewmodel A to server.
6. Server loads document 1 by using viewmodel A's ID.
7. Server modifies document 1 according to viewmodel A.
8. Server save document 1.

Concurrency check needs to be done at point 6 and 8. It may take several minutes or longer from point 1 to point 6. During that time the document may have been modified by someone else. This is why we need to attach the ETag to viewmodel A. Before we proceed with step 7 we will compare viewmodel A's ETag with document 1's ETag that is retrieved from server at point 6:

```c#
vmA.Amount = 33000;

using (var session = store.OpenSession())
{
    session.Advanced.UseOptimisticConcurrency = true;

    var doc1 = session.Query<Sales>().Where(e => e.Code == vmA.Code).FirstOrDefault();

    // if the ETag do not match, reject changes
    if (vmA.Etag != doc1.Etag)
    {
        throw new ArgumentException("somebody modified");
    }

    doc1.Amount = vmA.Amount;

    session.SaveChanges();
}
```

There is also a (much smaller) possibility that someone else has modified document 1 between point 6 and point 8. We can rely on RavenDB session to check that the ETags still match before it commits the changes to the database. If the ETags do not match, `session.SaveChanges();` will throw a concurrency error.
