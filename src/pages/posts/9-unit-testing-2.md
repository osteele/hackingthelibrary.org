---
title: Unit Testing, Continued
description: More unit tests for Bear. Some things that typically happen to your code when you add unit tests. Testing exceptions (TBD).
date: 2018-02-10 12:00:00
author: Oliver
---

## More Unit Tests

Today added unit-testing for more bear files, that you can use as an example.

[Commit #`16c53d2`](https://github.com/olinlibrary/bear-as-a-service/commit/16c53d2) adds unit tests to  `tts_worker.py`. The final version of the test file is [here](https://github.com/olinlibrary/bear-as-a-service/blob/master/tests/tts_worker_test.py).

[Commit #`ea381ad`](https://github.com/olinlibrary/bear-as-a-service/commit/ea381ad) adds unit tests to `sms_bear_gateway.py`. The final version of the test file is [here](https://github.com/olinlibrary/bear-as-a-service/blob/master/tests/sms_bear_gateway_test.py).

The commits are interesting to look at, because they show the changes that were made in the same commit as the tests, in order to make the code easier to test.

Things to note:

* I ended up refactoring some code in order to make it easier to test. This is typically happens when you add tests. 
* As before, this makes heavy use of Python's mocks and `patch`.
* The newest test file contains a couple of helper functions, to take some of the repetition out of running a bunch of similar tests.
* I also added some docstrings and comments to the tested code. This was another side effect of testing (the first was refactoring the code) — in order to write tests, I had to remember/understand the code I’d previously written or borrowed, so I went ahead and wrote down what I’d figured out in order to reduce my cognitive load.
* One style of unit tests is to write a separate function for each test, and give the function a descriptive name. I used a smaller number of larger functions instead, in order to get more tests onto the page where it’s easier to work with them all.

TBD (later today): Testing exceptions.