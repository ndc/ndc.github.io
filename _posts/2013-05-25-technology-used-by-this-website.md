---
title: Technology Used by This Website
date: 2013-05-25 00:00:00
layout: blogdetail
published: true
redirect-from: "/article/technology-used-by-this-website/"
---

Oh, the amount of stuff that I have to learn to produce this website!

Not that I'm complaining. Nobody told me to create this website :) and I did it because it's fun. But if I look back and list down the parts needed to build this website, the list is *quite* long.

Kinda reminds me of a [podcast by Russell Roberts](http://www.econtalk.org/archives/2013/03/burgin_on_hayek.html) when he was retelling Milton Friedman's story of [how *a pencil* is made](http://www.youtube.com/watch?v=R5Gppi-O3a8). Sounds simple, right? Just a frickin pencil. Not so simple it turned out.

So, the list, let's start.

[GitHub Pages](http://pages.github.com/)

It all began when I learned that GitHub offered to host websites for free. Stuff to learn: how to register, how to set up.

[Git](http://git-scm.com/)

The way GitHub Pages work is that website content is pushed to a Git repository on GitHub. Stuff to learn: luckily I already know some Git, like 'git push'.

[Markdown](http://daringfireball.net/projects/markdown/)

Writing articles on HTML is painful. Luckily GitHub Pages supports Markdown, a text to HTML converter. Actually, GitHub's Markdown is [richer](https://help.github.com/articles/github-flavored-markdown) than standard Markdown. Stuff to learn: I keep forgetting Markdown syntax.

[Jekyll](http://jekyllrb.com/)

GitHub Pages supports Jekyll, some kind of templating engine that can turn text files into HTML files with automatically inserted headers, footers, etc. Stuff to learn: how to set metadata, liquid template syntax, etc. Lots to learn here.

[Twitter Bootstrap](http://twitter.github.io/bootstrap/index.html)

I don't want to spend my time worrying about how my website will look on Firefox, Chrome, etc. so I use this CSS framework called Twitter Bootstrap. But then I have to learn how to use Twitter Bootstrap. Stuff to learn: I already remember the scaffolding syntax well, but the rest not so well.

NetDNA's [Bootstrap CDN](http://www.bootstrapcdn.com/)

No need to host Twitter Bootstrap on my site because NetDNA is offering to host the CSS files for you. Stuff to learn: not much, some google search.

[Font Awesome](http://fortawesome.github.io/Font-Awesome/)

How to display small icons like the back arrow, RSS symbol, twitter symbol in my page? With this 'font'. Stuff to learn: how to use Font Awesome.

[Bootswatch](http://bootswatch.com/)

Bootswatch offered some free theme for Twitter Bootstrap. I picked one so my site doesn't look so Bootstrap standard. Stuff to learn: not much, choosing the most appealing template, checking whether it displays source code correctly.

[Domain name](http://en.wikipedia.org/wiki/Domain_name)

Once someone saves a link to my article, it is very hard to change the address. So it is better the articles have a correct address from the beginning. Stuff to learn: which domain registrar to use, what actually happens when i buy a domain, etc.

[How to edit DNS record](https://www.namecheap.com/support/knowledgebase/article/settingup_hostrecords)

Buying a domain does not mean the domain is already running. The next mandatory thing to do is get hold of a DNS server (pay for it or look for free ones) and set it up to point the recently bought domain to the server that hosts your site. Stuff to learn: how to setup DNS record.

[Disqus](http://disqus.com/)

In case someone reads my article and wants to comment on it, I need a way to capture the comment. Disqus is offering to host comments for free, so. Stuff to learn: how to set up Disqus.

[Google Analytics](http://www.google.com/analytics/)

I need to find out whether someone is reading my article, how popular each article is. Stuff to learn: how to set up Google Analytics, how to read the report.

Twitter's [tweet button](https://support.twitter.com/articles/231474-adding-the-tweet-button-to-your-website#)

In case someone reads my article and wants to share it with their friends on twitter. Stuff to learn: how to set up the tweet button.

How to create [RSS feed in Jekyll](https://github.com/snaptortoise/jekyll-rss-feeds)

Hopefully to make my site easier to aggregate. Stuff to learn: how to set up an RSS page with Jekyll.

[Photobucket](http://photobucket.com/)

I have some images to show on the site. Where should I put the images? Commit them to GitHub? Images in a Git repository doesn't sound right to me. So I need to choose a (free :) image hosting site. The host must not automatically delete old or rarely requested images. I ended up with Photobucket because I already have an account there and it offered larger storage than the other hosts (at that time). As an aside Flickr now offers much bigger storage than Photobucket. Stuff to learn: which host to use, how to set up images in Photobucket so they can be linked to my article pages.
