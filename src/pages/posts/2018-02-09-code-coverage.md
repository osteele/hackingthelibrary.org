---
title: Code Coverage
date: 2018-02-09
author: Oliver
thumbnail: ./img/coverage-2.png
---

Your *program* implements functionality, aka behavior.

Your *test suite* is supplementary code, that compares the *actual* behavior (from running the program) to the *expected* behavior (that's coded into the test suite). Think of it as double-entry bookkeeping. You have to things twice[^1]; in return, one of these is a check on the other — bugs in your code show up when there's a test case that says what to expect; bugs in your tests show up when they're compared against the correct behavior in your program.

Some parts of your code end up being tested, some don't.

[Code coverage](https://en.wikipedia.org/wiki/Code_coverage) (or test coverage) is a measure of how much of your code is executed by tests.

(There's a few different ways this can be defined. Check out [basic coverage critera](https://en.wikipedia.org/wiki/Code_coverage#Basic_coverage_criteria). It's worth thinking about these as you design your tests.)

A **code coverage tool** runs your test suite against an [instrumented](https://en.wikipedia.org/wiki/Instrumentation_(computer_programming)) version of your program, and reports its coverage.

In pseudo-math[^2]:

* Test suite: $\textit{expected behavior} - \textit{actual-behavior} = \textit{bugs}$
* Code coverage: $\textit{all source code} - \textit{tested source code} = \textit{possible and future bugs}$[^3]

![](./img/code-coverage.png)

In our example projects, we're using pytest as a test runner. The `assert` commands, that do the work of comparing the actual to the expected results, *look* like they're part of the test code, but when they're run Pytest, they're actually part of the test *framework*  — because Pytest intercepts failures and reports the actual and expected results itself, which the built-in `assert expected == actual` can't do.

[^1]: Therefore it's important to say things in two *different* ways. One way to write a bad test is to use the same code in the test that you used in the code being tested. One way around this is for the test to implement a different algorithm that implements the same functionality as the code being tested — but this is very expensive, and error prone. More common is to write the test at a *different level of generality and abstraction* — the code being tested works for all values, but the test just spot checks a few, and uses a hard-coded value that you've manually verified.
[^2]: Pseudo-math is great for making hacking look more engineering-y. But for extra fake legitimacy, nothing beats applying *physics* terms to programming. [And this has been done](https://en.wikipedia.org/wiki/Heisenbug)!
[^3]: We just don't know what's lurking in here, except through manual testing — and then only the version we manually tested.

## Running the Coverage tool

We will use the Ned Batchelder's [Coverage.py](https://coverage.readthedocs.io/en/coverage-4.5/) to measure test coverage. Since we've been using the [`pytest` framework](https://docs.pytest.org/en/latest/), we'll use [pytest-cov](https://pypi.python.org/pypi/pytest-cov) to integrate Coverage.py with `pytest`.

First, install the `coverage` and `pytest-cov`:

```bash
$ pip3 install coverage pytest-cov
```

Now run `pytest` with the `—-cov` option, to print a code coverage report to the terminal:

```bash
$ pytest --cov=.
============================== test session starts ===============================
platform darwin -- Python 3.6.4, pytest-3.2.5, py-1.5.2, pluggy-0.4.0
rootdir: /Users/osteele/code/bear, inifile:
plugins: cov-2.5.1
collected 2 items

tests/mqtt_json_test.py ..

---------- coverage: platform darwin, python 3.6.4-final-0 -----------
Name                                 Stmts   Miss  Cover
--------------------------------------------------------
mqtt_json/__init__.py                    7      0   100%
mqtt_json/mqtt_config.py                18      0   100%
mqtt_json/receive_mqtt_messages.py      52     11    79%
mqtt_json/send_mqtt_messages.py         27     14    48%
tests/mqtt_json_test.py                 24      0   100%
--------------------------------------------------------
TOTAL                                  128     25    80%


============================ 2 passed in 0.14 seconds ============================

```

This reports the number of statements, per file, that our existing test suite[^4]  invokes.

You could add  `--cov-report term-missing` in order to see the line numbers of uncovered statements, next each file. See the [pytest-cov](https://pypi.python.org/pypi/pytest-cov) for more on this.

Instead, we're going to take a different path. The `—cov-report` option creates a set of HTML files, that present the source code annotated with coverage information.

```bash
$ pytest --cov=. --cov-report html:coverage
```

This command creates a report in the `coverage` subdirectory of the current directory. (The `coverage` path, after the colon in `html:coverage` argument, specifies this.) Open `./coverage/index.html` in a browser[^5]. It looks like this:

![](./img/coverage-1.png)

So far, just a different view of was printed in the terminal earlier. Here's where it differs. Click on one of the filenames to view a page like this:

![](./img/coverage-2.png)

The red shows code that the test suite doesn't cover. The main function code is covered; the functions that add a command-line interface, for interactively testing this function, aren't. (In a program whose point was the command-line interface, I'd go ahead and add unit tests for `repl` and `main`. I'd also do this if I wanted to refactor them, or had issues with regressions in those functions.) Here's another file:

![](./img/coverage-3.png)

Takeways from this file:

* The logging code isn't executed. The test suite could test these by setting the logging level.
* The exception clause (`except socket.error`) isn't tested. This is a typical finding for an initial coverage test. To make a robust program I'd want to test this.
* In fact, the exception clause doesn't look very well thought-out. Unlike the rest of the file, it prints directly to standard error instead of using the logger. And, continuing without subscriptions probably doesn't make sense here — it changes what should be a hard failure into a more subtle error, where things just don't work and you need to look back through the output to notice why. The function should throw an error instead (or just not catch this one). This issue — that the error case is underdesigned or absent — is also typical.

## Removing Clutter

You may have noticed that the coverage tool reports the coverage of the test file itself.

This is harmless, but annoying. It distracts from the code that's actually meant to be covered, and also gives misleading statistics, if you're tracking those.

If the only issues reported are the ones you care about, it's easier to tell what to focus on. And it's easier to tell when something turns red, than when a count increases by one.

You can tell Coverage to ignore certain files by adding a section to the project's  `setup.cfg`  file[⁶][⁷].

```ini
[coverage:report]
omit =
    tests/*
```

Now `pytest --co=.` and `pytest --cov=. --cov-report html:coverage` will omit the file(s) in `./tests` from the coverage report. (Pytest still *runs* this file.)

Similarly, maybe we don't care to test `logger.info` lines, and don't want them cluttering up our annotations and stats with false positives. Add  `exclude_lines`  to the `[coverage:report]` section to ignore occurrences of `logger.info`.

```ini
[coverage:report]
exclude_lines =
    logger.info
omit =
    tests/*
```

We could also ignore the exception clause, although I don't recommend it. Add another pattern to `exclude_lines` to ignore *all* lines that match a pattern, or add a `#pragma` comment to an individual source file. (You may notice a parallel with our lint tool, that could use either a line in the configuration file or `#noqa` comments in the source.) See [the docs on excluding files](https://coverage.readthedocs.io/en/coverage-4.5/excluding.html) for more information.

## Branch Coverage

Do you remember the [basic coverage critera](https://en.wikipedia.org/wiki/Code_coverage#Basic_coverage_criteria) from the top of this post? What we've got now is statement coverage. The Coverage tool can be configured to record branch coverage as well. Add this to `setup.cfg`:

```ini
[coverage:run]
branch = True
```

Now your coverage reports will show per-branch coverage, with hover text that gives details.

![](./img/coverage-4.png)

## Putting it all together

[Commit #`c3e1a9a`](https://github.com/olinlibrary/bear-as-a-service/commit/c3e1a9a) adds test coverage to Bear-as-a-Service. It does these things:

* Add `coverage` and `pytest-cov` to the requirements file.
* Document them in the README.
* [Optional] Add configuration information to `setup.cfg`.
* Running the coverage tool as documented will place files in `./coverage`. These shouldn't be committed to the repo. Therefore, this commit also adds this directory to `.gitignore`.

[Commit #`cbada69`](https://github.com/olinlibrary/bear-as-a-service/commit/cbada69) enables branch coverage.

[^4]: Currently just the one file `tests/mqtt_json_test.py`.
[^5]: On macOS, you can do this from the command line: `open ./coverage/index.html`. On Ubuntu, `firefox ./coverage/index.html` or `google-chrome ./coverage/index.html` may work.
[^6]: We created this file when we configured `flake8`, and updated it with an `[isort]` section in order to configure `flake8-isort`.
[^7]: You could also specify the file(s) to omit as a command-line option to `pytest`. Putting it in the configuration file means it's shared across time — you'll get the benefit of the options later — and space — your collaborators and CI server will use the same options.
