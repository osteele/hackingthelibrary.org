---
layout: page
title: Readings
date: 2017-01-18
---

## Reading Club

{% for reading in site.data.readings %}
{{reading[1].due | date: '%A, %B %-d' }}
: {{reading[1].preamble}} {{reading[1].reading}}{{reading[1].assignment}})
{% endfor %}


## Optional Readings

The following are optional but recommended.
Over the course of the semester, we will choose selections from some of them (at which point those selections become
non-optional).

### Architecture and Design

* *Code/Space*, Rob Kitchin
* *The Gift*, Lewis Hyde
* *The Edition*

### Software Development

* *Continuous Delivery*, Jez Humble and David Farley
* *Continuous Integration: Improving Software Quality and Reducing Risk*, Paul M Duvall, Steve Matyas, Andrew Glover
* *Release It!*, Michael Nygard
* *Patterns of Enterprise Application Development*, Martin Fowler
* *UML Distilled*, Martin Fowler

### Libraries

* *Everything is Miscellaneous: The Power of the New Digital Disorder*, David Weinberger

### Fiction

* _A Canticle for Leibowitz_,  Walter M. Miller, Jr.
* "The Library of Babel", Jorge Luis Borges.
