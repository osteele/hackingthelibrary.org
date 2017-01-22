---
layout: page
title: Class Notes
---

{% for day in site.days %}
[{{day.title}} ({{day.date | date: '%d %b'}})]({{day.url}})
: {{day.description}}
{% endfor %}
