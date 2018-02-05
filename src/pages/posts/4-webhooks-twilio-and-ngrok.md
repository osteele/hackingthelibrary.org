---
title: Twilio, Web Hooks, and ngrok
author: Oliver
date: 2018-02-04
description: >
    Web Hooks. Configuring Twilio to connect to your application.
    Using ngrok to proxy web hooks to your development laptop.
thumbnail: ./img/aaarr-webhooks-pirate.png
---

The concept of a [web hook](https://en.wikipedia.org/wiki/Webhook) or *webhook*
has come up a couple of times in passing:

* Travis uses a [GitHub webhook](https://developer.github.com/webhooks/), in
  order to learn when a new commit is pushed to a repository.
* The [Twilio → MQTT Gateway](https://github.com/olin-build/twilio-mqtt-gateway)
  uses a webhook to learn when a Twilio phone number receives an SMS.

Webhooks are a means of communication between multiple processes, generally
running on different machines (or "nodes").[^1]

In addition to receiving events from Github and Twilio, webhooks allow you to
receive events from a number of other services. Examples include
[Slack](https://api.slack.com/incoming-webhooks), [Facebook
Messenger](https://developers.facebook.com/docs/messenger-platform/getting-started/webhook-setup),
[IFTTT](https://ifttt.com/maker_webhooks), and [Zapier](https://zapier.com/).

## Using a webhook

Connecting a service to webhook — we'll use Twilio as an example — requires
these steps:

1. Implement a web application, with a route (e.g. `/sms_callback`) that
   handles the incoming data.
   If you haven't implemented a web application before, or don't know what
   a "route" is in this context, consider the [web apps toolbox](https://toolboxes.olin.build/).
2. Deploy your application to the cloud, so that it has a public domain name
   (e.g. `twilio-gateway.herokuapp.com`). (Your application needs to run in the
   cloud so that the Twilio can find it in order to make an HTTP `PUT` request
   to its route. Services in the cloud can't reach your laptop.)
3. Configure Twilio with the URL to your service. This URL combines the
   *schema* (`http` or `https`), the domain name, and the route (or *URL path*).
   In our example, it's `https://twilio-gateway.herokuapp.com/sms_callback`.

The format of the incoming data, and the mechanism for configuring the event
publisher, depend on the publishing service. For Twilio, here's how to
programmatically set the webhook that is called when a specific number
receives an SMS message.

```python
from twilio.rest import Client
client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

# https://www.twilio.com/docs/api/rest/incoming-phone-numbers
number, = client.incoming_phone_numbers \
                .list(phone_number="+16175552323")
number.update(sms_url="https://twilio-gateway.herokuapp.com/sms_callback")
```

The next section replaces step #2 with something that is more efficient
during development.

## Pro Tip: Using `ngrok` to avoid deployment

The edit/deploy-to-web/test cycle, that's required to test a webhook using steps
(1-2) above, is slow. It's generally faster to do as much on your development
machine as possible, before you kick it off to the cloud. Working locally also
gives you access to more debugging tools.

[ngrok](https://ngrok.com/) is a freemium service that makes a web server
running on your laptop accessible to code running in the cloud. This is
perfect for webhooks[^2]. Launch your server (`python twilio_mqtt_gateway.py`),
launch ngrok `ngrok http 3000`, and configure Twilio with a URL based on
the hostname that `ngrok` prints out. Now you can test the code *before*
you deploy it.

`ngrok` gives you a new public hostname each time you run it (unless you pay
for a reserved subdomain). It's therefore handy to script setting the webhook
callback URL; for example, using the Twilio code above.

## Pro Tip: Using `curl` and `httpie` to call your webhook directly

The [`curl`](https://curl.haxx.se/) command line tool is useful for sending
requests to your web server, so that you don't have to induce the service that
calls your webhook to do this each time you want to test your code. You can read
up on `curl` on its site or in Google; however, many of the documentation pages
for service-specific webhooks also show the equivalent `curl` command.

[`httpie`](https://httpie.org/) is a friendlier, more expressive alternative to
`curl`. [Postman](https://www.getpostman.com) (macOS, Linux, and Windows) and
[Paw](https://paw.cloud) (macOS only) are commercial alternatives.

Remember that you can also write a unit tests that invoke your application's
webhook route. Using `curl` and `httpie` is faster than sending an SMS each
time you test a change, but unit tests — especially with `pytest-watch` — are
faster yet.

## Further Reading

* Twilio's [Webhook](https://www.twilio.com/docs/glossary/what-is-a-webhook)
  page is a good overview with links to examples in various languages.
* Twilio's ["Receive and reply to SMS messages in
  Python"](https://www.twilio.com/docs/guides/how-to-receive-and-reply-in-python)
  is a complete (and very short) Flask application that replies when texted.
* The [Twilio → MQTT Gateway](https://github.com/olin-build/twilio-mqtt-gateway)
  source code is not long.

[^1]: Webhooks are an instance of the
    [publish/subscribe](http://www.enterpriseintegrationpatterns.com/patterns/messaging/PublishSubscribeChannel.html)
    pattern. Webhooks are generally used when the publisher and subscriber are
    controlled by different entities (Travis and GitHub, or Twilio and Olin).
    They require that the subscriber (Travis, our Twilio MQTT) run as a web
    server. Unlike other instances of publish/subscribe, such as RabbitMQ/MQTT,
    the webhook publisher and subscriber don't need common access to a shared
    resources. This simplifies configuration and security.

[^2]: Another use case is browsing a web app that's served from your laptop, on
      your phone.
