---
layout: default
title: Hacking the Library
---


{% if site.categories.announcement %}
## Announcements

{% for post in site.categories.announcement limit:1 %}
{{ post.title }}
{{ post.content }}
{% endfor %}
{% endif %}


{% assign post = site.days.last %}
# [{{ post.class_date | date: '%a, %b %-d' }} – {{ post.description }}]({{ post.url }})
{{ post.content }}

---

## Office Hours

Oliver Steele <oliver.steele@olin.edu> MH262

{:.table}
Day    | Time          | Where | Notes
------ | ------------- | -------
W 2/8  | 1-3pm         | Library
W 2/8  | 5:30-6:30pm   | Library
Th 2/9 | 4:30-6pm      | Library | Depending on the weather
F 2/8  | 9-11am        | Library | Alternate time if Thursday doesn't work

Duncan Hall <duncan.hall@students.olin.edu><br/>

7-9 PM Sundays and Wednesdays WH3 AL<br>
([<i class="fa fa-calendar"></i> iCalendar](webcal://p09-calendars.icloud.com/published/2/0HsmJrKvrRZCQrGupJdLvCGi_CPXDbXA5HFworPq2R6wR4MiDQ9YI7I7lImLsjfBOWL_ntnAvSu2UgbHWy9j-79snfX5BNcKNYJFb6ptsgM))

---

## Overview

Let’s create a new kind of Library.

In this studio course, teams will leverage the Library’s resources and institutional mandate to demonstrate the future of Olin’s Library and public libraries writ large.

This course will focus on creating, developing, and deploying projects that the Library will host. Our aim is to create systems, artifacts, and spaces that escape the semester and impact the Olin community beyond the semester.

The course meets Monday / Thursday 10:50-12:30pm in the Library
