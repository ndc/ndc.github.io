---
title: Optimistic Concurrency in RavenDB
date: 2013-06-30
layout: blogdetail
published: false
---

This post is my digest of [this article](http://ravendb.net/kb/16/using-optimistic-concurrency-in-real-world-scenarios).

Suppose I have a table called `sales`:

```sql
create table sales (
    ID              bigint not null identity,
    ...
    Version         bigint not null     -- this column for optimistic concurrency
)
```

To implement poor man optimistic concurrency with SQL, in an update statement I would increment the version and include the version in the where clause:

```sql
update sales set ... , version = 2 where id = 1 and version = 1
```

In RavenDB

I need to make use of RavenDB's optimistic concurrency check in a client server scenario. The flow of data modification is like this:

1. Server loads document 1.
2. Server creates viewmodel A from document 1.
3. Server sends viewmodel A to browser.
4. Browser modifies viewmodel A.
5. Browser sends viewmodel A to server.
6. Server loads document 1 by using viewmodel A's ID.
7. Server modifies document 1 according to viewmodel A.
8. Server save document 1.

