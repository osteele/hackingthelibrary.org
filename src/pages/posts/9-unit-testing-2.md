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

The commits show the changes to the *code being tested*, that were made in the same commit as the *tests themselves*. Things to note about this:

* I ended up refactoring some code in order to make it easier to test. This is typically happens when you add tests.
* I also added some docstrings and comments to the tested code. This was another side effect of testing (the first was refactoring the code) — in order to write tests, I had to remember/understand the code I’d previously written or borrowed, so I went ahead and wrote down what I’d figured out in order to reduce my cognitive load.

And in regards to the tests themselves:

* The [`sms_bear_gateway_test.py`](https://github.com/olinlibrary/bear-as-a-service/blob/master/tests/sms_bear_gateway_test.py) defines a couple of helper functions. This removes some of the repetition out of running a bunch of similar tests. Making it easier to write more tests is generally good. 


* One style of unit testing is to write a separate function for each test, and give the function a descriptive name. This makes test failures easier to debug — you may be able to tell enough about what wrong from the name of the test itself, to go straight to the code being tested. It also makes for impressive stats and test reports. I used a *smaller* number of *larger* test functions instead, in order to get more tests onto the page. For me, this falls in the category of “making it easier to write [and maintain] more tests”.
* As before, these unit tests make heavy use of Python's [mocks](https://docs.python.org/3/library/unittest.mock.html) and the [`patch` decorator](https://docs.python.org/3/library/unittest.mock.html#the-patchers).

TBD (later today): Testing exceptions.