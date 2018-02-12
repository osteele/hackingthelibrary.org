---
title: How to Test Exceptions
author: Oliver
description: Unit-testing code that raises exceptions. Refactoring unit tests. Adding tests before you extend and refactor code.
date: 2018-02-10 17:40:00
---

In yesterday's post on test coverage, I mentioned that:

1. It's typical for your first coverage report to reveal that you aren't testing exceptions.
2. Eventually — in a high-quality production app, at least[^1] — you should address this.
3. The exception path in `create_subscription_queue` is not well designed anyway.

[Commit #`ba3d937`](https://github.com/olinlibrary/bear-as-a-service/commit/ba3d937) addresses these issues:

* `create_subscription_queue` still catches `socket.error`, but instead of printing and otherwise ignoring it, it logs it and re-raises it.
* `test_create_subscription_queue` used to include code to create a mock for `paho.mqtt.client.Client`. This is a complicated mock, because the API of the real `paho.mqtt.client.Client` is to call methods that are attached to the object that it creates, so the mock needs to do this too. Now that `test_create_subscription_queue` is joined by another function, I've factored the code that constructs this mock out into its own function.
* It's easy to test that a function *doesn't* raise an exception. If it *does* raise an exception, this fails the test! (This is why `assert` fails the test, when the asserted value is false.) To reverse this, place the code that's expected to raise an exception inside a `with pytest.raises(…)` block, where `…` is the type of the expected error.
* Remove `exclude_lines = except socket.error as err`. This code is now tested. Actually, I never meant to commit this exclusion. I used as an example of how you'd do an exclusion in the last article, and forgot to take it out — it's good that the coverage report said that the exception handler was untested, and I didn't mean to turn this off. The next article gives a better example of an exclusion.

## The size of a test commit

This commit both adds testing to existing code, and changes functionality, by changing `create_subscription_queue` not to swallow an underlying exception.

I generally like to separate this kind of change across multiple commits: one that *only* adds tests, *followed by* a commit that changes the *code being tested* (and updates the tests as necessary).

An example from yesterday: One commit ([commit #`16c53d2`](https://github.com/olinlibrary/bear-as-a-service/commit/16c53d2) ) added tests for `tts_worker.py` (and refactored the code in that — *without* changing its behavior — in order to make it testable). This laid the groundword for the following commit ([commit #`23c883c`](https://github.com/olinlibrary/bear-as-a-service/commit/23c883c)), which extended the functionality of the tested code. Since there were already test cases,  they could catch regressions — that is verify, that adding the new functionality didn't break the old.

Today I didn't do this, because I couldn't figure out a reasonable way to test `create_subscription_queue`'s error condition[^2]. This is yet more evidence that that case was poorly designed, and is another example where trying to write the test ended up improving the design.

[^1]: This degree of test coverage may not be worth it for one-offs or short-lived projects. In fact, not every project calls for unit tests at all. Although — even for one-offs and projects that you *expect* to be short-lived, your bias against unit tests is probably too strong, and using unit tests in even a small brief project will often save you net time and frustration. At least this continues to be true for me, and I was writing test frameworks while you were in middle school! ([one](https://github.com/osteele/lztestkit), [two](https://github.com/osteele/cl-spec)).
[^2]: I could have patched `sys.stderr.write`, but this seems likely to interfere with the test runner's error reporting itself. Modifying the code to use the logger instead is not only the right thing, but would let me patch the just that module's logger in order verify that the error was logged. In this case I didn't end up adding even that check, because I'm not sure that the exception should even do its own error reporting, and didn't want to add to the body of code that assumes it will. I left the logging in as part of the principle of making the smallest (code and behavior) changes necessary in order to add testing at all.