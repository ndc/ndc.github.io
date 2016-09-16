---
title: Twitter Advanced Search
date: 2013-05-26
layout: blogdetail
published: true
redirect_from: "/article/twitter-advanced-search/"
---

Have you ever tried [Twitter Advanced Search](https://twitter.com/search-advanced)?

I have just tried it and it's so cool! Example:

    github near:"jakarta" within:40mi

Some more examples:

* searching for github or bitbucket (using OR): `github OR bitbucket`
* searching for github tweet that is NOT a retweet (using the negative sign): `github -RT`
* searching for github tweet where the tweeter's device's language is set to Bahasa Indonesia (using "lang"): `github lang:in`
* searching for github tweet that is sent from certain location (using "near"): `github near:"jakarta" within:15mi`
* searching for bitbucket tweet from github (using "from"): `bitbucket from:github`
* searching for bitbucket tweet to github (using "to"): `bitbucket to:github`
* searching for exact phrase (using quote): `"git hub"`

Mixing it up:

* back and forth conversation: `from:github OR to:github`

Do you have an interesting twitter query?
