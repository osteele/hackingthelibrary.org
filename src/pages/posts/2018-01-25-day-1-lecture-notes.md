---
title: Day 1 Lecture Notes
author: "Oliver & Jeff"
date: 2018-01-25
draft: false  # so that graphql will infer this field exists
thumbnail: ./img/library-downstairs.jpg
---

## Engineering Topics

### Mentioned in the Activity

* A [message queue](https://en.wikipedia.org/wiki/Message_queue) is a queue used for inter-process communication. It decouples the sender and receiver in space, time, and code. See also [publish-subscribe](https://en.wikipedia.org/wiki/Publish–subscribe_pattern) ("pub/sub")
  * A [messsage broker](https://en.wikipedia.org/wiki/Message_broker) connects message publishers and subscribers, often using queues.
  * [MQTT](http://mqtt.org) is a message queue for Internet-of-Things (IoT). We're using it because I pulled this from another project; because it's arguably appropriate here; and because it may be appropriate depending on how we extend this.
* [Twilio](https://www.twilio.com) provides programmatic access to phone numbers.
* A **package** is a separately-distributable unit of software source, executables, assets, or a mixture of these.
  * A [package manager](https://en.wikipedia.org/wiki/Package_manager) automates the installation of packages.
  * `pip` is Python's package manager.
  * A Python `requirements.txt` file specifies the packages that a Python project
    depends on.
* An [environment variable](https://en.wikipedia.org/wiki/Environment_variable) is a variable that are assigned _outside_ of a program and process, but can be read _inside_ it. They're useful (1) to keep secrets out of source control, and (2) to write code that behaves differently in development or production, or can otherwise be configured without editing the source code.
* [JSON](https://www.json.org/) is a technology for **serializing** structured data.

### During Class

* A **virtual environment** is a mechanism for creating _isolated Python environments_, each with its own version of Python and/or set of Python packages.
  * This is useful for working on different projects on the same machine.
  * It also lets you install packages without using `sudo`. (This is the context in which this came up in class.)
* PostgreSQL is a **relational database engine**.
  * A **relational database** is a kind of a programmatic multi-sheet spreadsheet, with support for efficiency, concurrency (many simultaneous readers and writers), and integrity constraints.
  * **SQL** (Structured Query Language) is a language for querying and modifying the data in a relational database.
  * A **database constraint** is responsible for keeping bad data out of a database. In class
* [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) (Cross-Origin Resource Sharing) lets one web site (the _Skillz_ front end) make requests to another (the People API server).
* A [web hook](https://en.wikipedia.org/wiki/Webhook) is a route (URL) on one server, that another service on the internet can request (as though it were a browser) in order to let the first server know that an event has happened. This is how Twilio lets our server know when an SMS message has been sent.
* [The Hitchhiker’s Guide to Python](http://docs.python-guide.org/en/latest/#the-hitchhiker-s-guide-to-python) is the recommended guide to Python and its ecosystem.

## Design Topics

### Mentioned in Discussion

* [A moat (economics)](https://www.investopedia.com/terms/e/economicmoat.asp)
* [Social Invention](https://www.innovation.cc/books/7_1_1+8_2_7social-inventions-isbn.pdf)
* [Unconferences (based on Open Space Technology](https://en.wikipedia.org/wiki/Open_Space_Technology)
* [Ex Libris, New York Public Library Documentary](http://www.zipporah.com/films/46)
