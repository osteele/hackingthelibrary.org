---
layout: page
title: Assignments
---

{% assign assignments = (site.assignments | filter: 'due_date' | sort: 'due_date') %}
{% for assignment in assignments %}
{% if assignment.parts %}

  <dt><a href="{{ assignment.url }}">{{ assignment.title }}</a></dt>
  <dd>{{ assignment.description }}<ul>
  {% for part in assignment.parts %}
    <li><a href="{{ assignment.url }}#{{ part.tag }}">{{ part.name }} – due <b>{{ part.due_date | date: '%a, %b %d' }}</b></a></li>
  {% endfor %}
  </ul></dd>

{% else %}

{{assignment.due_date}}
: [{{assignment.title}}: {{assignment.description}}]({{assignment.url}})

{% endif %}
{% endfor %}

## Readings

{% for reading in site.data.readings %}
{{reading[1].due | date: '%A, %B %-d' }}
: {{reading[1].preamble}} {{reading[1].reading}}{{reading[1].assignment}})
{% endfor %}
