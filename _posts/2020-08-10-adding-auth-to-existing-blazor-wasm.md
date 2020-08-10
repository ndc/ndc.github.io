---
title: Adding Authentication to an Existing Blazor Webassembly Application
date: 2020-08-10 18:29:00 +0700
layout: blogdetail
published: true
---

When I created my blazor webassembly application, I didn't need authentication. Within the _Create a new Blazor app_ wizard, I chose _No Authentication_. Fast forward several months and now I want to have authentication in my application. What should I do?

I created one new blazor app without authentication, another with authentication, and compared the content. Here is the list of steps to make a new blazor webassembly without authentication into a new blazor webassembly with _Individual User Accounts_ authentication.

Add nuget package _Microsoft.AspNetCore.Components.WebAssembly.Authentication_. Differences in the `csproj` file:

```xml
<!-- ... -->
<PackageReference Include="Microsoft.AspNetCore.Components.WebAssembly.Authentication" Version="3.2.1" />
<!-- ... -->
```

Activate authentication service using `AddOidcAuthentication`. Differences in the `Program.cs` file:

```c#
namespace MyApp
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            // ...

            builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });

            // this
            builder.Services.AddOidcAuthentication(options =>
            {
                // Configure your authentication provider options here.
                // For more information, see https://aka.ms/blazor-standalone-auth
                builder.Configuration.Bind("Local", options.ProviderOptions);
            });

            // ...
        }
    }
}
```

Need to add `wwwroot/appsettings.json` to contain the authentication configuration:

```json
{
  "Local": {
    "Authority": "https:login.microsoftonline.com/",
    "ClientId": "33333333-3333-3333-33333333333333333"
  }
}
```

And `wwwroot/appsettings.Development.json`:

```json
{
  "Local": {
    "Authority": "https:login.microsoftonline.com/",
    "ClientId": "33333333-3333-3333-33333333333333333"
  }
}
```

Add reference in `_Imports.razor`:

```razor
@* ... *@
@using Microsoft.AspNetCore.Components.Authorization
@* ... *@
```

Add script tag in `wwwroot/index.html`:

```html
<body>
    <!-- ... -->

    <!-- this -->
    <script src="_content/Microsoft.AspNetCore.Components.WebAssembly.Authentication/AuthenticationService.js"></script>
    <script src="_framework/blazor.webassembly.js"></script>
</body>
```

Change the `App.razor` from:

```xml
<Router AppAssembly="@typeof(Program).Assembly">
    <Found Context="routeData">
        <RouteView RouteData="@routeData" DefaultLayout="@typeof(MainLayout)" />
    </Found>
    <NotFound>
        <LayoutView Layout="@typeof(MainLayout)">
            <p>Sorry, there's nothing at this address.</p>
        </LayoutView>
    </NotFound>
</Router>
```

To:

```xml
<CascadingAuthenticationState>
    <Router AppAssembly="@typeof(Program).Assembly">
        <Found Context="routeData">
            <AuthorizeRouteView RouteData="@routeData" DefaultLayout="@typeof(MainLayout)">
                <NotAuthorized>
                    @if (!context.User.Identity.IsAuthenticated)
                    {
                        <RedirectToLogin />
                    }
                    else
                    {
                        <p>You are not authorized to access this resource.</p>
                    }
                </NotAuthorized>
            </AuthorizeRouteView>
        </Found>
        <NotFound>
            <LayoutView Layout="@typeof(MainLayout)">
                <p>Sorry, there's nothing at this address.</p>
            </LayoutView>
        </NotFound>
    </Router>
</CascadingAuthenticationState>
```

Add `Shared/RedirectToLogin.razor`:

```razor
@inject NavigationManager Navigation
@using Microsoft.AspNetCore.Components.WebAssembly.Authentication
@code {
    protected override void OnInitialized()
    {
        Navigation.NavigateTo($"authentication/login?returnUrl={Uri.EscapeDataString(Navigation.Uri)}");
    }
}
```

Add `Shared/LoginDisplay.razor`:

```razor
@using Microsoft.AspNetCore.Components.Authorization
@using Microsoft.AspNetCore.Components.WebAssembly.Authentication

@inject NavigationManager Navigation
@inject SignOutSessionStateManager SignOutManager

<AuthorizeView>
    <Authorized>
        Hello, @context.User.Identity.Name!
        <button class="nav-link btn btn-link" @onclick="BeginSignOut">Log out</button>
    </Authorized>
    <NotAuthorized>
        <a href="authentication/login">Log in</a>
    </NotAuthorized>
</AuthorizeView>

@code{
    private async Task BeginSignOut(MouseEventArgs args)
    {
        await SignOutManager.SetSignOutState();
        Navigation.NavigateTo("authentication/logout");
    }
}
```

And insert this `LoginDisplay` component in `Shared/MainLayout.razor`:

```razor
<!-- ... -->
<div class="main">
    <div class="top-row px-4 auth">
        <!-- this -->
        <LoginDisplay />
        <a href="http://blazor.net" target="_blank" class="ml-md-auto">About</a>
<!-- ... -->
```

Add `Pages/Authentication.razor`:

```razor
@page "/authentication/{action}"
@using Microsoft.AspNetCore.Components.WebAssembly.Authentication
<RemoteAuthenticatorView Action="@Action" />

@code{
    [Parameter] public string Action { get; set; }
}
```

And that's it. The new blazor webassembly without auth has become blazor webassembly with individual user accounts auth.

[The official documentation](https://docs.microsoft.com/en-us/aspnet/core/blazor/security/webassembly/standalone-with-authentication-library) has further info about standalone app with the auth library.