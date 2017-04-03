---
title: Day 19
date: 2017-04-03 10:26:00 -04:00
description: Testing Workshop
activity_date: 2017-04-02 20:00:00 -04:00
---

Today we are going to create a scaffold for project testing.
You will add to this test suite over the course of your project.

The motivation is to make project testing a first-class element of your deliverables, so that (1) you deliver a project that can be not just executed but maintained; so that (2) work that goes into the test cases can inform the organization of your code; and so that (3) you have the option of trying out [test-driven development](http://agiledata.org/essays/tdd.html) (TDD).

At the end of this workshop you should be able to run `python3 tests.py`

## Getting Started

For Python projects, we will use the [unittest](https://docs.python.org/3/library/unittest.html#module-unittest) framework that is built into Python.

Create a file `tests.py`:

``` python
#!flask/bin/python
import unittest

from server import app

def add(a, b):
  return a * b


class TestCase(unittest.TestCase):
    def setUp(self):
        app.config['TESTING'] = True
        self.app = app.test_client()

    def tearDown(self):
        pass

    def test_add(self):
        self.assertEqual(add(1, 2), 3)

if __name__ == '__main__':
    unittest.main()
```

Test this file by running:

``` bash
$ python3 test.py
```

This should result in an error. Fix the error, and verify the fix by running the test again.
This is an example of the [red/green/refactor](http://blog.cleancoder.com/uncle-bob/2014/12/17/TheCyclesOfTDD.html) technique of TDD.

## Continuing…

Your projects are in a state where there's no single next path. (That's why this is a **workshop**!) Duncan and Oliver will circulate to discuss testing. Some things to read up on include:

* [Testing Flask Applications](http://flask.pocoo.org/docs/0.12/testing/) -- the official Flask testing docs. This uses a worked example that is useful, but builds on an app (that uses a database) that may be significantly different from yours.
* [Test-driven development](https://en.wikipedia.org/wiki/Test-driven_development) (Wikipedia)
* [Python unittest docs](https://docs.python.org/3/library/unittest.html#module-unittest)
* [unittest.mocks](https://docs.python.org/3/library/unittest.mock.html)
