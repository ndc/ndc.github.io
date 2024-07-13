---
title: JSON Manipulation in PowerShell
date: 2024-07-13 21:13:00 +0700
layout: blogdetail
published: true
---

I have a big blob of JSON in a text file that I want to examine. I'm on Windows. What's the easiest way to do that?

Open up Visual Studio? Nah. Use the browser javascript? Interesting, but how to load the JSON to the browser? (note: later I found out I can [use FileReader](https://gist.github.com/ndc/65237ed723fd3e76f86c74bc43a92948) to do this)

So far the most practical way to do that is by PowerShell in my (limited) experience.

My crib sheet on how to use PowerShell to manipulate JSON:

``` powershell
$mytext = Get-Content -Raw .\myfile.json    # load from file and put into a variable

$myjson = ConvertFrom-Json $mytext          # convert into object

# map / select an array
$certainpart = $myjson.items | ForEach-Object { $_.itemname }   # using the $_ automatic variable
# or
$certainpart = $myjson.items | % { $_.itemname }    # ForEach-Object can be shortened to %

# filter / 'where' an array
@(2, 3, 5, 7, 11) | Where-Object { $_ -gt 6 }
# or
@(2, 3, 5, 7, 11) | ? { $_ -gt 6 }          # Where-Object can be shortened to ?

# reduce / 'aggregate' an array
@('a', 'b', 'c') | % { $total = '' } { $total += $_ } { "Concatenated: $total" }
```
