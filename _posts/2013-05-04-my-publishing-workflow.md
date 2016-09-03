---
title: My Publishing Workflow
date: 2013-05-04 10:44:00
layout: blogdetail
published: true
redirect-from: "/article/my-publishing-workflow/"
---

I put this website on [GitHub Pages](http://pages.github.com/). To create a new post, first I create a new text file in [markdown](https://help.github.com/articles/github-flavored-markdown) format. Then I commit this text file to a local [git](http://git-scm.com/) repository. Then I push the changes to GitHub. Then GitHub Pages uses [Jekyll](https://github.com/mojombo/jekyll) to rerender the whole site into plain HTML files.

I use [Git for Windows](http://msysgit.github.io/) and have Git GUI open when I am working on the website. To speed up publishing I use this sequence of keyboard shortcuts:

1. `Alt`-`Tab` to Git GUI
1. `F5` to refresh changed file list
1. `Ctrl`-`I` to put all changed files into stage
1. Type commit messages
1. `Ctrl`-`Enter` to commit
1. `Ctrl`-`P` to push to GitHub
