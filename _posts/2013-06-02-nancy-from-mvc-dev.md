---
title: Nancy from an MVC Developer Point of View
date: 2013-06-02
layout: blogdetail
published: true
---

I am currently learning [Nancy](https://github.com/NancyFx/Nancy) and this is my braindump. If you don't yet know what Nancy is, [Nancy Homepage](http://nancyfx.org/) provides a good explanation. I want to try it because it looks more compositional than ASP.NET MVC.

I have been using ASP.NET MVC since 2010 so when learning Nancy I see it from the point of view of an ASP.NET MVC developer.

I did this on June 2013: current version of Visual Studio is Visual Studio 2012, and the latest stable release of Nancy on Nuget is version 0.17.1.

So, how do I start using Nancy? [I've been told](http://jhovgaard.net/from-aspnet-mvc-to-nancy-part-1) that to get a Nancy environment that is as close as possible to an ASP.NET MVC environment, I should:

1. Create a new project in Visual Studio using the `ASP.NET Empty Web Application` template.
2. `Install-Package Nancy.Hosting.Aspnet`. This will nuget Nancy as dependency.
3. `Install-Package Nancy.Viewengines.Razor`.

    I ended up with an empty looking project containing only a Web.config file. Where's my controller?

    In Nancy the closest thing to a controller is a 'module'. Here's a simple module:

{% highlight c# %}
    public class HiModule : Nancy.NancyModule
    {
        public HiModule()
        {
            Get["/"] = x => "Hello World!";
        }
    }
{% endhighlight %}

    It's a useless module I know, but that's the code that piqued my interest to explore Nancy :)

    To make the project structure more similar to MVC:

4. Add a `Modules` folder and a `Views` folder.

    Pretending this is an MVC app, let's create a new route, a controller, an action, and a view:

5. Create a new class deriving from Nancy.NancyModule called HelloModule in the Modules folder.

{% highlight c# %}
    public class HelloModule : Nancy.NancyModule
    {
        public HelloModule()
        {
            Get["/"] = x => View["Index"];
        }
    }
{% endhighlight %}

6. Add a `Hello` folder in Views folder.
7. Add a `Index.html` file in folder Hello.

If you browse to "/", you will get the content of Index.html.

If an anonymous method that handles a route becomes too large (more than two lines), I turn it into a function:

{% highlight c# %}
public class HelloModule : Nancy.NancyModule
{
    public HelloModule()
    {
        Get["/"] = Index;
    }

    private dynamic Index(dynamic parameters)
    {
        return View["Index"];
    }
}
{% endhighlight %}

What if I want to use a viewmodel?

1. Create a class for the viewmodel with a name that starts with the name of the view and ends with ...Model (it's a Nancy convention).

{% highlight c# %}
    public class IndexModel
    {
        public int? Version { get; set; }
        public DateTime? LastUpdate { get; set; }
        public bool? Published { get; set; }
        public IEnumerable<string> Tags { get; set; }

        public IndexModel()
        {
            Tags = new List<string>();
        }
    }
{% endhighlight %}

2. Instantiate the viewmodel from within a controller action

{% highlight c# %}
    private dynamic Index(dynamic parameters)
    {
        var data = new IndexModel()
        {
            Version = 1,
            LastUpdate = DateTime.Now,
            Published = false,
            Tags = new List<string>() { "web", "programming" }
        };
        return data;
    }
{% endhighlight %}

3. Rename Index.html into Index.cshtml to activate razor.
4. Add `@inherits Nancy.ViewEngines.Razor.NancyRazorViewBase<IndexModel>` at the beginning of Index.cshtml.
5. In Index.cshtml refer to the viewmodel as Model.

        @inherits Nancy.ViewEngines.Razor.NancyRazorViewBase<IndexModel>
        <!DOCTYPE html>
        <html>
        <body>
            @foreach (var tag in Model.Tags)
            {
                <p>@tag</p>
            }
            <p>@(Model.LastUpdate.HasValue ? Model.LastUpdate.Value.ToString("ddd dd MMM yyyy HH:mm:ss") : "")</p>
            <p>@Model.Published</p>
            <p>@Model.Version</p>
        </body>
        </html>

Nancy deduct which view template it should use from the viewmodel name. Try to create a viewmodel that doesn't have a view template. For example let's create a "/list" route with ListModel, and then browse to "/list". This cute little fella will show up:

![cute little fella](http://i1144.photobucket.com/albums/o484/nnddcc/article/gerbil_zpse3ea4823.png)

    Nancy.RequestExecutionException: Oh noes! ---> Nancy.ViewEngines.ViewNotFoundException: Unable to locate view 'List'
    Currently available view engine extensions: sshtml,html,htm,cshtml,vbhtml
    Locations inspected: ,,,,,,,,views/Hello/List-en-US,views/Hello/List,Hello/List-en-US,Hello/List,views/List-en-US,views/List,List-en-US,List

As you can see, Nancy looked for the view template in a lot of places:

1. views/Hello/List-en-US
2. views/Hello/List
3. Hello/List-en-US
4. Hello/List
5. views/List-en-US
6. views/List
7. List-en-US
8. List

You can put the view template in one of those location and Nancy will find it.

Next, what about model binding? How do I populate a model from query parameters, form data, and request body?

1. Add `using Nancy.ModelBinding;`
2. Create the class that will accept the parameters.
3. Within a controller action, call `this.Bind`

{% highlight c# %}
    private dynamic Index(dynamic parameters)
    {
        var input = this.Bind<IndexModel>();

        // or
        // IndexModel input = this.Bind();

        var data = new IndexModel()
        {
            Version = input.Version + 1,
            LastUpdate = input.LastUpdate.Value.AddMinutes(5),
            Published = !input.Published,
            Tags = new List<string>() { "web", "programming" }
        };
        return data;
    }
{% endhighlight %}

In ASP.NET MVC, it is possible to bind to a list of objects or to a dictionary with query parameters that look like:

    list[0].code=A&list[0].name=peanut&list[1].code=B&list[1].name=butter
    dict[0].key=X&dict[0].value=fish&dict[1].key=Y&dict[1].value=chips

A quick test indicates that this is not supported in Nancy. So for dictionary or a list of objects, looks like the payload has to be in the request body as JSON or XML.
