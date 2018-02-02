---
path: /posts/testing-1
title: Python Unit Tests
description: Adding unit tests to a Python program.
date: 2018-02-01
image: unit-test-parody.jpg
image_source: https://medium.cobeisfresh.com/unit-testing-in-swift-part-1-the-philosophy-9bc85ed5001b
---

Yesterday I added unit tests and continuous integration to [Bear-as-a-Service](https://github.com/olinlibrary/bear-as-a-service). This post briefly describes the first half of this (unit testing). Tomorrow will describe the continuous integration piece.

## Unit tests

[Commit #d3930](https://github.com/olinlibrary/bear-as-a-service/commit/d393031b9988f18cf2050f7c2da1e4d629b5f4e0) adds unit tests for (some of) the functionality in the `mqtt_json` subdirectory.

This uses the [pytest](https://docs.pytest.org/en/latest/) framework. Write a file that ends in `_test.py`, add functions that end in `_test`, and use [`assert` statements](https://wiki.python.org/moin/UsingAssertionsEffectively) in these functions. Then run `pytest` from the command line to run the tests.

Note that this commit does three things: it adds the test file, adds the test runner to `requirements.txt`, and it adds the instructions for how to run the tests to the README. The code, the requirements, and the README (and other docs) should all be kept in sync.

The setup instructions lead to a running system", and "the docs tell me how to use and develop the system". Most changes to the code don't require touching the other two; adding a package or workflow (this change does both) are exceptions.

Also note that *pytest* is a different test framework from the [`unittest` module](https://docs.python.org/3/library/unittest.html) from the Python standard library, and that you may have used in the [SoftDes unittest toolbox](https://toolboxes.olin.build/unittest/). I prefer pytest because it's less verbose. It also automatically extracts the values to print alongside assertion failures, which is handy.

## Mocks

In unit testing, it's useful to test one class or function without bringing in object from another class. [`unittest.mock`](https://docs.python.org/3/library/unittest.mock-examples.html?highlight=assert) is useful for this. It allows you to create a *stub*: a function call that just returns, or a class all of whose methods are stubs as well; and to temporarily replace ("patch") the classes and functions in a module by these stubs. Python stubs are also *mocks*, that can return a value or have other attached behavior, and *spies*, that record whether a function was called so that you can write an `assert` against it later. In `unittest.mock`, these three roles are bundles together and called "mocks"; in other frameworks, you may find them provided separately.

`test_config` is an example of patching a mock. `test_create_subscription_queue` is an atypically complicated example; it's what I needed in order to test this function, but I don't recommend it as an example. (I may go back and refactor or comment it more later.)

## Test Watchers

Most languages' test runners have a "watch" option. This re-runs the test when a file changes. Watch mode lets you leave the test running in one pane, and see when your edits break the tests (turn the "red") or fix them (turn them "green").

Pytest doesn't have a watch option. Commit #`d3930` therefore also includes [pytest-watch](https://github.com/joeyespo/pytest-watch) among the new package dependencies, and describes how to use in the README.
