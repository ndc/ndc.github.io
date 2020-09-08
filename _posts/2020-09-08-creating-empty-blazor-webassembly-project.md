---
title: Creating Empty Blazor WebAssembly Project
date: 2020-09-08 15:19:00 +0700
layout: blogdetail
published: true
---

As of September 2020 there is no options to create an 'empty' blazor webassembly project. The formatting and example pages are useful for learning, but once I became familiar with them they turned to junk and tugged at my OCD to clean them up :)

Here is my checklist to clean up blazor webassembly project before the first commit:

1. Remove `Shared/SurveyPrompt.razor`
1. Remove `Pages/FetchData.razor`
1. Remove `Pages/Counter.razor`
1. Remove `wwwroot/sample-data`
1. Remove `wwwroot/open-iconic` (optional)
1. Clean `wwwroot/css/app.css`

    You should see the original `app.css` :) Trim it down to reduce cognitive load!

    ```css
    @import url('open-iconic/font/css/open-iconic-bootstrap.min.css');
    ```

1. Customize `Shared/MainLayout.razor`

    I prefer the `@Body` not wrapped by anything. I moved the `LoginDisplay` component for authentication to the `NavMenu.razor`.

    ```razor
    @inherits LayoutComponentBase

    <NavMenu></NavMenu>
    <br />
    @Body
    ```

1. Customize `Shared/NavMenu.razor`

    I use this more idiomatic bootstrap 4 navbar. Note the `LoginDisplay` component on the right side of the navbar (commented).

    ```razor
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink href="" class="navbar-brand">Blank Blazor WebAssembly</NavLink>
        <button class="navbar-toggler" @onclick=@(arg => collapseNavMenu = !collapseNavMenu)>
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class=@("navbar-collapse " + (collapseNavMenu ? "collapse" : ""))>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <NavLink href=@($"{""}") Match="NavLinkMatch.All" class="nav-link">
                        Something
                    </NavLink>
                </li>
            </ul>
            <ul class="navbar-nav ml-auto">
                <!-- if using authentication
                <LoginDisplay></LoginDisplay>
                -->
                <!-- for notifications etc. -->
            </ul>
        </div>
    </nav>

    @code{
        private bool collapseNavMenu = true;
    }
    ```

1. Customize `Pages/Index.razor`

    A simpler `Index.razor`:

    ```razor
    @page "/"
    <h1>Hello, world!</h1>
    ```

1. Customize `wwwroot/index.html`

    Slightly tweaked (emphasizing base href, removing error ui). Don't forget to add the script tag for `Microsoft.AspNetCore.Components.WebAssembly.Authentication` here if using authentication.

    ```html
    <!DOCTYPE html>
    <html>

    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Blank Blazor WebAssembly</title>
        <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet" />
        <link href="css/app.css" rel="stylesheet" />

        <!-- Don't forget to set this base path to the right value -->
        <base href="/" />
    </head>

    <body>
        <app>Loading...</app>

        <!-- if using authentication
        <script src="_content/Microsoft.AspNetCore.Components.WebAssembly.Authentication/AuthenticationService.js"></script>
        -->
        <script src="_framework/blazor.webassembly.js"></script>
    </body>

    </html>
    ```

1. Customize `wwwroot/favicon.ico`

    Just drop your usual logo here.
