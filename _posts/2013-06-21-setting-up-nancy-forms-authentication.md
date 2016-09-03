---
title: Setting Up Nancy Forms Authentication
date: 2013-06-21
layout: blogdetail
published: true
redirect-from: "/article/setting-up-nancy-forms-authentication/"
---

This is my implementation notes when I was setting up [forms authentication](https://github.com/NancyFx/Nancy/wiki/Forms-Authentication) in a web app project that uses [Nancy](http://nancyfx.org/).

Nancy forms authentication allows user to login with username and password. It then converts this username and password into a token, and then sends the token into user's browser as a cookie. The next time user sends a request to the Nancy server, the cookie will be included in the request. Nancy can then deduct the user from the token, and allow or deny access to the page.

First step is to nuget Nancy forms authentication:

    Install-Package Nancy.Authentication.Forms

Next, implement the Nancy.Security.IUserIdentity interface. Simplest one is like this:

{% highlight c# %}
public class MyUserIdentity : Nancy.Security.IUserIdentity
{
    public string UserName { get; set; }
    public IEnumerable<string> Claims { get; set; }
}
{% endhighlight %}

But most likely you need to implement this interface on your already existing user class.

Next, implement the Nancy.Authentication.Forms.IUserMapper interface. This is used to determine the user from a received token. If you don't yet have a way to determine user from a GUID, you need to create that mechanism before you can implement this interface.

{% highlight c# %}
public class MyUserMapper : Nancy.Authentication.Forms.IUserMapper
{
    public Nancy.Security.IUserIdentity GetUserFromIdentifier(
        Guid identifier, Nancy.NancyContext context)
    {
        var data = ... get user object from database based on received GUID (identifier) ... ;
        return data;
    }
}
{% endhighlight %}

Next, create a custom bootstrapper.

{% highlight c# %}
public class MyBootStrapper : Nancy.DefaultNancyBootstrapper
{
}
{% endhighlight %}

Optional step: override ConfigureRequestContainer to set IUserMapper lifecycle to one instance per HTTP request. This is recommended if your database session lifecycle is also one instance per HTTP request.

{% highlight c# %}
public class MyBootStrapper : Nancy.DefaultNancyBootstrapper
{
    protected override void ConfigureRequestContainer(
        Nancy.TinyIoc.TinyIoCContainer container, Nancy.NancyContext context)
    {
        base.ConfigureRequestContainer(container, context);
        container.Register<Nancy.Authentication.Forms.IUserMapper, MyUserMapper>();
    }
}
{% endhighlight %}

Next, override RequestStartup. After the standard RequestStartup, add a call to FormsAuthentication.Enable.

{% highlight c# %}
public class MyBootStrapper : Nancy.DefaultNancyBootstrapper
{
    protected override void RequestStartup(
        Nancy.TinyIoc.TinyIoCContainer container,
        Nancy.Bootstrapper.IPipelines pipelines,
        Nancy.NancyContext context
    )
    {
        base.RequestStartup(container, pipelines, context);
        Nancy.Authentication.Forms.FormsAuthentication.Enable(
            pipelines,
            new Nancy.Authentication.Forms.FormsAuthenticationConfiguration()
            {
                RedirectUrl = "~/login",
                UserMapper = container.Resolve<Nancy.Authentication.Forms.IUserMapper>()
            }
        );
    }
}
{% endhighlight %}

Next, add a route so there's something in "~/login" (see RedirectUrl in FormsAuthenticationConfiguration above).

{% highlight c# %}
public class LoginModel
{
    public string username { get; set; }
    public string password { get; set; }
}

public class LoginModule : Nancy.NancyModule
{
    public LoginModule()
    {
        Get["/login"] = LogIn;
    }

    public dynamic LogIn(dynamic parameters)
    {
        var data = new LoginModel();
        return data;
    }
}
{% endhighlight %}

    <form method="post">
        <label>username</label><input type="text" name="username" />
        <label>password</label><input type="password" name="password" />
        <button type="submit">Login</button>
    </form>

Next, add a route to handle user login request. This method is responsible to check whether the password matches the username. If user provides a correct combination, find out the user's GUID from provided username and password, then call LoginAndRedirect (or LoginWithoutRedirect). LoginAndRedirect will send a cookie to user's browser.

{% highlight c# %}
using Nancy.Authentication.Forms;

public class LoginModule : Nancy.NancyModule
{
    public LoginModule()
    {
        Post["/login"] = LogInPost;
    }

    public dynamic LogInPost(dynamic parameters)
    {
        var username = (string)this.Request.Form.username;
        var password = (string)this.Request.Form.password;

        var user =  ... get user from DB based on username ... ;

        if ( ... username matches password ... )
        {
            var token =  ... get user's GUID ... ;
            return this.LoginAndRedirect(token);
        }
        else
        {
            throw new ArgumentException("Invalid username or password");
        }
    }
}
{% endhighlight %}

Next, add a route to handle logout requests. Within the method call LogoutAndRedirect. Then provide links to this in the HTML.

{% highlight c# %}
using Nancy.Authentication.Forms;

public class LoginModule : Nancy.NancyModule
{
    public LoginModule()
    {
        Get["/logout"] = LogOut;
    }

    public dynamic LogOut(dynamic parameters)
    {
        return this.LogoutAndRedirect("~/");
    }
}
{% endhighlight %}

Next, in modules that require authentication, add a call to RequiresAuthentication.

{% highlight c# %}
public class VIPModule : Nancy.NancyModule
{
    public VIPModule()
        : base("/vip")
    {
        this.RequiresAuthentication();
        Get["/"] = _ => "VIP only!";
    }
}
{% endhighlight %}

Aaand you're done!
