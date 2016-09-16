---
title: Operator Precedence of ??
date: 2013-08-19
layout: blogdetail
published: true
redirect_from: "/article/operator-precedence-of-null-coalescing-operator/"
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

1. a is null, so evaluate `"c" + b ?? "d"`
2. `"c" + b` evaluates to "c", so return "c"

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
