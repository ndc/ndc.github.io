---
title: The Many Ways to Call Linq GroupBy
date: 2013-06-25
layout: blogdetail
published: true
redirect_from: "/article/the-many-ways-to-call-linq-groupby/"
---

I keep forgetting Linq's GroupBy syntaxes. Maybe if I write it down I will remember it better.

First, let's set up the playing field.

```c#
public class Order
{
    public Customer Customer { get; set; }
    public List<OrderItem> Items { get; set; }
}

public class OrderItem
{
    public Product Product { get; set; }
    public long Quantity { get; set; }
    public long UnitPrice { get; set; }
}

public class Product
{
    public string Name { get; set; }
}

public class Customer
{
    public string Name { get; set; }
}
```

From the data structure above, I want to get a list of customers (non repeating) with the total sales of each customer.

I see that there are 3 general ways to call GroupBy:

* [Just to Separate a Collection into Several Groups](http://msdn.microsoft.com/en-us/library/bb534304.aspx)
* [Directly Reduce the Collection into Another Form of Collection](http://msdn.microsoft.com/en-us/library/bb549393.aspx)
* [Map and Reduce the Collection into Another Form of Collection](http://msdn.microsoft.com/en-us/library/bb534493.aspx)

Let's try the easiest way first: just tell GroupBy how to divide the collection into groups.

```c#
var orders = new List<Order>();

var justSplitIntoGroups = orders.GroupBy(
    o => o.Customer
).Select(
    g => new
    {
        customer = g.Key,
        sales = g.Sum(
            o => o.Items.Sum(
                i => i.Quantity * i.UnitPrice
            )
        )
    }
);
```

Another way: tell GroupBy to first transform the original collection.

```c#
var splitAndTransformOriginal = orders.GroupBy(
    o => o.Customer,
    o => o.Items.Sum(
        i => i.Quantity * i.UnitPrice
    )
).Select(
    g => new
    {
        customer = g.Key,
        sales = g.Sum()
    }
);
```

Another way: tell GroupBy how to construct the end result.

```c#
var splitAndReduce = orders.GroupBy(
    o => o.Customer,
    (cust, ordrs) => new
    {
        customer = cust,
        sales = ordrs.Sum(
            o => o.Items.Sum(
                i => i.Quantity * i.UnitPrice
            )
        )
    }
);
```

The completest approach: tell GroupBy how to transform the original collection and how to construct the end result.

```c#
var splitTransformReduce = orders.GroupBy(
    o => o.Customer,
    o => o.Items.Sum(
        i => i.Quantity * i.UnitPrice
    ),
    (cust, sls) => new
    {
        customer = cust,
        sales = sls.Sum()
    }
);
```
