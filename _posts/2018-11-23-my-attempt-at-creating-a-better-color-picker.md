---
title: My Attempt at Creating a Better Color Picker
date: 2018-11-23 21:47:00 +0700
layout: blogdetail
published: true
---

I always consider RGB color pickers to be non-intuitive to use. At all. HSL (Hue Saturation Luminance/Lightness) color pickers are a great improvement, but the common implementations have two things that frustrate me.

First the viewer for the selected color is usually too small. Perhaps it is because of my age and my eyesight is not as good as it used to. I find that the bigger the viewer the easier it is to see subtle differences.

Second the selector for hue and saturation is usually combined. Sometimes as a rectangle with X for hue and Y for saturation, or as a circle where the edge has saturated colors and the center has bland colors. Why?! It makes it harder to pick the right hue. Hue selector should be as big as possible so the human user has a better chance to see the available colors. Besides, picking saturation is easy. It is from 0% for completely bland/gray to 100% for fully saturated. A simple slider will do.

Since I couldn't find a decent HSL color picker, I decided to [create my own]({{site.url}}/apps/colorpicker/). My color picker takes up all the available browser space. The viewer for the selected color is the biggest component. Hue selector is separated from saturation selector. It is the second biggest component. Hue selector is put horizontally so in a landscape monitor it has more space to show all the available colors. Saturation and luminance are just sliders on the side. Saturation on the left, luminance on the right.

Formula for converting HSL to RGB and back I got from: https://gist.github.com/mjackson/5311256

Source code of the color picker is available on https://github.com/ndc/old-folks-hsl-color-picker

Once the color picker is working and I had a chance to play with it, I realized some things that I wasn't aware before.

I used to wonder about the differences between saturation and luminance. By changing saturation while keeping hue and luminance the same, I think I now have a better feel for it. By reducing saturation the value of red, green, and blue are getting closer, _while having the same brightness_. By increasing saturation the value of red, green, and blue are getting farther apart, while having the same brightness.

Increasing luminance means the value of red, green, and blue are getting closer to 255. Reducing luminance means the value of red, green, and blue are getting closer to zero.

#### If you are curious about it, [why don't you try it for yourself?]({{site.url}}/apps/colorpicker/)