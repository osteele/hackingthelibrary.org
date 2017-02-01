---
title: Lab 3
description: Deploying to the cloud
date: 2017-02-01
due_date: 2017-02-09
published: false
---

{% include construction %}

## Overview

In this assignment, you will configure the server application from [Lab 2]( {% link _assignments/lab-2.md %})
to run in different [deployment environments](https://en.wikipedia.org/wiki/Deployment_environment).

As with Labs 1 and 2, track your time.


##

In Lab 2, you [modified your application to run on port 0.0.0.0](http://localhost:4000/assignments/lab-2/#why-doesnt-it-work-2-configuring-your-server-to-accept-remote-connections) so that it would accept connections from remote clients (such as a web browser running on a different machine).

This is the right configuration for a server running in the cloud, but not necessarily for a server running on your development machine.


## What to Turn In

1. Complete the survey (link TBD) before class on {{ page.due_date | date: '%A, %-d %b'}}.

The survey includes these questions:

* q1
* q2

2. Add a link from your GitHub repo to your (Heroku) application URL.

Here's how to add the link:
Open your repo page on GitHub. Near the top of the page is an Edit button;
this discloses text entry fields for a project Description and Website.

![]({% link images/repo-description-1.png %})

Paste your application URL into the Website field, and Save.


![]({% link images/repo-description-2.png  %})
