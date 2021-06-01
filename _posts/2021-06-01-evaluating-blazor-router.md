---
title: Evaluating Blazor Router
date: 2021-06-01 17:37:00 +0700
layout: blogdetail
published: true
---

Here is my brain dump when reviewing Blazor WebAssembly's router using the features of more established routers like [UI-Router](https://ui-router.github.io/) and [Vue Router](https://router.vuejs.org/).

### Where to define route

Inside component / razor pages, using [`@page` directive](https://docs.microsoft.com/en-us/aspnet/core/blazor/routing#route-parameters). Example:

```razor
@page "/product"
```

Be careful of two components handling the same route.

Avoid route path with dot.

### Hash based routing

Meaning: `http://localhost/#/product` instead of `http://localhost/product`.

Not available.

### Route parameter / dynamic route

In URL path:

```razor
@page "/product/{ProductID:int}"

<h1>Product @ProductID</h1>

@code {
    [Parameter]
    public int ProductID { get; set; }
}
```

Optional parameter is not supported.

There is a `OnParametersSetAsync` event to detect parameter change.

No built-in support for parameters in query string. Need to parse yourself during `NavigationManager.LocationChanged` (not async!). A helper is available in `Microsoft.AspNetCore.WebUtilities.QueryHelpers.ParseQuery`.

### Generating links

[NavLink](https://docs.microsoft.com/en-us/aspnet/core/blazor/routing#navlink-component)

```html
<NavLink href="product" Match="NavLinkMatch.Prefix">Product</NavLink>
```

How to create link with route parameter? Concatenate them yourself :)

```razor
<NavLink href=@($"product/{4}")>Product 4</NavLink>
```

Path construction relies on the `<base href="/">` tag in `wwwroot/index.html`.

### Programmatically go to a different URL

[NavigateTo](https://docs.microsoft.com/en-us/aspnet/core/blazor/routing#uri-and-navigation-state-helpers)

```razor
@inject NavigationManager NM

<button @onclick="GoTo4">Go</button>

@code {
    private void GoTo4()
    {
        NM.NavigateTo($"product/{4}");
    }
}
```

Some helpers available in `NavigationManager`: Uri, BaseUri, ToAbsoluteUri, ToBaseRelativePath.

### Handling not found

[`NotFound` tag inside `Router` tag inside `App.razor` file](https://docs.microsoft.com/en-us/aspnet/core/blazor/routing#provide-custom-content-when-content-isnt-found)

```blazor
<Router AppAssembly="@typeof(Program).Assembly" PreferExactMatches="true">
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

### Catch-all route

```blazor
@page "/product/{*astringvar}"

@code {
    [Parameter]
    public string astringvar { get; set; }
}
```

### Route redirect

Manually call `NavigateTo` within `OnInitialized`:

```razor
@page "/"
@inject NavigationManager NM

@code {
    protected override void OnInitialized()
    {
        NM.NavigateTo("/product");
    }
}
```

### Navigation guard

To prevent user refreshing the browser, changing the browser url, pressing link when there is unsaved change, etc.

No built-in support.

### Named route

None. Probably [in the future](https://github.com/dotnet/aspnetcore/issues/6352).

### Nested route

Nope. Flat routes.

### Navigation event / hook

Just `NavigationManager.LocationChanged`?

There is no oncomplete onabort beforeRouteEnter beforeRouteUpdate.

### Replace url in place / changing URL without changing state

None?

### I haven't checked

1. history back / forward
1. composite route / named view
1. route alias
1. decouple component from route
1. route meta data
1. transition
1. scrolling after navigating
1. lazy loading routes
