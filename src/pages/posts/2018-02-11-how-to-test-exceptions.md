---
title: How to Test Exceptions
author: Oliver
description: Unit-testing code that raises exceptions. Refactoring unit tests. I was wrong about `logger.info`. Ignoring `if __name__ == "__main__"`.
date: 2018-02-10 17:40:00
draft: true
thumbnail: ./img/unit-test-parody-2.png
---

In yesterday's post on test coverage, I mentioned that (1) it's typical for your first coverage report to reveal that you aren't testing exceptions; (2) eventually — in a high-quality production app[^1] — you should fix this; and (3) the exception path in `create_subscription_queue` is not well designed anyway.[^2]

# # [Commit #`ba3d937`](https://github.com/olinlibrary/bear-as-a-service/commit/ba3d937) addresses these issues.

Things to note:

refactoring

repetition

one change at a time. example from yesterday.

## Oops — Don't Ignore `logger.info`

Reasoning was wrong. It's not covered because those methods aren't called.

Replaced it with ignore `__main__`, since this can never be called by a test function.

[^1]: This degree of test coverage may not be worth it for one-offs or short-lived projects. In fact, not every project calls for unit tests at all. Although — even for one-offs and projects that you *expect* to be short-lived, your bias against unit tests is probably too strong, and using unit tests in even a small brief project will often save you net time and frustration. At least this continues to be true for me, and I was writing test frameworks while you were in middle school! ([one](https://github.com/osteele/lztestkit), [two](https://github.com/osteele/cl-spec)).
