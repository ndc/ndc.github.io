---
title: Include a Blazor WebAssembly Project into an Existing ASP.NET Core Project
date: 2020-09-05 16:22:00 +0700
layout: blogdetail
published: true
---

When creating a new Blazor Webassembly project, there is [a checkbox `ASP.NET Core hosted`](https://docs.microsoft.com/en-us/aspnet/core/blazor/host-and-deploy/webassembly#hosted-deployment-with-aspnet-core) where if selected will create three projects at once, a blazor webassembly project called Client, an ASP.NET Core project called Server, and a shared library project. What is so cool about this type of project is that when the Server project is run in Visual Studio, we can debug the blazor project as well as the ASP.NET Core project at once: put breakpoint in the blazor project, put another breakpoint in the ASP.NET Core project, and if code execution goes there, both breakpoints will get hit. Another cool thing is that when the ASP.NET Core project is published, the blazor project is also included in the `wwwroot` folder.

I already have a running ASP.NET Core project so I'm not interested in using this `ASP.NET Core hosted` template. But I want this debugging both at once functionality. Unfortunately there is no clear guide on how to do that. So I had to do it the hard way: create a new `ASP.NET Core hosted` project, create a new standard ASP.NET Core Web Application, compare the `ASP.NET Core hosted` Server application with the standard ASP.NET Core application, find the differences, and learn each difference one by one. Here is what I found:

Step 1: Add `Microsoft.AspNetCore.Components.WebAssembly.Server` nuget to the ASP.NET Core application.

Step 2: Reference the Blazor WebAssembly application from the ASP.NET Core application.

```xml
<Project Sdk="Microsoft.NET.Sdk.Web">
  <!-- ... -->
  <ItemGroup>
    <!-- ... -->
    <PackageReference Include="Microsoft.AspNetCore.Components.WebAssembly.Server" Version="3.2.1" />
  </ItemGroup>

  <ItemGroup>
    <!-- ... -->
    <ProjectReference Include="..\MyBlazorApp.csproj" />
  </ItemGroup>
  <!-- ... -->
</Project>
```

Step 3: Edit the `Startup` file of the ASP.NET Core application:

1. Add `UseWebAssemblyDebugging` if running in development mode (see sample below).

    Looks like this enables debugging the blazor project.

1. Call the `UseBlazorFrameworkFiles`.

    Looks like this one is to serve the blazor files.

1. Add `MapFallbackToFile("index.html")` routing.

    Looks like this one is to route blazor properly when the user refreshes the browser.

```c#
namespace MyApp
{
    public class Startup
    {
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                // ...
                app.UseWebAssemblyDebugging();                  // this
            }

            // ...
            app.UseBlazorFrameworkFiles();                      // this

            app.UseEndpoints(endpoints =>
            {
                // ...
                endpoints.MapFallbackToFile("index.html");      // this
            });
        }
    }
}
```

Step 4: Edit the `launchSettings.json`, add `inspectUri` like so:

```json
{
    // ...
    "profiles": {
      "IIS Express": {
        // ...
        "inspectUri": "{wsProtocol}://{url.hostname}:{url.port}/_framework/debug/ws-proxy?browser={browserInspectUri}"
      },
      "MyApp": {
        // ...
        "inspectUri": "{wsProtocol}://{url.hostname}:{url.port}/_framework/debug/ws-proxy?browser={browserInspectUri}"
      }
    }
}
```

That should do it! Put some breakpoints and press F5.
