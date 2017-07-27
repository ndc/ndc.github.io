---
title: The Many Ways to Call Linq SelectMany
date: 2017-07-27 08:47:00 +0700
layout: blogdetail
published: true
---

I just found out c#'s Enumerable.SelectMany has 4 overloads! I only knew one.

Now figuring out the differences.

Setting up a playing field:

```c#
public class Team
{
    public string Name { get; set; }
    public IEnumerable<string> Members { get; set; }
}

public class MatchResult
{
    public Team Team { get; set; }
    public int Score { get; set; }
}
```

And then let's create a list of match results:

```c#
var results = new List<MatchResult>
{
    new MatchResult
    {
        Team = new Team {Name = "Red", Members = new[] {"Wedge", "Luke"}},
        Score = 8
    },
    new MatchResult
    {
        Team = new Team {Name = "Gold", Members = new[] {"Evaan"}},
        Score = 7
    }
};
```

Now if I want to get a list of team member with their team score, previously I would do it like this:

```c#
var memberScores = results.SelectMany(
    r => r.Team.Members.Select(m => new { Member = m, Score = r.Score })).
    ToList();
```

And I would get:

```c#
[
    { Member = "Wedge", Score = 8 },
    { Member = "Luke", Score = 8 },
    { Member = "Evaan", Score = 7 }
]
```

But it turned out there is another way to do it:

```c#
var memberScores = results.
    SelectMany(
        result => result.Team.Members,
        (result, member) => new { Member = member, Score = result.Score }).
    ToList();
```

Which is easier to read I think.

The other two overloads are just to add item index if you need it:

```c#
var memberScores = results.SelectMany(
    (r, idx) => r.Team.Members.Select(m => new { Member = m, Score = r.Score })).
    ToList();
```

And

```c#
var memberScores = results.
    SelectMany(
        (result, idx) => result.Team.Members,
        (result, member) => new { Member = member, Score = result.Score }).
    ToList();
```
