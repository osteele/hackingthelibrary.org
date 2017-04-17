---
title: Assignments
weight: 20
breadcrumbs: true
---

<i><small>[Newest to oldest.]</small></i>

<dl>
{% assign assignments = (site.assignments | filter: 'due_date' | sort: 'due_date' | reverse) %}
{% for assignment in assignments %}
{% if assignment.parts %}

<dt>{{ assignment.parts[0].due_date | date: '%a, %b %-d' }} – {{ assignment.parts[-1].due_date | date: '%a, %b %-d' }}</dt>
<dd><a href="{{ assignment.url }}">{{ assignment.title }}: {{ assignment.description }}</a><ul>
{% for part in assignment.parts %}
  <li><a href="{{ assignment.url }}#{{ part.tag }}">{{ part.name }} – due <b>{{ part.due_date | date: '%a, %b %-d' }}</b></a></li>
{% endfor %}
</ul></dd>

{% else %}

<dt>{{ assignment.due_date | date: '%a, %b %-d' }}</dt>
<dd><a href="{{ assignment.url }}">{{ assignment.title }}</a>
<p>{{ assignment.description }}</p></dd>

{% endif %}
{% endfor %}
</dl>

## Readings

<i><small>[Newest to oldest.]</small></i>

{% for reading in site.data.readings reversed %}
{{ reading[1].due | date: '%A, %B %-d' }}
: {{ reading[1].preamble }} {{ reading[1].reading }}{{ reading[1].assignment }})
{% endfor %}
