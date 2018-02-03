---
title: Continuous Delivery
author: Oliver
date: 2018-02-03
description: >
    A Continuous Delivery system automatically (and continuously) delivers your
    application to the user. For an internet service such as a web application
    or another service that is running in the cloud, this means automatically
    deploying new versions that pass a quality checkpoint to a user-visible
    environment. We'll look at how to do this with a Flask (Python) application,
    the Travis CI server, and Heroku.
thumbnail:
    path: essays/cd-thumbnail.png
---

## Overview

A basic software team collaboration workflow that uses GitHub looks like this:

![](/assets/images/essays/cd.png)

If you followed [Heroku deployment instructions](https://devcenter.heroku.com/articles/getting-started-with-python#deploy-the-app), or the [web deployment toolbox](https://toolboxes.olin.build/), you've got a deployment flow that looks like this:

![](/assets/images/essays/heroku.png)

Finally, if you've set up a Continuous Integration (CI) server (such as
was developed in yesterday's example), you've got a test flow:

![](/assets/images/essays/ci.png)

These can be unified into this deployment diagram:

![](/assets/images/essays/heroku-and-ci.png)

Continuous Delivery (CD) changes this diagram, where the deployed software is
"the version that a team member most recently manually deployed", to the
following, where the deployed software is "the latest version that passed
automated testing":

![](/assets/images/essays/ci.png)

\[Later in the course, we'll look at a couple of variants of diagram: where a
CD server pulls from the repo instead of being pushed from the CI server; and
where there's more than one deployment environment.\]

## Twilio MQTT Gateway: Unit Tests

In yesterday's post, we configured Bear-as-a-Service for CI by (1) adding unit
tests, and (2) connecting the repository to a CI server (Travis). The first step
used Python's [`unittest.mock`
module](https://docs.python.org/3/library/unittest.mock-examples.html),
`assert`, [PyTest](https://docs.pytest.org/en/latest/), and some test functions
that we wrote. The second step involved adding a configuration file to the repo,
and using the Travis web dashboard to tell Travis about the repo.

Bear-as-a-Service doesn't have a component that runs in the cloud (this
functionality was moved to the Twilio MQTT Gateway). So today we'll be using
Twilio MQTT Gateway for Continuous Delivery. The first step is to add Continuous
Integration to the Gateway. And the first step of *that* is to add unit tests.

[Commit #`d2057f5`](https://github.com/olin-build/twilio-mqtt-gateway/commit/d2057f51f88589e36136f4dfc689084bc2bf1253) adds unit testing to the Twilio MQTT
Gateway. This uses the same tools and techniques as discussed yesterday, with these differences:

1. The `twilio_mqtt_gateway` module needed some changes in order to run in a test environment:
    * The main module needs to be changed not to launch the server when it's exported by the test system.[^1]
    * In order for Python's *patch* mechanism to work, the line `from send_mqtt_messages import publish` needs to change to `import send_mqtt_messages`.[^2]
2. Beyond PyTest, and unit testing in general, additional mechanism is necessary to test a Flask application. Google lead me to Flask's [testing docs](http://flask.pocoo.org/docs/0.12/testing/).

[^1]: Otherwise the tests run, but never stop. This took me a little while to figure out.
[^2]: This took me about half an hour with print statements to figure out. Now that I'm more familiar with Python's mocks, hopefully I'll recognize this more quickly next time.

These two steps are often necessary.
*.  Code that's *functional* may need changes in order to be *testable*. In this case, these changes were trivial[^3]. In general, you may find that you need to
refactor your code in order to expose the functionality that you want to test.
Also in general, this refactoring improves the design of your system, even if
you wouldn't have noticed this without the impetus of testing — or if you
had noticed it, but wouldn't otherwise have paid for it.
* Frameworks that take charge of running your application often come with their
own test instructions or utilities.

[^3]: To make, if not — because of where I am on the learning curve for these particular
      tools and packages — to discover.

## Twilio MQTT Gateway: Continuous Integration

Once unit testing was set up, configuring Travis to run the repo was
straightforward. [Commit #`e4aaf04`](https://github.com/olin-build/twilio-mqtt-gateway/commit/e4aaf043614ee60832cff1827f5a299e44af7adc) implements this configuration.
(For comparison, [Commit #`c35067f`](https://github.com/olinlibrary/bear-as-a-service/commit/c35067f8b60d7e2964a6ef38fc60870f817aeaea) to the Bear repo configures that repo for use with Travis
 As you cana see, these commits are basically the same.)

You can see the Travis build page [here](https://travis-ci.org/olin-build/twilio-mqtt-gateway).

## Twilio MQTT Gateway: Continuous Delivery

Finally, we set Travis to push successful builds to Heroku. This final step just applies [Travis's Heroku deployment instructions](https://docs.travis-ci.com/user/deployment/heroku/).

[Install the Travis command-line interface (CLI) tool](https://github.com/travis-ci/travis.rb#installation)
in order to follow along. You can also do this by editing the `.travis.yml` file directly,
but this gets a bit complicated when it comes to adding the encrypted Heroku API key.

We need to add three things to the Travis configuration file: the name of the
host (Heroku); the name of the Heroku repository that Travis should push to;
and the credential (the Heroku API key) that Travis presents to Heroku in order
to authorize the push.

All of these are added to the `.travis.yml` configuration file. The result
looks like this:

```yaml
deploy:
    provider: heroku
    app: twilio-gateway
    api_key:
        secure: …
```

`app` is the name of the Heroku app. You can retrieve this from the Heroku
dashboard, or from the command line by reading the name of the remote
repository from the `heroku … (push) ` line:

```bash
$ git remote -v
git remote -v heroku
heroku  https://git.heroku.com/twilio-gateway.git (fetch)
heroku  https://git.heroku.com/twilio-gateway.git (push)
```

In this case, the name of the app is `twilio-gateway`. Add the following to
your `.travis.yml` file, and save the file.

```yaml
deploy:
    provider: heroku
    app: YOUR-APP-NAME
```

Since this configuration file goes in the repository, and our repositories
are public, it would be a bad idea to include the unencrypted API key in
the configuration. Install the Travis CLI and run the following command,
to add a key that only the Travis service can decrypt:

```bash
travis encrypt $(heroku auth:token) --add deploy.api_key
```

The `deploy` section of configuration file should now include:

```yaml
    api_key:
        secure: ENCRYPTED-VALUE
```

Commit this change, push it to GitHub, and Travis should update your app
when, and only when, a new commit passes CI.

You can still push directly from your workstation to Heroku. This is faster
than waiting for CI, and therefore handy for development, and against a
non-production server. Faster yet is to do as much development and validation
on your workstation. This is generally easy for web applications (that present
web pages to the user). We'll look at how to do this for web hooks, such as
Twilio uses, tomorrow. \[Spoiler: [ngrok](https://ngrok.com). Which happens
to be [written in Go](https://github.com/inconshreveable/ngrok).\]

## Readings

* [Continuous Delivery web site](https://continuousdelivery.com). Jeff Humble is
the author of the _Continuous Delivery_ book, also recommended.
* [Continuous Delivery essay](https://martinfowler.com/bliki/ContinuousDelivery.html), Martin Fowler.
* [Martin Fowler's Continuous Delivery page](https://martinfowler.com/delivery.html)
has additional discussion and links to videos.
* [Continuous Delivery](https://en.wikipedia.org/wiki/Continuous_delivery), Wikipedia
