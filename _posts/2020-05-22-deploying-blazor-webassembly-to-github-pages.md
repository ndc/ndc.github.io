---
title: Deploying Blazor WebAssembly to GitHub Pages
date: 2020-05-22 19:23:00 +0700
layout: blogdetail
published: true
---

Blazor WebAssembly (let's shorten it to BWA) documentation already covered [deployment gotcha to GitHub Pages](https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/blazor/webassembly#github-pages) (let's shorten it to GHP). That is, since BWA uses the `history.pushState` to manipulate URL for routing, if the user is _not_ at the application root URL and refresh the browser, the user will get 404 error, because there is nothing at the actual server at that URL.

For GHP the solution is to provide a 404 page that redirects to application root URL, while sending the rest of the URL as query string. Then the BWA's `index.html` should be modified to capture the query string and give it to the application once the application is running. Rafael Pedicini explained this solution very clearly [in his article](https://github.com/rafrex/spa-github-pages). Steven Sanderson has a [working example](https://github.com/blazor-demo/blazor-demo.github.io) of BWA in GHP using this strategy.

Unfortunately for me, the provided solution doesn't work as is. My GHP deployment has several differences from the given solution.

First difference is that I use GHP's Jekyll to generate my website. BWA package has two folders that starts with underscore, the `_framework` folder and the `_bin` folder under it. Folders/files that start with underscore will not be deployed as is by Jekyll. Rafael's example uses `.nojekyll` file put at the website root folder to disable Jekyll for the entire website.

This would be fine if my website is used solely for the BWA app. But the BWA app is only a part of the website located in a subfolder. I tried putting `.nojekyll` file at the root of the BWA folder instead of the website root folder, but it is ignored by GHP (`_framework` folder is still not deployed).

The working solution is to add the two folders into the `include` section in GHP's `_config.yml`:

```yaml
include:
  - "_bin"
  - "_framework"
```

Three important things:

1. The actual folder is located at `app/mybwa/_framework` (in my case), but it is registered as just `_framework`.
1. The value is wrapped in double quotes `"`.
1. `_bin` is registered before `_framework`.

Miss any of the three and it will not work.

Second difference is my website source code contains mixed line endings (LF and CRLF both). And I haven't set up a `.gitattributes` file. It turned out BWA has integrity check for the package and will not run if any files in the package is tampered. Git altering line endings during commit will cause error like this in the browser:

> Failed to find a valid digest in the 'integrity' attribute for resource 'http://mydomain/app/mybwa/_framework/wasm/dotnet.3.2.0.js' with computed SHA-256 integrity 'blabla...'. The resource has been blocked.

Solution is to tell git to consider everything inside the BWA folder as binary. Need to add something like this in `.gitattributes` file:

```
app/mybwa/** binary
```

Notice the double asterisks. It means consider as binary all files in said folder, and all subfolders under it.

So is my BWA running now? Not yet.

I did something else that caused the package integrity to fail. BWA needs to know the actual base URL it is running from in order to generate correct URLs. It is set in `index.html`'s `base` tag:

```html
<base href="/app/mybwa/" />
```

I would really prefer not to include the deployment location in the source code. I believe it is deployment concern and not a development concern. If I give this app to 5 people I don't want to compile for each person. Base path should be set in config file or environment variable, but I haven't found a way to do that.

So for now I set `base` to `/` in the source code like the default. This simplifies debugging too. When deploying I will publish the app and then change the published `index.html`'s `base` to `/app/mybwa/`.

This will break the integrity check. To make the app run I disabled integrity check by following [Steven Sanderson's note](https://github.com/dotnet/aspnetcore/issues/19828#issuecomment-601823319) to add `BlazorCacheBootResources` tag in the app's `.csproj` file:

```xml
<PropertyGroup>
  <!-- ... -->
  <BlazorCacheBootResources>false</BlazorCacheBootResources>
</PropertyGroup>
```

And after that my Blazor WebAssembly app runs on GitHub Pages.

Using Blazor WebAssembly version 3.2.0.