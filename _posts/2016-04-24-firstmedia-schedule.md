---
title: FirstMedia Schedule
date: 2016-05-06 00:00:00 +0700
layout: blogdetail
published: true
---

My cable and internet provider [FirstMedia](http://www.firstmedia.com/) offered me an upgrade for the internet connection from 10 Mbps to 18 Mbps, with bonus opening all TV channels for 6 months. I said yes.

So now I have all these channels and can't find a convenient way to check what's on. The program guide on the TV has to be manipulated by remote. FirstMedia has a [TV guide online](http://firstmedia.com/tv-guides) but the display is hard to read, difficult to search, and really not mobile device friendly.

Determined to have an easy way to check the schedule, I spent this weekend building a web page that displays the shows according to my preferences. The data is taken from the original online TV guide :)

It was also a chance for me to brush up my skills. I used [bootstrap 3](http://getbootstrap.com/) to help with the CSS, [angular 1](https://angularjs.org/) for the javascript framework, [font awesome 4](https://fortawesome.github.io/Font-Awesome/) for the icons, [lodash 4](https://lodash.com/) to help with the javascript, [moment.js 2](http://momentjs.com/) to help taming javascript date, [angular ui router 0.2](https://github.com/angular-ui/ui-router) for routing, and [angular ui bootstrap 1.3](https://angular-ui.github.io/bootstrap/) to connect angular to bootstrap. For the back end I used [Nancy 1.4](http://nancyfx.org/).

The result is not too shabby if I may say so myself :)

You can create several lists, each list contains a bunch of channels you want to display. For example you create a list called 'Movies', containing channels like HBO and Cinemax, and another list called 'News', containing CNN and Al Jazeera. You can choose which date to show, and whether to show past shows. The list can be grouped by channel or ordered by time. Also, it looks quite acceptable in mobile devices.

#### [Check it out!](http://www.endycahyono.com/apps/firstmedia)
