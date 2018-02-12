---
title: Code Coverage Revisited
author: Oliver
description: Unit-testing code that raises exceptions. Refactoring unit tests. I was wrong about `logger.info`. Ignoring `if __name__ == "__main__"`.
date: 2018-02-10 20:00:00
---

I used `logger.info` as an example of code that can be excluded from test coverage, since with logging disabled, nothing is logged.

Oops.

`logger.info` is still *called*, even if it decides, once called, to do nothing.

The reason that the `logger.info` lines of code were showing up red in the test coverage reports was that the were in *methods* — `on_log`, `on_publish`, `on_disconnect`, all nested inside `create_subscription_queue` — that were never called.

That's a legitimate gap in coverage. Maybe those methods would raise an exception if they were ever covered — for example, if they're defined with a different number of parameters than the number arguments the MQTT client calls them with.

The proper response is either to add tests that cover these methods, or to decide that they're not necessary, and remove them. (As a code base mature, code that isn't worth *testing* probably isn't worth *keeping*.)

[Commit #`ba3d937`](https://github.com/olinlibrary/bear-as-a-service/commit/ba3d937)  therefore also removes `exclude_lines = logger.info` from `setup.cfg`.

In their place I've added an exclusion for blocks that begin `if __name__ == "__main__"`, since a test function can never call these, and therefore including them in the coverage statistics is not helpful.

