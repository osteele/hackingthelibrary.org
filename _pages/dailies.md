---
---

## Instructor’s Coding Log

While the students worked on team projects, the instructor applied code quality and other software engineering tools to the scaffolding projects that had been introduced at the beginning of class. These are the [dailies](https://en.wikipedia.org/wiki/Dailies) from that work.

These notes are organized by when the work was done, so there’s a bit of hopping between topics, and returning to topics a few days later.

{% assign posts = site.posts | sort: 'date' %}
{% for page in posts %}
  <img width="100" style="float: right" src="/posts/{{ page.thumbnail }}">
  <a href="{{ page.url }}">
  {{ page.title }}
  </a>
  {{ page.description }}
  <div style="clear: right" />
{% endfor %}

