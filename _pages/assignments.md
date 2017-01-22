---
layout: page
title: Assignments
---

<ol>
  {% for assignment in site.assignments %}
    <li><a href="{{assignment.url}}">{{ assignment.title }} – due {{ assignment.due }}</a></li>
  {% endfor %}
</ol>

## Readings

For Monday:
Read a selection from {{site.data.readings.platform.reading}}{{site.data.readings.platform.assignment}}
