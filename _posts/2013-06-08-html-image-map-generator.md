---
title: HTML Image Map Generator
date: 2013-06-08
layout: blogdetail
published: true
redirect-from: "/article/html-image-map-generator/"
---

In HTML, [image map](http://en.wikipedia.org/wiki/Image_map) is used to add 'hot spots' to an image. A hot spot can have a description and a URL, and when a user clicks it, the user's browser will go to the defined URL, just like a link.

Setting an image map is a tedious process because the hot spots are determined by coordinates, and the most common way to determine hot spot coordinates is by opening up the image in a paint program, and then noting the coordinates down one by one.

There are several tools online that can help generate image map definitions. The oldest one that I have ever used (in 2010) is [image-maps.com](http://www.image-maps.com/). At that time, that page was the most useful image map generator compared to the others (in my opinion). I needed to note down a **lot** of coordinates from several images in short amount of time and I was so glad to have found that page that I donated to the author.

Now (in 2013) there are other online image map generators that are more featureful and easier to use (again, in my opinion). For example [this page](http://www.maschek.hu/imagemap/imgmap), and [another one](https://developer.cdn.mozilla.net/media/uploads/demos/s/u/summerstyle/365ccfd644f2b008c33f0046d2ba1a8f/summer-html-image-ma_1355318513_demo_package/index.html) that I think is **very** nice from Mozilla.

I have also created an image map generator, it's [over here]({{site.url}}/apps/imagemap/). In fact, this is why I wrote this blog post, to announce this new image map generator :)

I was in the middle of learning [angular.js](http://angularjs.org/) and needed to have a product to work on. When learning about angular's directive, I was looking for the kind of problem that it could solve, and image map came to my mind. The funny thing is that I finally didn't use directives for my image map generator.

Currently the generator can only produce polygon area type. It will not accept image uploads either. And it only uses dots for area visualization. But I think the interface is quite snappy, and the user interface is intuitive. But I'm biased :)

So, try it out. Give it a spin. And let me know how it goes?
