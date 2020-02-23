---
title: Blazor from an Empty ASP.NET Core Template
date: 2019-10-22 18:25:00 +0700
layout: blogdetail
published: true
---

This is a note for myself when I tried Blazor (server side) for the first time. I prefer to start from an empty ASP.Net Core project and then adding parts one by one while learning the purpose of each part.

To activate Blazor on an empty ASP.Net Core project, first edit the `Startup.cs` (notes are numbered as comments below):

```c#
public class Startup
{
    public void ConfigureServices(IServiceCollection services)
    {
        // ...
        services.AddRazorPages();  // 4
        services.AddServerSideBlazor(); // 1
        // ...
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        // ...
        app.UseStaticFiles();  // 5
        app.UseRouting(); // make sure this exists
        app.UseEndpoints(endpoints =>
        {
            endpoints.MapBlazorHub();  // 2
            endpoints.MapFallbackToPage("/_Host");  // 3
        });
        // ...
    }
}
```

So 5 things:

1. Call `AddServerSideBlazor` in `ConfigureServices`.
1. Call `MapBlazorHub` in `UseEndpoints`.

   Server side Blazor uses SignalR to update pages, and this command registers the routing for Blazor's SignalR.

1. At the bottom of `UseEndpoints` call `MapFallbackToPage("/_Host")`.

   If the request doesn't match any other routes above it, send it to the `_Host.cshtml` razor page.
   This is to handle the first time load or browser refresh. After that, page update is handled by SignalR.

1. Call `AddRazorPages` in `ConfigureServices`.

   `_Host.cshtml` is a razor page, so needs to call this.

1. Call `UseStaticFiles` in `Configure`.

   Within the `_Host.cshtml` file we need to load `blazor.server.js`, which is the javascript to set up SignalR connection from browser to the server. `blazor.server.js` will be sent as static file, so we need to activate the `UseStaticFiles` routing.

`_Host.cshtml` doesn't exist yet. We need to create this razor page. Usually `_Host.cshtml` is put under `Pages` folder.

```razor
@page "/"
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Your Blazor App Title</title>
    <base href="~/" />
</head>
<body>
    <app>
        @(await Html.RenderComponentAsync<YourAppNamespace.App>(RenderMode.ServerPrerendered))
    </app>

    <script src="_framework/blazor.server.js"></script>
</body>
</html>
```

The tag `<base href="~/" />` is important if you run the blazor app on a subdirectory (not under root), for example on `http://myserver/myapp`.

There is an unfamiliar tag `<app>` containing a call to `Html.RenderComponentAsync`. This is where all Blazor components are rendered.

Interesting thing to note is that the `app` component is inside the `<body>` tag, so it can't easily manipulate the page title or the body attribute. I'm thinking about putting everything inside the `app` but then the call to `blazor.server.js` will be outside the `<html>` tag.

If you notice the tag name matches the type name used by `Html.RenderComponentAsync`. Not sure if this is important. I tried to use different tag name and the application still works, but I'm not taking chances on this.

Now let's create the `App.razor` component. Usually `App.razor` is put under the top folder adjacent to `Startup.cs`.

```razor
<Microsoft.AspNetCore.Components.Routing.Router AppAssembly="@typeof(Program).Assembly">
    <Found Context="routeData">
        <RouteView RouteData="@routeData" />
    </Found>
    <NotFound>
        <p>404</p>
    </NotFound>
</Microsoft.AspNetCore.Components.Routing.Router>
```

So it turned out `App.razor` sets up Blazor's routing.

Once you set up these 3 files, Blazor should work. Try running the app and you will get the 404 text as specified in the `App.razor`.

Extra stuff to set up:

1. Create a razor component to show something on the root.
1. Create a `wwwroot` folder to put some CSS and favicon.
1. Route exception to a generic error page in non development environment.
1. Create a default layout for components.
1. Create a `_Imports.razor` component to declare common `using`s.
