---
layout: page
title: Lesson Plans
weight: 30
---

{% for day in site.days reversed %}
[{{day.title}} – {{day.class_date | date: '%a, %b %-d'}}]({{day.url}})
: {{day.description}}
{% endfor %}
