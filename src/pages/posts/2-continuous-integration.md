---
path: /posts/2-continuous-integration
title: Continuous Integration
description: >
    Using a Continuous Integration server to run tests against every pushed
    commit.
date: 2018-02-02
image: Continuous_integration_-_build_light_indicator.jpg
image_source: https://commons.wikimedia.org/wiki/File:Continuous_integration_-_build_light_indicator.jpg
---

Yesterday's post was a whirlwind tour of using Pytest, `assert`, and mocks to add unit tests to a Python program.

At the end of this process, you could run `pytest` on your laptop in order to
run all the tests in all the test files.

You could also run `pytest-watch` to start a process that runs `pytest`
automatically whenever a file changes.

This post continues that journey to run tests in the cloud, on a server that
watches the repo for pushes. It's like a team-level version of `pytest-watch`.

This is called **Continuous Integration** (CI), and the server that does this
job is a Continuous Integration server (CI server)[^1].

Some advantages of CI include:

* Even if you (or your team members) forget to run the units before you push, *someone* will.
* The CI can annotate GitHub pull requests with information as to whether they pass the test suite. The more you put in the test suite, the less you have to manually test or review.
* The *output* of CI (whether the tests pass or fail) can be used as the *input* to Continuous Deployment. We'll cover this later.
* You can configure a CI server to perform additional tasks. Some common uses are: checking code style and formatting ("linting"); computing test *coverage*; running and recording performance benchmarks; creating build artifacts (such as documentation, or downloadable executables); deploying builds that pass the test suite[^2].
* A CI server keeps track of the state and artifacts of past builds. You can browse them via its dashboard, to see when a test started failing, or when a performance benchmark changed.

Some common CI servers include:

* [Travis](https://travis-ci.org). This is a hosted service that's free for open source projects. It's the market leader for open source projects.
* [CircleCI](https://circleci.com). Another hosted service. I've happily used this too.
* [Jenkins](http://jenkins.io). The go-to open-source CI server if you want to host your own.
* [TeamCity](https://www.jetbrains.com/teamcity/). This is a commercial offering from JetBrains, which makes developer tools such as IntelliJ and PyCharm.
* [Bamboo](https://www.atlassian.com/software/bamboo). This is a commercial offering from Atlassian, which makes JIRA and recently acquired Trello.

Today we'll use Travis.

[Commit #`c35067f`](https://github.com/olinlibrary/bear-as-a-service/commit/c35067f8b60d7e2964a6ef38fc60870f817aeaea) contains *all* the *code* changes necessary to take our unit tests from yesterday, and running them on Travis in the cloud. It consists of:

* A `travis.yml` file, copied from [here](https://docs.travis-ci.com/user/languages/python/).
* A change to the README, to add a build status badge[^3]. This is optional.

The build status badge displays a different image depending on whether the latest build succeeded. You can see it in action on the [home page of the repo](https://github.com/olinlibrary/bear-as-a-service). It also links to [the Travis build dashboard for this project](https://travis-ci.org/olinlibrary/bear-as-a-service).

The only other thing necessary to set up Travis as a CI server to sign into Travis, and add your GitHub repo. Travis (and the other hosted CI servers) installs a [repository webhook](https://help.github.com/articles/about-webhooks/), to let it know when a repository is pushed to.

A later post will show how to use this to set up Continuous Deployment (CD).

One more thing: The [Skillz repo](https://github.com/olin-build/skillz) demonstrates unit testing and CI for a JavaScript (Nodejs back end, Reactjs front end) project. This is considerably more complicated for two reasons that have to do with the distinction between Python and JavaScript: (1) this repo, for reasons I'll explain later, contains two different subprojects -- the front end and the back end -- each with their own package dependencies and tests; and (2) the code in this repo requires a version of PostgreSQL that Travis doesn't support.

[^1]: There's a distinction between *unit tests*, that test a single function or class, and *integration tests*, that validate that several units of a program work together. CI is called continuous _integration_ because a team that does work in separate branches would run unit tests on their laptops, but might not discover integration problems until a larger, less frequent build that integrates the work from different branches. This isn't a distinction you need to understand in order to use CI, and it also isn't a distinction that's true with many of the team development workflows in use today.

[^2]: This is Continuous Deployment (CD). In this use case, the CI server is also managing CD.

[^3]: You've probably seen these badges on other repos. This is the first of several badges we'll run across over the course of the semester.
