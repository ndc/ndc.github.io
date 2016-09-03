---
title: Nancy from an MVC Developer Point of View, Revision 2
date: 2013-06-27
layout: blogdetail
published: true
redirect-from: "/article/nancy-from-mvc-dev/"
---

I am currently learning [Nancy](https://github.com/NancyFx/Nancy) and this is my braindump. If you don't yet know what Nancy is, [Nancy Homepage](http://nancyfx.org/) provides a good explanation. I want to try it because it looks more compositional than ASP.NET MVC.

I have been using ASP.NET MVC since 2010 so when learning Nancy I see it from the point of view of an ASP.NET MVC developer.

I did this on June 2013: current version of Visual Studio is Visual Studio 2012, and the latest stable release of Nancy on Nuget is version 0.17.1.

This is the [blog post](http://jhovgaard.net/from-aspnet-mvc-to-nancy-part-1) that inspired me to compare Nancy with MVC.

### How to Begin?

1. Create a new project in Visual Studio using the `ASP.NET Empty Web Application` template.
2. `Install-Package Nancy.Hosting.Aspnet`. This will nuget Nancy as dependency.
3. `Install-Package Nancy.Viewengines.Razor`.

The project is ready, containing only a Web.config file.

### Where's My Controller?

In MVC there are controllers. In Nancy there are modules. Here's a simple module:

```c#
// module name is Hello, with 'Module' suffix
public class HelloModule : Nancy.NancyModule
{
    // module constructor is very important in Nancy
    public HelloModule()
    {
        Get["/"] = Index;
        // assign a function to a route 'pattern' to handle requests that match the pattern
        // there are Get and Post collections
    }

    // this is action
    private dynamic Index(dynamic parameters)
    {
        return View["Index"];
    }
}
```

In MVC controller name ends with 'Controller'. In Nancy module name ends with 'Module'.

In MVC all routing rules are defined in 'App_Start\RouteConfig.cs'. In Nancy each module specifies what kind of route pattern it will handle.

In MVC action's return type is ActionResult. In Nancy action's return type is dynamic.

In Nancy there is always only one action parameter, and the parameter type is dynamic.

### Source Code Organization

In MVC controllers are in Controllers folder and views are in Views folder. You can copy this organization strategy in Nancy. Continuing the HelloModule example above:

* Create Modules and Views folders
* Put HelloModule into Modules
* Create Hello folder under Views folder
* Create Index.cshtml inside Views\Hello folder

But Nancy allows different source code organization. My favorite is to have one folder for each module (the folder name matches the module name) and put all relevant views and viewmodels into the same folder. For example the HelloModule:

* Create Hello folder.
* Put HelloModule into Hello folder.
* Create Index.cshtml inside Hello folder.
* Create IndexModel.cs (viewmodel) inside Hello folder.

### Viewmodel

```c#
// viewmodel name ends with 'Model'
public class IndexModel
{
    public string Code { get; set; }
    ...
}
```

Prepare the viewmodel from an action method:

```c#
private dynamic Index(dynamic parameters)
{
    var data = new IndexModel { ... };
    return data;
}
```

Nancy will look for a razor file with file name that matches the class name of the viewmodel.

For fun, try not to have any razor file to handle an action. This cute little fella will show up:

![cute little fella](http://i1144.photobucket.com/albums/o484/nnddcc/article/gerbil_zpse3ea4823.png)

    Nancy.RequestExecutionException: Oh noes! ---> Nancy.ViewEngines.ViewNotFoundException: Unable to locate view 'Index'
    Currently available view engine extensions: sshtml,html,htm,cshtml,vbhtml
    Locations inspected: ,,,,,,,,views/Hello/Index-en-US,views/Hello/Index,Hello/Index-en-US,Hello/Index,views/Index-en-US,views/Index,Index-en-US,Index

As you can see, Nancy looked for the razor file in a lot of places:

1. views/Hello/Index-en-US
2. views/Hello/Index
3. Hello/Index-en-US
4. Hello/Index
5. views/Index-en-US
6. views/Index
7. Index-en-US
8. Index

### Razor

Nancy requires this line at the top of a razor file if you want to activate intellisense for viewmodel:

    @inherits Nancy.ViewEngines.Razor.NancyRazorViewBase<IndexModel>

For example:

```html
@inherits Nancy.ViewEngines.Razor.NancyRazorViewBase<IndexModel>
<!DOCTYPE html>
<html>
<body>
    <p>@Model.Code</p>
    ...
</body>
</html>
```

When adding a HTML file into the project, don't forget to set the 'Build Action' to 'Content'. The default build action is none so the file will not be included when you publish.

### Model Binding

What about model binding? How do I populate a model from query parameters, form data, and request body?

```c#
using Nancy.ModelBinding;

public class HelloModule : Nancy.NancyModule
{
    public HelloModule()
    {
        Get["/"] = Index;
    }

    private dynamic Index(dynamic parameters)
    {
        var input = this.Bind<IndexModel>();
        // or
        // IndexModel input = this.Bind();

        ...
    }
}
```

1. Add `using Nancy.ModelBinding;`
2. Create the class that will accept the parameters.
3. Within a controller action, call `this.Bind`.

In MVC it is possible to bind to a list of objects or to a dictionary with query parameters that look like:

    list[0].code=A&list[0].name=peanut&list[1].code=B&list[1].name=butter
    dict[0].key=X&dict[0].value=fish&dict[1].key=Y&dict[1].value=chips

This is not yet supported in Nancy. So for dictionary or a list of objects, the payload has to be in the request body as JSON or XML.

### Viewbag

In MVC there are ViewData and ViewBag. Nancy has ViewBag, but not ViewData. Usage is very similar to MVC:

```c#
public class HelloModule : Nancy.NancyModule
{
    public HelloModule()
    {
        Get["/"] = Index;
    }

    private dynamic Index(dynamic parameters)
    {
        this.ViewBag.data = "send some data";
        return View["Index"];
    }
}
```

In the razor view:

```html
<p>@ViewBag.data</p>
```

### Redirect

```c#
using Nancy;

public class HelloModule : Nancy.NancyModule
{
    public HelloModule()
    {
        Get["/"] = Index;
        Get["/newlocation"] = _ => "Shifted!";
    }

    private dynamic Index(dynamic parameters)
    {
        // note the ~ at the beginning
        return Response.AsRedirect("~/newlocation");

        // don't do this because the ~ won't work
        // return new Nancy.Responses.RedirectResponse("~/newlocation");
    }
}
```

Looks like that is the one and only way to redirect in Nancy. Since routes don't have names in Nancy, there is no equivalent of MVC's RedirectToAction.

### Session

According to my [limited research](http://blog.csainty.com/2012/05/enabling-sessions-in-nancy.html) there is only one built in session mechanism in Nancy. It uses browser cookie instead of server memory (good decision in my opinion). By default it is not enabled. To enable it, the default Nancy bootstrapper needs to be overridden.

```c#
public class CustomNancyBootStrapper : Nancy.DefaultNancyBootstrapper
{
    protected override void ApplicationStartup(
        Nancy.TinyIoc.TinyIoCContainer container, Nancy.Bootstrapper.IPipelines pipelines)
    {
        base.ApplicationStartup(container, pipelines);
        Nancy.Session.CookieBasedSessions.Enable(pipelines); // this is the line
    }
}
```

To use the session:

```c#
public class HelloModule : Nancy.NancyModule
{
    public HelloModule()
    {
        Get["/"] = Index;
        Get["/newlocation"] = _ =>
        {
            var sesdata = Session["a"];     // get session data
            Session.Delete("a");            // remove data from session
            return sesdata;                 // will return 'brown fox' to browser
        };
    }

    private dynamic Index(dynamic parameters)
    {
        Session["a"] = "brown fox";         // save to session
        return new Nancy.Responses.RedirectResponse("/newlocation");
    }
}
```

### Tempdata

Looks like there is no TempData equivalent in Nancy for now, so message passing in Post-Redirect-Get scenario should use session.

### Master and Partial Page

Razor master page and partial page is available in Nancy. For example there is a layout page in `Layout\Base.cshtml` containing:

```html
@inherits Nancy.ViewEngines.Razor.NancyRazorViewBase<dynamic>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>@ViewBag.title</title>
@RenderSection("ExtraHeaders", required: false)
</head>
<body>
@RenderBody()
</body>
</html>
```

And a razor page in `Home\WithMaster.cshtml` containing:

```html
@inherits Nancy.ViewEngines.Razor.NancyRazorViewBase<dynamic>
@{
    Layout = "Layout/Base.cshtml";      // Use slash instead of backslash
                                        // Don't begin with slash
}

<p>@ViewBag.title</p>

@Html.Partial("SmallPartial")

@section ExtraHeaders{
    <link rel="stylesheet" href="custom.css" />
}
```

And a partial page in `Home\SmallPartial.cshtml` containing:

```html
<p>This is from partial</p>
```

These pages are called from this module:

```c#
public class HomeModule : Nancy.NancyModule
{
    public HomeModule()
    {
        Get["/"] = _ =>
        {
            ViewBag.title = "Yeah!";
            return View["WithMaster"];
        };
    }
}
```

### HTML Helpers

Html.ActionLink, Html.BeginForm, Html.TextBox, etc are not available.

But! For creating links, you can just use `~`. For example: `<a href="~/otherpage">Go there</a>`. The `~` can be used in other places too, like the form tag: `<form action="~/theurl">`.

### Filters

Nancy has `BeforeRequest`, `AfterRequest`, and `OnError`. Filters are set up in bootstrapper's [RequestStartup](https://github.com/NancyFx/Nancy/wiki/The-before-and-after-module-hooks) or [ApplicationStartup](https://github.com/NancyFx/Nancy/wiki/The-Application-Before%2C-After-and-OnError-pipelines).

UPDATE: Filters can also be defined inside a module and they will apply only for that module (thanks Phillip Haydon!).

```c#
public class CustomNancyBootStrapper : Nancy.DefaultNancyBootstrapper
{
    protected override void RequestStartup(
        Nancy.TinyIoc.TinyIoCContainer container, 
        Nancy.Bootstrapper.IPipelines pipelines, 
        Nancy.NancyContext context
    )
    {
        base.RequestStartup(container, pipelines, context);
        
        // hooking up filters
        pipelines.BeforeRequest += CheckSomething;
        pipelines.AfterRequest += ModifyResult;
        pipelines.OnError += HandleThisError;
    }

    protected override void ApplicationStartup(
        Nancy.TinyIoc.TinyIoCContainer container, Nancy.Bootstrapper.IPipelines pipelines)
    {
        base.ApplicationStartup(container, pipelines);

        // where to put the filter? in RequestStartup or ApplicationStartup?
        // example: if in the filter you need a database session object
        // that is request scoped, put it in RequestStartup

        pipelines.BeforeRequest += ...
    }

    // example of request filter
    private Nancy.Response CheckSomething(Nancy.NancyContext ctx)
    {
        if (ctx.Request.Headers["Magic-Word"].FirstOrDefault() != "Please")
        {
            // if you return a response object, nancy will not proceed to modules
            return new Nancy.Response { StatusCode = Nancy.HttpStatusCode.BadRequest };
        }
        // if you return null, nancy will proceed to module
        return null;
    }

    // example of response filter. Not returning anything
    private void ModifyResult(Nancy.NancyContext ctx)
    {
        // you can modify response
        ctx.Response.Headers["X-Powered-By"] = "Nancy";
    }

    // example of error filter
    private Nancy.Response HandleThisError(Nancy.NancyContext ctx, Exception ex)
    {
        return null;
    }
}
```

Example of a filter inside a module:

```c#
public class HomeModule : Nancy.NancyModule
{
    public HomeModule()
    {
        Get["/"] = _ => "Hello!";
        Before += ctx => null;      // a Before filter
    }
}
```

### Error Handling

Unhandled module errors can be caught with `OnError` filter.

Returning a HTTP error from a module can be done with something like this:

```c#
public class HomeModule : Nancy.NancyModule
{
    public HomeModule()
    {
        Get["/"] = _ =>
        {
            return new Nancy.Response { StatusCode = Nancy.HttpStatusCode.NotFound };
        };
    }
}
```

### Require HTTPS

Can be implemented as `BeforeRequest` filter.

### Output Cache, Generic Cache

As far as I know, there is no built in one. But there is a [sample code](https://github.com/NancyFx/Nancy/tree/master/src/Nancy.Demo.Caching) on how to implement output cache.

### Returning Files / Binary

In MVC, there is a 'File' response type. It is used like this:

```c#
return File(output, "application/pdf");
```

Here is how to do that in Nancy ([source](https://groups.google.com/forum/#!topic/nancy-web-framework/YOejlrL4DHI)):

```c#
public class HomeModule : Nancy.NancyModule
{
    public HomeModule()
    {
        Get["/"] = _ =>
        {
            var file = new Nancy.Response();
            file.Headers["Content-Disposition"] = "attachment; filename=afile.pdf";
            file.ContentType = "application/pdf";
            file.Contents = str =>
            {
                using (var writer = new System.IO.StreamWriter(str))
                {
                    writer.Write( ... );
                };
            };
            return file;
        };
    }
}
```
