---
title: Property-Based Testing
description: >
    Property-based testing generates input values with which to test your functions.
    The Hypothesis package implements property-based testing for Python.
    Fuzz testing and property-based testing are closely related.
topics: ['testing', 'unit tests', 'property-based testing', 'quality']
thumbnail: ./img/property-based-testing.png
---

If you’re all set with unit tests, I strongly encourage you to look next at **property-based testing**. The [Hypothesis library](https://hypothesis.readthedocs.io/en/latest/index.html) is easy to use with Python. It includes an excellent [introduction to property-based testing](https://hypothesis.readthedocs.io/en/latest/index.html), and an easy [tutorial](https://hypothesis.readthedocs.io/en/latest/quickstart.html).

Property-based testing (aka [“quickcheck-style testing”](https://en.wikipedia.org/wiki/Model-based_testing)), is available for a number of languages[^1].    [JSVerify](https://jsverify.github.io/) implements property-based testing for JavaScript.

Our example projects aren’t doing the kind of algorithmic work that this kind of testing most applies to[^2], so, unlike some other course topics, I’m not going to use these projects to demonstrate this kind of testing. Instead, there’s plenty of great examples in the [Hypothesis docs](https://hypothesis.readthedocs.io/en/latest/index.html).

[^1]: So far as I know, property-based testing originated with Haskell's [Quickcheck](https://www.schoolofhaskell.com/user/pbv/an-introduction-to-quickcheck-testing) library (although it's also a special case of [“model-based testing”](https://en.wikipedia.org/wiki/Model-based_testing)), and was further popularized by [Scala](https://www.scalacheck.org/).
[^2]: Here’s how to tell that the example projects aren't very algorithm-y: There aren’t many loops or conditionals in the code. They're mainly “plumbing”.

## Yet Another Overview

Read the [Hypothesis overview](https://hypothesis.readthedocs.io/en/latest/index.html) first. If you'd like another take, read on…

In conventional testing, your test specifies the *input* and the *expected output*, and the test framework compares these. (In PyTest, it does this by calling your functions, that call `assert` of one of its friends.)

This approach works well when you can think of all the inputs that might cause a problem. [Path coverage](https://en.wikipedia.org/wiki/Code_coverage#Basic_coverage_criteria), mentioned yesterday, is a good way to think of this.

Property testing is an alternative to explicit enumeration of the inputs. A property tester passes random inputs to a function, to see if it breaks.

What does “break” mean? At its simplest, it means crash or raise a exception. If a function is *defined* to return a value for any input in a certain range, we can simply throw lots of values at it from that range, and verify that it always *does* return.

You may know more about the relationship between the input and the output than just that there *is* an output — you may know some *property* that holds true of the $(\textit{input}, \textit{output})$ pair. For example, if you're testing a function that reverses a string, the input and output should have the same length. In this case you can make use of that property in an `assert` statement — and now your test can apply to *any* input, instead of just a few that you've hand-selected so that you could compute the output for each named input.

Here are some properties that relate the `string_reverse`'s output to its input.

1. `string_reverse` of a one-letter string is itself.
2. The input and output have the same length.
3. The set of characters in the input is the same as the set of characters in the output.
4. Moreover, each character occurs the same number of times in the input as in the output.
5. `string_reverse` applied twice produces the original input.
6. For a non-empty string, the *first* letter of the input is the *last* character of the output.
7. And vice versa.

With Pytest, we can spot-check some of these properties against individual strings:

```python
assert string_reverse('a') == 'a'
assert set(string_reverse('cat')) == set('cat')
assert Count(string_reverse('banana')) == Count('banana')
assert len(string_reverse('anadrome')) == len('anadrome')
assert string_reverse(string_reverse('hypothesis')) == 'hypothesis'
assert string_reverse('initial')[0] == 'initial'[-1]
assert string_reverse('ultimate')[-1] == 'ultimate'[0]
```

With property-based testing, we can write code that tests whether the property is true of an $(\textrm{input}, \textrm{output})$ pair, and use Hypothesis to generate a wide range of inputs.

```python
from hypothesis import given
from hypothesis.strategies import text

@given(text(max_size=1))
def test_string_reverse_singleton(s):
    assert string_reverse(s) == s    # (1)

@given(text())
def test_string_reverse(s):
    assert len(string_reverse(s)) == len(s) # (2)
    assert set(string_reverse(s)) == set(s) # (3)
    assert Counter(string_reverse(s)) == Counter(s) # (4)
    assert string_reverse(string_reverse(s)) == s # (5)

@given(text(min_size=1))
def test_string_reverse_ends(s):
    assert string_reverse(s)[0] == s[-1] # (6)
    assert string_reverse(s)[-1] == s[0] # (7)
```

## Fuzz Testing

Closely related to property testing is *fuzzing*, or [*fuzz testing*](https://en.wikipedia.org/wiki/Fuzzing). Here's a couple of good readings about the difference between property testing and fuzz testing:

* [What is Property Based Testing?](http://hypothesis.works/articles/what-is-property-based-testing/), David R. MacIver (the author of the Hypothesis library).
* [Property-Based Testing Is Fuzzing](https://blog.nelhage.com/post/property-testing-is-fuzzing/), Nelson Elhage

