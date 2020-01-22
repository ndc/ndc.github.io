---
title: Blazor First Impressions
date: 2019-11-02 18:53:00 +0700
layout: blogdetail
published: false
---

OnInitializedAsync multiple times:

@(await Html.RenderComponentAsync<FMClientBlazor.App>(RenderMode.ServerPrerendered))
RenderMode.Server

OnInitializedAsync
before await then render then after await

there is no live reload

