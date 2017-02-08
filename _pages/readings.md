---
layout: page
title: Readings
date: 2017-01-18
---

## Book Club

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
* *UML Distilled*, Martin Fowler

### Pattern Languages
* _A Pattern Language_, Christopher Alexander
* _The Timeless Way of Building_, Christopher Alexander
* _Design Patterns: Elements of Reusable Object-Oriented Software_, by Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides. (The “Gang of Four”). The [Wikipedia page](https://en.wikipedia.org/wiki/Design_Patterns) contains a list of patterns.
* _Patterns of Enterprise Application Architecture_, Martin Fowler. [online catalog](https://www.martinfowler.com/eaaCatalog/)
* _Enterprise Integration Patterns: Designing, Building, and Deploying Messaging Solutions_, Gregor Holpe and Bobby Woolf. [Wikipedia](https://en.wikipedia.org/wiki/Enterprise_Integration_Patterns); [online catalog](http://www.enterpriseintegrationpatterns.com/patterns/messaging/).
* _Analysis Patterns: Reusable Object Models_, Martin Fowler
* _Holub on Patterns: Learning Design Patterns by Looking at Code_, Allen Holub
* ["Patterns in Enterprise Software"](https://www.martinfowler.com/articles/enterprisePatterns.html), Martin Fowler.
A catalog of software pattern catalogs.


### Libraries and Knowledge

* *Everything is Miscellaneous: The Power of the New Digital Disorder*, David Weinberger
* *The Knowledge: How to Rebuild Civilization in the Aftermath of a Cataclysm*, Lewis Dartnell.

### Fiction

* "The Library of Babel", Jorge Luis Borges. Magical realist fiction, around some issues involving cataloging a library that contains all possible boooks.
* _A Canticle for Leibowitz_,  Walter M. Miller, Jr. Monks preserve scientific knowledge after an apocalpyse.
* _The Diamond Age_, Neal Stephenson. Features a (physical) interactive book, backed by AI, that attempts to impart contextually relevant knowledge.
