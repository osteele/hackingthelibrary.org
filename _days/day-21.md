---
title: Day 21
date: 2017-04-09 21:12:00 -04:00
description: Continuous Integration Workshop
activity_date: 2017-04-10
---

Today we are going to set your project up for Continuous Integration (CI), using the test suite that you configured on
[day 17]({% link _days/day-17.md %}).

[Continuous Integration](https://www.thoughtworks.com/continuous-integration) is the practice of (1) frequently committing changes to a shared repository every day, and (2) automatically testing these changes. Today's workshop will focus on (2).

In this workshop, you will configure the Travis CI server to run your test suite every time you push to GitHub.

At the end of the workshop, you will be able to visit a page on the CI server to see which branches currently pass the test suite ([example](https://travis-ci.org/kennethreitz/requests)); and to see a history of commits and their build status. You will be able to place a badge on your README ([example](https://github.com/kennethreitz/requests)) or in your project documentation ([example](http://docs.python-requests.org/en/latest/)) that indicates whether the `master` branch of your project GitHub repository passes its tests.

You will also have configured your project with the pre-requisites for [Continuous Delivery](https://continuousdelivery.com); and for annotating each GitHub Pull Request (PR) with information as to whether the PR passes the test suite.

## Add your project to Travis

    1. [Sign into Travis CI](https://travis-ci.org/auth) with your GitHub account.
  2. On your [Travis profile page](https://travis-ci.org/profile), enable Travis CI builds for your project.
  3. Find your project, and toggle it to on. ![]({% link images/ci-workshop/travis-toggle-on.png %})
  4. Create a file `.travis.yml` with the contents given below. (Note that the file name begins with a dot!) Add this file, commit it, and push it.

`.travis.yml` (for Python)

``` yaml
language: python
python:
  - 3.5

# command to run tests
script: python test.py
```

This Python configuration file installs the packages in `requirements.txt`, and runs the command on the `script:` line to test your code. If you are using a different test command, for example [pytest](https://docs.pytest.org/en/latest/), change this line accordingly.

`.travis.yml` (for node)

``` yaml
language: node_js
node_js:
  - 7.8
```

This node configuration file assumes that your `package.json` is configured with a `tests` script, that runs your tests.

5\. Visit your project page on Travis, and watch it build.

## Badge your README

The top of your Travis project page should now display a “passing” badge ![]({% link images/ci-workshop/travis-passing.svg %}).

Click on this badge to disclose a dialog box. Select the Markdown option from the second popup, and add the generated text to the top of your README. Now your README will display the project build status. Click on this badge to navigate to the project page on Travis and examine the build log and build history. Again, the [Requests library README](https://github.com/kennethreitz/requests) shows an example.

![]({% link images/ci-workshop/request-badge-markdown.png %})

You can also request RST (reStructuredText), for use in Sphinx RST files.

![]({% link images/ci-workshop/request-badge-rst.png %})

## Going Beyond: Continuous Delivery

TBD

## Extras: Fun with badges

Build status is an example of a README badge. The README for the [Python Requests Library](https://github.com/kennethreitz/requests) includes other badges, that include [code coverage](https://en.wikipedia.org/wiki/Code_coverage), as well as supported Python versions.

![https://github.com/kennethreitz/requests/blob/master/README.rst]({% link images/ci-workshop/requests-badges.png %})

The [Jupyter notebook](https://github.com/jupyter/notebook) project also has bling: the familiar CI badge, plus a docs badge that links to Read the Docs.

## Extras: Notifications

There are some tools to make it easier to keep on eye on your build status. These are for Travis; many of them also work with other CI servers too.

* macOS: [CCMenu](http://ccmenu.org) is a menu icon that displays the build status of your projects.
* Ubuntu: [BuildNotify](https://bitbucket.org/Anay/buildnotify/wiki/Home) is CCMenu for Ubuntu.
* Atom: the [Travis CI Status plug-in](https://atom.io/packages/travis-ci-status)
* Slack, email (and other) [notifications](https://docs.travis-ci.com/user/notifications/)

## Appendix: Other CI services

In this workshop, we used the Travis CI service. This service is provided by free for open source projects.

There are a number of good commercial alternatives (some are listed [here](https://github.com/integrations/feature/continuous-integration)), that mostly are also free for open source projects. Most open source projects in the Python and JavaScript communities, and many startups, use Travis, which is why I've selected this one.

There are also open source and commercial servers that can be installed on a private server. [Jenkins](https://jenkins.io) is the most popular open source CI server. [TeamCity](https://en.wikipedia.org/wiki/TeamCity) and [Bamboo](https://en.wikipedia.org/wiki/Bamboo_(software))) are popular commercial offerings.
