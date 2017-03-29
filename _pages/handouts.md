---
title: Handouts
date: 2017-03-29 14:23:00 -04:00
weight: 11
---

{% for handout in site.data.handouts %}
* [{{ handout.title }}]({{ handout.url }})
{% endfor %}
