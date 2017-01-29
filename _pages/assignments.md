---
layout: page
title: Assignments
---

{% for assignment in site.assignments %}
{{assignment.due}}
: [{{assignment.title}}: {{assignment.description}}]({{assignment.url}})
{% endfor %}

## Readings

{% for reading in site.data.readings %}
{{reading[1].due | date: '%A, %B %-d' }}
: {{reading[1].preamble}} {{reading[1].reading}}{{reading[1].assignment}})
{% endfor %}
