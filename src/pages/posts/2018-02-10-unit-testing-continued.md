---
title: Unit Testing, Continued
topics: ['testing', 'unit tests', 'quality']
description: More unit tests for Bear. Some things that typically happen to your code when you add unit tests.
date: 2018-02-10 12:00:00
thumbnail: ./img/unit-test-parody-2.png
thumbnail_source_url: https://medium.cobeisfresh.com/unit-testing-in-swift-part-1-the-philosophy-9bc85ed5001b
---

Today I added unit-testing for more Bear-as-Service files. You can use these as more examples of unit testing.

(There's also plenty of information about Pytest and unit testing on the web. I'm calling these commits out in case you're now familiar enough with the Bear-as-a-Service code base to find it helpful to see some of this within that context.)

[Commit #`16c53d2`](https://github.com/olinlibrary/bear-as-a-service/commit/16c53d2) adds unit tests to  `tts_worker.py`. The final version of the test file is [here](https://github.com/olinlibrary/bear-as-a-service/blob/master/tests/tts_worker_test.py).

[Commit #`ea381ad`](https://github.com/olinlibrary/bear-as-a-service/commit/ea381ad) adds unit tests to `sms_bear_gateway.py`. The final version of the test file is [here](https://github.com/olinlibrary/bear-as-a-service/blob/master/tests/sms_bear_gateway_test.py).

## The Effects of Testing on the Code Being Tested

These commits show the changes to the *code being tested*, that were made in the same commit as the *tests themselves*. These kinds of changes are typical when adding tests, and are some of the benefits of testing. Things to note about this:

* I ended up refactoring some code in order to make it easier to test. For example, the body of the loop in `tts_worker` has been extracted to `process_speech_message`, in order to test it without having to mock `create_subscription_queue`. This improved the code structure, independent of testing.
* I added some docstrings and comments to the tested code. This wasn't (just) because I decided to concentrate on code quality today. Instead, it was a direct consequence of trying to understand the code well enough to write tests for it. In order to write these tests, I had to *reconstruct the intent* of code I’d previously written, and *understand* code I'd previously borrowed. I went ahead and wrote down what figure out, in order to reduce my cognitive load now (and not have to work as hard in the future).

## The Tests Themselves

Some observations about the test files themselves:

* `test_process_text_message` in  [`sms_bear_gateway_test.py`](https://github.com/olinlibrary/bear-as-a-service/blob/master/tests/sms_bear_gateway_test.py) defines a couple of helper functions, `mock_message` and `process_text_message_with`. Adding these helpers removes some of the repetition from running a bunch of similar tests. Making it easier to write more tests is generally good!
* However, some repetition in tests is normal! [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) isn't as applicable to tests as to the code being tested.
* It's okay if your test code suite becomes a whole program itself — with multiple files, helpers, mocks, *etc.* — so long as it's providing more benefit than cost. The issue with large test suites is that they can weigh down development, because you have to make every change twice — once in the code, and once in the code that tests it. This weight is a function not just of size *per se*. It's also caused by a tight coupling between the tests and aspects of the program that don't matter[^1], or by the presence of low-yield tests against code that's matched to rapidly-changing spec[^2].
* One style of unit testing is to write a separate function for each test, and give the function a descriptive name. This makes test failures easier to debug — you may be able to tell enough about what wrong from the name of the test itself, to go straight to the code being tested. It also makes for impressive stats and test reports. I used a *smaller* number of *larger* test functions instead, in order to get more tests onto the page. For me, this falls in the category of “making it easier to write [and maintain] more tests”.
* As before, these unit tests make heavy use of Python's [mocks](https://docs.python.org/3/library/unittest.mock.html) and the [`patch` decorator](https://docs.python.org/3/library/unittest.mock.html#the-patchers). These tests use a new feature of mocks: the ability of a mock method to compute a return value based on its arguments (the same as a regular method!). `test_process_text_message` in  [`sms_bear_gateway_test.py`](https://github.com/olinlibrary/bear-as-a-service/blob/master/tests/sms_bear_gateway_test.py) uses this to replace the profanity filter with one that doesn't depend on the particular implementation, so that we can reliably test messages that are and aren't detected as profane.[^3] (And, admittedly, so that I don't need to include profane words in the test source.)

[^1]: It's easy to implement dependencies on things that don't matter. The example tests' use of mocks, that hard-coded to specific MQTT and Twilio methods buried deep in methods of properties of mocks, are an example of this. A more developed example might separate out some of the dependencies of the code and the MQTT and Twilio libraries into an intermediate layer.
[^2]: User-interface presentations are a prime example of this. We'll probably get to specific tools for testing user interfaces.

[^3]: Another strategy would be to use a *context manager* ( `with patch(…, return_value=True)` or `…=False`) around each call to the tested function, to specify a different constant return value for each *context*; instead of the current *decorator* (`@patch(…, wraps=lambda…)` ) that computes a different value each time it's *called*.
