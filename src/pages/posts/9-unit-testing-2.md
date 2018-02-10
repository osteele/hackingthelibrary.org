---
title: Unit Testing, Continued
description: More unit tests for Bear. Some things that typically happen to your code when you add unit tests. Testing exceptions (TBD).
date: 2018-02-10 12:00:00
author: Oliver
---

Today I added unit-testing for more bear files. You can use these as more examples of unit testing. 

(There's also plenty of information about Pytest and unit testing on the web. I'm calling these commits out in case you're now familiar enough with the Bear-as-a-Service code base to find it helpful to see some of this within that context.)

[Commit #`16c53d2`](https://github.com/olinlibrary/bear-as-a-service/commit/16c53d2) adds unit tests to  `tts_worker.py`. The final version of the test file is [here](https://github.com/olinlibrary/bear-as-a-service/blob/master/tests/tts_worker_test.py).

[Commit #`ea381ad`](https://github.com/olinlibrary/bear-as-a-service/commit/ea381ad) adds unit tests to `sms_bear_gateway.py`. The final version of the test file is [here](https://github.com/olinlibrary/bear-as-a-service/blob/master/tests/sms_bear_gateway_test.py).

The commits show the changes to the *code being tested*, that were made in the same commit as the *tests themselves*. These kinds of changes are typical when adding tests, and are some of the benefits of testing. Things to note about this:

* I ended up refactoring some code in order to make it easier to test.
* I also added some docstrings and comments to the tested code. This wasn't (much) because I decided to concentrate on code quality today — it was a direct consequence of trying to test the code. In order to write tests, I had to remember code I’d previously written / understand code I'd previously borrowed. I went ahead and wrote down what I’d figured, out in order to reduce my cognitive load.

In regards to the test code itself:

*  [`sms_bear_gateway_test.py`](https://github.com/olinlibrary/bear-as-a-service/blob/master/tests/sms_bear_gateway_test.py) defines a couple of helper functions. Adding these helpers removes some of the repetition out of running a bunch of similar tests. Making it easier to write more tests is generally good!
* It's okay if your test code begins to look like its own program, with multiple files, helpers, mocks, etc., so long as it's providing more benefit than cost. The things that will kill you are lots of tight coupling between your tests and those aspects of your program that don't matter[^1], or


* One style of unit testing is to write a separate function for each test, and give the function a descriptive name. This makes test failures easier to debug — you may be able to tell enough about what wrong from the name of the test itself, to go straight to the code being tested. It also makes for impressive stats and test reports. I used a *smaller* number of *larger* test functions instead, in order to get more tests onto the page. For me, this falls in the category of “making it easier to write [and maintain] more tests”.
* As before, these unit tests make heavy use of Python's [mocks](https://docs.python.org/3/library/unittest.mock.html) and the [`patch` decorator](https://docs.python.org/3/library/unittest.mock.html#the-patchers).

TBD (later today): Testing exceptions.

[^1]: It's easy to implement dependencies on things that don't matter. The example tests' use of mocks, that hardcoded to specific MQTT and Twilio methods buried deep in methods of properties of mocks, are an example of this. A more developed example might separate out some of the dependencies of the code and the MQTT and Twilio libraries into an intermediate layer.