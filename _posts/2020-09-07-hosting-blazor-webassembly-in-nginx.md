---
title: Hosting Blazor WebAssembly in Nginx
date: 2020-09-07 21:33:00 +0700
layout: blogdetail
published: true
---

If you publish a blazor webassembly project, you will get a bunch of files. These files can be hosted in any web servers that can serve static files, theoretically. I tried Nginx as the server and these are my notes to make it work.

Suppose I have copied the blazor files into `/var/www/myblazorapp/` directory and I want to serve it at url www.mydomain.com/myblazorapp/. Let's add the configuration to `/etc/nginx/conf.d/wwwmydomaincom.conf`:

```nginx
server {
	listen 80;
	listen [::]:80;
	server_name www.mydomain.com;

	location /myblazorapp/ {
		root /var/www;
	}
}
```

The relationship between the `location` path and the `root` path confused me for a long time. At first I thought they were not related so I put `/myblazorapp/` as location and `/var/www/myblazorapp` as root. This didn't work. Nginx put the location path after the root path to generate the actual path. If location is `/myblazorapp/` and root is `/var/www/myblazorapp` then the generated path is `/var/www/myblazorapp/myblazorapp/`, which is wrong.

Test the configuration with `sudo nginx -t`. If the configuration is ok ask Nginx to reload: `sudo nginx -s reload`. Then open http://www.mydomain.com/myblazorapp/ with a browser. The blazor's `index.html` should load.

There are some improvements that can be made to this configuration:

One. Nginx should send the correct `Content-Type` for each file. Content-Type of `blazor.webassembly.js` should be `application/javascript`, `app.css` should be `text/css`, etc. By default the Nginx root configuration `/etc/nginx/nginx.conf` should already have these two lines: `include /etc/nginx/mime.types;` and `default_type application/octet-stream;`. This covers most MIME types. But there is one MIME type missing, for `dotnet.wasm` Content-Type should be `application/wasm`. We can add the type in `nginx.conf`:

```nginx
	types {
		application/wasm wasm;
	}
```

Or in the `wwwmydomaincom.conf` (but we have to repeat the include mime and default type lines):

```nginx
server {
	listen 80;
	listen [::]:80;
	server_name www.mydomain.com;

	location /myblazorapp/ {
		root /var/www;

		include /etc/nginx/mime.types;
		types {
			application/wasm wasm;
		}
		default_type application/octet-stream;
	}
}
```

Two. Since blazor uses `history.pushState` instead of hash based routing, we need to [redirect unknown paths to `index.html`](https://docs.microsoft.com/en-us/aspnet/core/blazor/host-and-deploy/webassembly#rewrite-urls-for-correct-routing). We can do this in Nginx using `try_files`:

```nginx
server {
	listen 80;
	listen [::]:80;
	server_name www.mydomain.com;

	location /myblazorapp/ {
		root /var/www;
		try_files $uri $uri/ /myblazorapp/index.html =404;
	}
}
```

Note on the try_files path: it also uses the root path. It ignores the location path. So if location is `/myblazorapp/` and root is `/var/www` and try_files is `/index.html` then the generated path is `/var/www/index.html`. In this case try_files should be `/myblazorapp/index.html`.

Once you added `try_files` try to browse to the about page (www.mydomain.com/myblazorapp/about/) or other subpage in the blazor app, and then refresh the browser. The blazor app should not give 404 error.

Three. Another improvement is compression. In the published blazor folder there is a `_framework` folder. Within the folder you can see three versions of each file. For example there is `blazor.webassembly.js` (uncompressed), `blazor.webassembly.js.br` (brotli compressed), and `blazor.webassembly.js.gz` (gzip compressed). The size difference is quite significant, uncompressed `blazor.webassembly.js` is 60KB while the gzip compressed one is 15KB. Wouldn't it be nice if Nginx can serve the gzip compressed version if the browser asked? It will reduce the amount of data transferred and also reduce the load time in the browser. You can enable 'static compression' in Nginx with `gzip_static`:

```nginx
server {
	listen 80;
	listen [::]:80;
	server_name www.mydomain.com;

	location /myblazorapp/ {
		root /var/www;

		location /myblazorapp/_framework/ {
			gzip_static on;
		}
	}
}
```

Since blazor provides compressed versions only on files within `_framework` folder, we can't turn on `gzip_static` on the whole folder. We turn it on only on `/myblazorapp/_framework` folder and down.

So to combine all the improvements, the `wwwmydomaincom.conf` file with MIME type, redirect to index, and compression:

```nginx
server {
	listen 80;
	listen [::]:80;
	server_name www.mydomain.com;

	location /myblazorapp/ {
		root /var/www;
		try_files $uri $uri/ /myblazorapp/index.html =404;

		include /etc/nginx/mime.types;
		types {
			application/wasm wasm;
		}
		default_type application/octet-stream;

		location /myblazorapp/_framework/ {
			gzip_static on;
		}
	}
}
```

Using Blazor WebAssembly 3.2.1, Nginx 1.14.0, Ubuntu 18.04.5.