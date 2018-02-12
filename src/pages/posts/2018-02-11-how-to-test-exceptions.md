---
title: How to Test Exceptions
author: Oliver
description: Unit-testing code that raises exceptions. Refactoring unit tests. I was wrong about `logger.info`. Ignoring `if __name__ == "__main__"`.
date: 2018-02-10 17:40:00
thumbnail: ./img/unit-test-parody-2.png
---

In yesterday's post on test coverage, I mentioned that:

1. It's typical for your first coverage report to reveal that you aren't testing exceptions.
2. Eventually — in a high-quality production app, at least[^1] — you should address this.
3. The exception path in `create_subscription_queue` is not well designed anyway.

[Commit #`ba3d937`](https://github.com/olinlibrary/bear-as-a-service/commit/ba3d937) addresses these issues:

* `create_subscription_queue` still catches `socket.error`, but instead of printing and otherwise ignoring it, it logs it and re-raises it.
* `test_create_subscription_queue` used to include code to create a mock for `paho.mqtt.client.Client`. This is a complicated mock, because the API of the real `paho.mqtt.client.Client` is to call methods that are attached to the object that it creates, so the mock needs to do this too. Now that `test_create_subscription_queue` is joined by another function, I've factored the code that constructs this mock out into its own function.
* It's easy to test that a function *doesn't* raise an exception. If it *does* raise an exception, this fails the test! (This is why `assert` fails the test, when the asserted value is false.) To reverse this, place the code that's expected to raise an exception inside a `with pytest.raises(…)` block, where `…` is the type of the expected error.

This commit both adds testing, and changes functionality, by changing `create_subscription_queue` not to swallow an underlying exception. The best practice is to keep your changes smaller: commit a test that *only* adds tests, and *follow this* by a commit that changes the code being tested (and updates the tests as necessary). I did this yesterday where one commit ([commit #`16c53d2`](https://github.com/olinlibrary/bear-as-a-service/commit/16c53d2) ) added tests, in order that the following commit ([commit #`23c883c`](https://github.com/olinlibrary/bear-as-a-service/commit/23c883c)) could change the functionality of the tested code, in the presence of already-tested test cases to catch regressions. Here I didn't do that, because I couldn't figure out how to test `create_subscription_queue`'s error condition — which was more evidence that it was poorly designed. This is another example where trying to write the test ended up improving the code.

## Don't Ignore `logger.info`

I used `logger.info` as an example of code that can be excluded from test coverage, since with logging disabled, nothing is logged.

Oops.

`logger.info` is still *called*, even if it decides, once called, to do nothing.

The reason that the `logger.info` lines of code were showing up red in the test coverage reports was that the were in *methods* — `on_log`, `on_publish`, `on_disconnect`, all nested inside `create_subscription_queue` — that were never called.

That's a legitimate gap in coverage. Maybe those methods would raise an exception if they were ever covered — for example, if they're defined with a different number of parameters than the number arguments the MQTT client calls them with.

[Commit #`ba3d937`](https://github.com/olinlibrary/bear-as-a-service/commit/ba3d937)  therefore also removes `exclude_lines = logger.info` from `setup.cfg`.

It also removes `exclude_lines = except socket.error as err`, which I used as an example in the last post, but didn't mean to actually include in the list of exclusions.

In their place I've added an exclusion for blocks that begin `if __name__ == "__main__"`, since a test function can never call these, and therefore including them in the coverage statistics is not helpful.

[^1]: This degree of test coverage may not be worth it for one-offs or short-lived projects. In fact, not every project calls for unit tests at all. Although — even for one-offs and projects that you *expect* to be short-lived, your bias against unit tests is probably too strong, and using unit tests in even a small brief project will often save you net time and frustration. At least this continues to be true for me, and I was writing test frameworks while you were in middle school! ([one](https://github.com/osteele/lztestkit), [two](https://github.com/osteele/cl-spec)).