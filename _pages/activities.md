---
title: Lesson Plans
weight: 30
breadcrumbs: true
---

{% for day in site.days reversed %}
[{{day.title}} – {{day.activity_date | date: '%a, %b %-d'}}]({{day.url}})
: {{day.description}}
{% endfor %}
