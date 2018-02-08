---
title: Overview of Code Quality Tools
author: Oliver
date: 2018-02-08 08:00:00
description: Code quality tools run in your editor, on the command line, or in the cloud.
thumbnail: ./img/roses_are_red.jpg
thumbnail_source: Mahdi Yusuf
thumbnail_source_url: https://twitter.com/myusuf3/status/959825166585876481
---

> Oh no, my code compiles! Now the hard part!
>
> — <cite>me, several times a week</cite>

This article is me philosophizing. You can skip to the next essay, which describes the actual use of one of the code quality tools, and check back here to once you're familiar with some tools in practice, or not check back here at all.

## Code Quality

There are principles of software design that, when followed, contribute to code quality. The [SOLID principles](https://en.wikipedia.org/wiki/SOLID_(object-oriented_design)), Wikipedia's [design concepts](https://en.wikipedia.org/wiki/Software_design#Design_Concepts) and [design considerations](https://en.wikipedia.org/wiki/Software_design#Design_considerations), and the principles of [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) and [YAGNI](https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it) are a great start. I don't know any easily-used tools that examine these; any tools at all that report on most of them; or any way to learn them except long practice, with reflection and feedback — which I will try to give you over the course of the semester, but doesn't have to do with today's topic.

There are also software development *methodologies* that lead to better quality. These include requirement analysis, familiarity with design and architectural patterns, testing, documentation, and some of the processes you've learned in other classes, such as Sprints (where appropriate) and team and personal kaizens. That's not today's topic either.

So…on to code quality *tools*.

## Quality Tools

Code quality tools are pieces of software that run in your editor, on the command line, or in the cloud, and give you feedback on various aspects of your code. Some of them can also *fix* code — generally only when the issues are stylistic (inconsistent or non-standard use of indentation and other spacing).

### Static analysis tools

Static analysis examine your *source code*. 

* Linters. “Linting” is a general term for a program that examines source code for compliance with style and coding guides. They also detect patterns (ignoring a return value; an undefined or unused variable; an `except` clause with no body) that are generally associated with errors. Often linters are formatters or format checkers too.
* Type checkers. Tools that test whether any type annotations in your code (below) are consistent with each other and with named and computed values; and whether the types of expressions are consistent with each other. A type checker would detect if . (In compiled languages, such as C/C++, Go, and Rust, the compiler also does this, whether or not you run a separate type checker.)

Documentation generators (that extract documentation from your source code) are *adjacent* to static analysis tools. Like the other static analysis tool, a documentation tool examines your program source code. A documentation tool isn't intended for *analysis* or *source code quality*, but often the process of trying to write documentation for a program forces you to re-consider its structure in ways that improve the quality.

### Dynamic analysis tools

Dynamic analysis tools *run* your program, and examine its runtime (“dyamic”) behavior. They include:

* Debuggers.


* Profilers measure the runtime and resource consumption of your program. These can be used in conjunction with testing and CI to detect performance regressions.
* Leak detectors. Tools such as [valgrind](http://valgrind.org), and functionality that is built into IDEs such as Visual Studio (not Visual Studio *Code*) and XCode, can detect memory leaks (memory that is allocated but never released), and invalid memory references (memory that is released and subject to reclamation, but subsequently referenced anyway)  in compiled languages. This can't happen in Python. The more general case of *resource* leaks (database connections, file descriptors, or file storage, that increases without bound over the life of the program) can. There are 
* Code coverage tools. These work in conjunction with your test suite. They run an *instrumented* version of your code and tests, and report which elements of your program aren't tested.
* Additional instrumentation tools too numerous to mention.

## Beyond code quality tools

A complete developer workbench might include an editor or IDE, code quality tools, a test runner, a doc generator, and a variety of profiling tools and debuggers to examine and debug various aspects of program performance and interaction.

## Beyond Python

Like other posts in this series, this will focus on Python. As with unit test frameworks, test runners, mocking libraries,  every modern mainstream programming language comes with its own version of this.[^3]

[^1]: There's large number of alternatives in Python. Other languages some fewer; some have only one. More on that in the section “Alternatives to `flake8`”.
[^2]: The Twilio MQTT Gateway repo distinguishes between `requirements.txt`, which lists only those packages necessary to *run* the code, and `requirements-dev.txt`, which also lists those packages required to *develop* the code. If we used that distinction here, we'd put `flake8` in `requirements-dev.txt`, not `requirements.txt`.
[^3]: The same is true of libraries and frameworks. Every general-purpose language you're likely to run into will have libraries or module for strings, files and file names, HTTP requests, JSON encoding and decoding, and web servers — it's just a matter of finding them.