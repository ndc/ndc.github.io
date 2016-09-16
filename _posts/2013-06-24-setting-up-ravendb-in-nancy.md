---
title: Setting Up RavenDB in Nancy
date: 2013-06-24
layout: blogdetail
published: true
redirect_from: "/article/setting-up-ravendb-in-nancy/"
---

I've been dabbling with [Nancy](http://nancyfx.org/) and [RavenDB](http://ravendb.net/) and here is my implementation notes when trying to find the best way to initialize RavenDB's DocumentStore and DocumentSession in Nancy.

My inspiration was [this blog post](http://www.dvloop.com/effective-ravendb-session-management/). The guiding principle is to rely as much as possible on Nancy's TinyIoC.

First I put the connection settings into the project's config file.

    <connectionStrings>
        <add name="RavenHQ" connectionString="Url=https://ibis.ravenhq.com/databases/abc-def;ApiKey=ffffffff-ffff-ffff-ffff-ffffffffffff" />
    </connectionStrings>

So I could create DocumentStore with something like this.

{% highlight c# %}
var docstore = new Raven.Client.Document.DocumentStore
{
    ConnectionStringName = "RavenHQ"
};
{% endhighlight %}

But since later I want to encrypt the API key, I moved the connection data to appSettings.

    <appSettings>
        <add key="RavenHQURL" value="https://ibis.ravenhq.com/databases/abc-def" />
        <add key="RavenHQAPIKey" value="ffffffff-ffff-ffff-ffff-ffffffffffff" />
    </appSettings>

Next, I created a custom bootstrapper.

{% highlight c# %}
using System.Configuration;

public class MyNancyBootStrapper : Nancy.DefaultNancyBootstrapper
{
    protected override void ConfigureApplicationContainer(
        Nancy.TinyIoc.TinyIoCContainer container)
    {
        base.ConfigureApplicationContainer(container);
        container.Register<Raven.Client.IDocumentStore>(GenerateRavenDocStore());
    }

    private Raven.Client.IDocumentStore GenerateRavenDocStore()
    {
        var ravenurl = ConfigurationManager.AppSettings["RavenHQURL"];
        var ravenkey = ConfigurationManager.AppSettings["RavenHQAPIKey"];

        var docstore = new Raven.Client.Document.DocumentStore
        {
            Url = ravenurl,
            ApiKey = ravenkey
        };
        docstore.Initialize();

        return docstore;
    }

    protected override void ConfigureRequestContainer(
        Nancy.TinyIoc.TinyIoCContainer container, Nancy.NancyContext context)
    {
        base.ConfigureRequestContainer(container, context);
        container.Register<Raven.Client.IDocumentSession>(GenerateRavenSession(container));
    }

    private Raven.Client.IDocumentSession GenerateRavenSession(
        Nancy.TinyIoc.TinyIoCContainer container)
    {
        var store = container.Resolve<Raven.Client.IDocumentStore>();
        var session = store.OpenSession();
        return session;
    }
}
{% endhighlight %}

ConfigureApplicationContainer is overridden to register IDocumentStore with application scope (one instance of IDocumentStore for the entire application). Generation of the DocumentStore is handled by the factory method GenerateRavenDocStore. Later I will decrypt the encrypted API key within GenerateRavenDocStore.

ConfigureRequestContainer is also overridden to register IDocumentSession with request scope (one instance of IDocumentSession for each HTTP request).

With this setting, I can use IDocumentSession in a module like so.

{% highlight c# %}
public class MyModule : Nancy.NancyModule
{
    private Raven.Client.IDocumentSession DB;

    public MyModule(Raven.Client.IDocumentSession session)
    {
        // save IDocumentSession in a private instance variable
        DB = session;
        
        Get["/"] = HomeIndex;
    }

    private dynamic HomeIndex(dynamic parameters)
    {
        ...
        var usr = new User { Name = "Agus" };
        
        // use IDocumentSession
        DB.Store(usr);
        DB.SaveChanges();
        ...
    }
}
{% endhighlight %}

IDocumentSession is one of the module's constructor arguments. In the constructor, IDocumentSession is saved to an instance variable so it is available to route handlers.

I prefer to call SaveChanges explicitly from within route handlers. Another option is to call SaveChanges automatically at the end of each request by using after request hook. Maybe with something like this.

{% highlight c# %}
// this is the module's constructor
public MyModule(Raven.Client.IDocumentSession session)
{
    DB = session;
    Get["/"] = HomeIndex;

    // adding an after request hook
    After += ctx =>
    {
        DB.SaveChanges();
        // or check first whether there are data changes or errors before calling SaveChanges
    };
}
{% endhighlight %}
