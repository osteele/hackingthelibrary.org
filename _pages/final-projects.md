---
title: Final Projects
---

<dl>
{% for project in site.data['final-projects'] %}
<dt>{% if project.website %}<a href="{{ project.website }}">{{ project.name}}</a>{% else %}<a href="{{ project.repo }}">{{ project.name }}</a>{% endif %}</dt>
<dd style="font-style: italic; font-weight: bold">{{ project.tagline }}</dd>
<dd>{{ project.description }}</dd>
{% endfor %}
</dl>

<h2>Tools and Hosting</h2>
<table class="final-project-table">
  <tr>
    <th>Project</th>
    <th>Source<br/>Repo</th>
    <th>Continuous<br/>Integration</th>
    <th>Docs</th>
    <th>Hosting</th>
    <th>Production Site</th>
  </tr>
  {% for project in site.data['final-projects'] %}
    <tr>
      <td class="project-name">{{ project.name }}</td>
      <td><a href="{{ project.repo }}">GitHub</a></td>
      <td>{% if project.ci %}<a href="{{ project.ci }}">Build Status</a>{% endif %}</td>
      <td>{% if project.docs %}<a href="{{ project.docs }}">Docs</a>{% endif %}</td>
      <td>{% if project.hosting %}<a href="{{ project.hosting }}">Heroku</a>{% endif %}</td>
      <td>{% if project.website %}<a href="{{ project.website }}">Website</a>{% endif %}</td>
    </tr>
  {% endfor %}
</table>
