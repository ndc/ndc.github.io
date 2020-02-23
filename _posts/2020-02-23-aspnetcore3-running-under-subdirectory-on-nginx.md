---
title: ASP.Net Core 3 App Running under a Subdirectory on Nginx
date: 2020-02-23 19:04:00 +0700
layout: blogdetail
published: true
---

I have been adjusting to the new environment of ASP.Net Core. For example deploying to Nginx. [The official documentation](https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/linux-nginx) provided a good guidance and I managed to get an app running. As I tried more things I hit a snag when trying to deploy to a subdirectory.

I have a running app on http://mysite/, but when I tried to move it to http://mysite/firstapp/, I couldn't make it work. *&lt;rant>It was so easy in IIS&lt;/rant>* [Posted a question](https://github.com/dotnet/AspNetCore.Docs/issues/15464) on the documentation page, got some responses but still couldn't make it work, so I dropped the experiment.

Four months later [Shengjie Yan replied to my question](https://github.com/dotnet/AspNetCore.Docs/issues/15464#issuecomment-589895570). Coincidentally I currently had time to try it :) So this is my notes after I successfully did it.

Googling Shengjie's reply to understand what he means, I found that now there are more information on how to run asp.net core app under a subdirectory:

* [Bill Boga's post](https://www.billbogaiv.com/posts/net-core-hosted-on-subdirectories-in-nginx) was quite comprehensive and helped me a lot.
* The official documentation now has a section on [proxies and request path](https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/proxy-load-balancer?view=aspnetcore-3.1#deal-with-path-base-and-proxies-that-change-the-request-path).

So it turned out I just need to add a trailing slash on the nginx config's `proxy_pass`. For example:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name mysite;

    location /first/ {
        proxy_pass          http://localhost:5000/;
        proxy_http_version  1.1;
        proxy_set_header    Upgrade $http_upgrade;
        proxy_set_header    Connection keep-alive;
        proxy_set_header    Host $host;
        proxy_cache_bypass  $http_upgrade;
        proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header    X-Forwarded-Proto $scheme;
    }
}
```

This nginx config is very similar to the [config in the official documentation](https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/linux-nginx?view=aspnetcore-3.1#configure-nginx). The only differences are 

1. `location` points to a subdirectory `/first/` instead of root `/`.
1. `proxy_pass` has a trailing slash instead of just domain and port number.

So instead of `proxy_pass http://localhost:5000;` use `proxy_pass http://localhost:5000/;`. This will tell nginx to replace `/first/` with whatever it is after port number, in this case `/`. For example an http request from browser with url http://mysite/first/dashboard/ will become http://localhost:5000/dashboard/. [This Stackoverflow answer](https://stackoverflow.com/a/22759570/196451) explains this trick very clearly.

If you don't need to return URL in the response then that's all you need to do. But if you need to construct a redirect link or some other URLs, then this technique is not enough because the app needs to know the subdirectory name to construct the correct URL.

In order to tell the app the subdirectory name, we need to use a different technique, which is `UsePathBase`. In `Startup.cs`:

```c#
public class Startup
{
    // ...
    public void Configure(...)
    {
        // ...
        app.UsePathBase("/first");
```

I believe it is bad practice to have operations concern (which subdirectory the app should run) hardcoded in the app's source code. Later if we want to move the app to another subdirectory then we should recompile? No. Better put it in the `appsettings.json`:

```
{
  ...
  "Subdirectory": "/first"
```

Then we can use the config's value:

```c#
public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    private IConfiguration Configuration { get; }

    // ...
    public void Configure(...)
    {
        // ...
        app.UsePathBase(Configuration.GetValue<string>("Subdirectory"));
```

Once you set up `UsePathBase`, don't add trailing slash on `proxy_pass` (first technique). The only thing that needs to change is the nginx config's `location`, which should point to the subdirectory. So now if the request from browser is http://mysite/first/dashboard/

1. nginx will pass the complete path to the app, `/first/dashboard/`
1. the app will split the path into `/first` as PathBase and `/dashboard` as Path
1. later URL construction will use both PathBase and Path

FYI this is tried on ASP.Net Core 3.1.