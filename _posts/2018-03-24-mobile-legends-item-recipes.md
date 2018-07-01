---
title: Mobile Legends Item Recipes
date: 2018-07-01 11:52:00 +0700
layout: blogdetail
published: true
---

Update July 2018: adding Golden Staff, etc.

As of March 2018 Mobile Legends [official website](https://www.mobilelegends.com/) doesn't have enough documentation about items. The only available item documentation in that website is the recommended items for each hero. There is no descriptions about the items themselves, not even item names.

The only official documentation about items is in the game itself. Even then, you need to *play* the game in order to see the full documentation. In the lobby there is no documentation about item recipes nor tier 1 and 2 items.

A lot of fan sites took the initiative to document items, for example [this mobilelegendsbangbang website](http://mobilelegendsbangbang.com/items/) and [this gcube website](https://mobilelegends.gcube.id/items/).

This is another attempt to document the items. The differences with the other item documentation sites are: the entire item descriptions are in one page, nothing is folded / hidden so I can search with CTRL+F, there are links to quickly jump between related items, and this is a way for me to practice generating a page with JSON in Jekyll :)

{% for item in site.data.mobilelegends.items %}
<hr />
<div class="row">

<div class="col-md-2 col-md-push-10">
<h3><img src="{{item.Image}}" class="img-responsive" /></h3>
</div>

<div class="col-md-10 col-md-pull-2">
<h3 id="{{item.Code}}">{{item.Name}}</h3>
<p>Price: {{item.Price}}</p>
Properties:
<ul>
{% for prop in item.Properties %}
<li>{{prop}}</li>
{% endfor %}
</ul>
</div>

</div>

<div class="row">

<div class="col-md-6">
Components:
<ul>
{% for component in item.Components %}
<li><a href="#{{component.Code}}">{{component.Name}}</a> ({{component.Price}})</li>
{% endfor %}
</ul>
</div>

<div class="col-md-6">
Used in:
<ul>
{% for component in item.UsedIn %}
<li><a href="#{{component.Code}}">{{component.Name}}</a></li>
{% endfor %}
</ul>
</div>

</div>
{% endfor %}

<hr />

### Glossary

hero

enemy

HP

HP regen

current / max HP

lifesteal

armor

physical damage

physical attack

physical penetration

armor

mana

mana regen

current / max mana

spell vamp

magic resist

magic damage

magic power

magical penetration

magic resist

cooldown reduction

attack speed

movement speed

critical chance

critical damage

