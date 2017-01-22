---
layout: page
title: Assignments
---

{% for assignment in site.assignments %}
{{assignment.due}}
: [{{assignment.title}}: {{assignment.description}}]({{assignment.url}})
{% endfor %}

## Readings

Monday 23 January
: Read a selection from {{site.data.readings.platform.reading}}{{site.data.readings.platform.assignment}}
