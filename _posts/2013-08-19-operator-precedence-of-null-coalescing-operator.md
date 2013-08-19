---
title: Operator Precedence of ??
date: 2013-08-19
layout: blogdetail
published: true
---

This bit me today:

```c#
public string stringemup(string a, string b)
{
    var result = a ?? "c" + b ?? "d";
    return result;
}
```

What do you expect to get when you call `stringemup(null, null)`? If you say `cd` then you, like me, forgot that the operator precedence of ?? is *very low*. It is [almost at the bottom](http://msdn.microsoft.com/en-us/library/6a71f45d.aspx) of the list.

So the evaluation flow is like this:

# a is null, so calculate `"c" + b ?? "d"`
# `"c" + b` evaluates to "c", so return "c"

To make the script work as originally intended, I need to add some parentheses:

```c#
var result = (a ?? "c") + (b ?? "d");
```

Extra: did you know that

    ?null + ""
    ""
    ?"" + null
    ""
    ?"a" + null + "b"
    "ab"
    ?null + "a" + null + "b"
    "ab"
