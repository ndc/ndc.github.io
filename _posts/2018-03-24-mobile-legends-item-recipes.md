---
title: Mobile Legends Item Recipes
date: 2018-03-24 19:02:00 +0700
layout: blogdetail
published: true
---

{% for item in site.data.mobilelegends.items %}
<hr />
<h3 id="{{item.Code}}">{{item.Name}}</h3>
<p>Price: {{item.Price}}</p>
Properties:
<ul>
{% for prop in item.Properties %}
<li>{{prop}}</li>
{% endfor %}
</ul>

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
