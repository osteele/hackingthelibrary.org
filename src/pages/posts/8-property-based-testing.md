---
title: Property-Based Testing
description: More unit tests for Bear. Property-based testing and the Hypothesis package. Property-based testing and fuzz testing. 
date: 2018-02-10
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

## Property-Based Testing

If you’re set with unit tests, I strongly encourage you to look at property-based testing. The [Hypothesis library](https://hypothesis.readthedocs.io/en/latest/index.html)’s README has an excellent explanation, and is easy to use. My example projects aren’t doing the kind of algorithmic work that kind of testing most applies to (here’s how to tell: there’s aren’t many loops or conditionals in the code), so, unlike some other course topics, I’m not going to use them to demonstrate this kind of testing, but there’s plenty of great examples in the Hypothesis docs.

## Some Philosophy

In conventional testing, your test specifies the *input* and the *expected output*, and the test framework compares them.

This approach works well when you can think of all the inputs that might cause a problem. [Path coverage](https://en.wikipedia.org/wiki/Code_coverage#Basic_coverage_criteria), mentioned yesterday, is a good way to think of this.

Property testing is an alternative to explicit enumeration of the inputs. A property tester passes random inputs to a function, to see if it breaks.

What does “break” mean? At its simplest, it means crash or raise a exception. If a function is defined to return a value for any input in a range, we can simply throw lots of values at it and verify that it always returns.

You may know more about the relationship between the input and the output, that you can make use of in an assert statement. For example, if you're testing a `string_reverse` function, you can spot-check a few strings. But you can also list some properties that relate the function's input to its output:

1. `string_reverse` of a one-letter string is itself
2. `string_reverse` of a string has the same characters as the original
3. Moreover, each character occurs the same number of times
4. `string_reverse` applied twice produces the original input
5. For a non-empty string, the *first* letter of the input is the *last* character of the output.
6. And vice versa.

With Pytest, we can spot-check some of these properties against individual strings.

## Property Testing and Fuzz Testing

Closely related to property testing is *fuzzing*, or [*fuzz testing*](https://en.wikipedia.org/wiki/Fuzzing). Here's a couple of good readings about the difference:

* [What is Property Based Testing?](http://hypothesis.works/articles/what-is-property-based-testing/), David R. MacIver (the author of the Hypothesis library).
* [Property-Based Testing Is Fuzzing](https://blog.nelhage.com/post/property-testing-is-fuzzing/), Nelson Elhage

