---
title: 'Workshop 1: Documentation'
date: 2017-04-12 20:10:00 -04:00
description: In which we create documentation sets for our projects.
due_date: 2017-03-27 12:30:00 -04:00
---

{% include toc %}

## Introduction

Today we are going to create a scaffold for project documentation.
You will add to this over the course of your project.

The motivation is to make project documentation a first-class element of your deliverables, so that (1) you deliver a project that can be not just executed but maintained, and so that (2) thought that goes into the documentation can inform the organization of your code.

For Python projects, we will use the [Sphinx](http://www.sphinx-doc.org/en/stable/) documentaton framework, which enables for themes, indexed hierarchical documentation, API documentation, and a variety of output formats.

Sphinx integrates with the (free) [Read the Docs](https://readthedocs.org) service, that provides free hosting for your documentation, and makes it discoverable.

Sphinx can also produce PDF and EPUB documentation, for use on a Kindle or in killing trees.

At the end of this workshop your project should have the following properties:

* The project README describes how to build the documentation.
* The documentation contains at least one \*.md or \*.rst page that you wrote. (For example: the project vision, architecture, use cases, road map, or a stub for one of these. See the examples for ideas.)
* The documentation contains at least one documentation string that has been automatically extracted from your code.

Stretch goals:

* Your project documentation is published on <https://readthedocs.org>. (See below.)
* The GitHub project page contains a link to an online version of the documentation. (See below.)
* You may prefer a different theme. The setup instructions below install the Read the Docs theme. Read more online to see how to configure your project documentationt to use it; or, select a different theme.
* Figure out if any [Sphinx extensions](http://www.sphinx-doc.org/en/stable/extensions.html) would improve the quality of your code, or your productivity in writing it. (I tend towards the [Napoleon](http://www.sphinx-doc.org/en/stable/ext/napoleon.html) extension, for more legible docstrings. *flask-autodoc* has a [bad rep](https://github.com/acoomans/flask-autodoc).)

## Examples

Review some examples of project documentation.

The following projects use Sphinx.

* [Flask](http://flask.pocoo.org)
* [Jupyter Notebook](http://jupyter-notebook.readthedocs.io/en/latest/)
* [Jupyter Kernel Gateway](http://jupyter-kernel-gateway.readthedocs.io/en/latest/)
* [NumPy](https://docs.scipy.org/doc/numpy/reference/)
* [OpenCV](http://docs.opencv.org/2.4.13.2/)
* [Pip](https://pip.pypa.io/en/latest/)
* [PyGame](http://www.pygame.org/docs/) (!)
* [Python Warehouse](https://warehouse.readthedocs.io)
* [Sphinx](http://www.sphinx-doc.org/en/stable/) (one should hope!)

These JavaScript projects use Sphinx:

* [bootstrap-datepicker](http://bootstrap-datepicker.readthedocs.io/en/latest/)
* [esprima](http://esprima.readthedocs.io/en/latest/)
* [CasperJS](http://docs.casperjs.org/en/latest/)
* [Hoodie](http://docs.hood.ie/en/latest/)
* [MathJax](http://docs.mathjax.org/en/latest/)
* [qooxdoox](http://qooxdoo.readthedocs.io/en/latest/)
* [Sprite.js](http://spritejs.readthedocs.io/en/latest/introduction.html)

## Install Sphinx and extensions

1. Create a file `requirements-dev.txt` with the following contents:

        sphinx
        sphinx-autobuild
        sphinx_rtd_theme
        recommonmark

2. Execute the following. (Omit the `sudo` if you are using Python with **conda** or **virtualenv**.)

  ``` bash
  $ sudo pip3 install -r requirements-dev.txt
  ```

3. Follow the "Write Your Docs" instructions in [Read the Docs: Getting Started](https://docs.readthedocs.io/en/latest/getting_started.html). Follow the "In reStructuredText" portion of the instructions. We'll get to the "In Markdown" section later; it won't work if you skip to it first.

  Notes:

  * `sphinx-quickstart` asks a *lot* of questions. You can just press <kbd>Return</kbd> repeatedly. Anything that `sphinx-quickstart` actually requires, it will ask you again, in red.
  * You will already have `sphinx` and `sphinx-autobuild` installed. Skip the `pip install` step from the "Write Your Docs" instructions.

## Markdown versus reStructuredText

The Python ecosystem uses **reStructuredText** ([home page](http://docutils.sourceforge.net/rst.html); [primer](https://docs.python.org/devguide/documenting.html#restructuredtext-primer); [Wikipedia](https://en.wikipedia.org/wiki/ReStructuredText); [online editor](http://rst.ninjs.org)) for technical documentation.

The rest of the programming world is trending towards **Markdown** ([Wikipedia](https://en.wikipedia.org/wiki/Markdown); [cheat sheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet); [shorter cheat sheet](http://matplotlib.org/sampledoc/cheatsheet.html); [online editors](http://lmgtfy.com/?q=online+markdown+editor)).

You can use both reStructuredText files (that end in `.rst`), or Markdown files (that end in `.md`) with Sphinx:

To use Markdown, follow [these instructions](https://docs.readthedocs.io/en/latest/getting_started.html#in-markdown) from "Read the Docs: Getting Started". Skip the `pip install recommonmark` step.
          This tries to step tries to install the `recommonmark` package into the Python 2 site directory; `pip3 install -r requirements-dev.txt`, above, already it into the Python 3 site directory.

## Add a file

1. Create a new file in the `docs` directory: for example, `docs/overview.md` or `docs/overview.rst`.

2. Add the filename *without the file extension*, and *with indentation*, to `index.rst`, beneath the `.. toctree::` section.

  For example, my `overview.rst` includes:

    ```
    .. toctree::
       :maxdepth: 2
       :caption: Contents:

       overview
    ```

## View your documentation

1. In a terminal in the `docs` directory, run `make html`.

2. Your documentation is in `docs/_build`. To view your documentation home page, open `docs/_build/index.html`.

  (Depending on your operating system, you may be able to do this by executing `open _build/index.html` from a terminal within the `docs` directory.)

## Document your API

One advantage of a program documentation system such as Sphinx, over a generic site generator such as Jekyll (used by GitHub Pages), is that it is aware of the structure of your code, and can pull documentation from the structure of your code and from its documentation strings.

To take advantage of this, you will use the [Sphinx autodoc](http://www.sphinx-doc.org/en/stable/ext/autodoc.html#module-sphinx.ext.autodoc) extension.

1. Uncomment the following lines in `docs/conf.py`. This will allow Sphinx to find your program sources.

    ``` python
    import os
    import sys
    sys.path.insert(0, os.path.abspath('..'))
    ```

2. Follow the instructions in the [Sphinx autodoc tutorial]( http://www.sphinx-doc.org/en/stable/tutorial.html#autodoc).

## Optional tip: Live rebuild

You can set the documentation up to build whenever a doc file changes:

1. Install [`entr`](http://entrproject.org).

  Ubuntu: `sudo apt-get install entr`

  MacOS with Homebrew; `brew install entr`

2. Instead of `make html`, use the following command:

    ``` bash
    $ find . -type f ! -path './_build/*' | entr make html
    ```

    While you leave this command running, it will rebuild the documentation whenever a file in the `docs` directory changes.

3. In order to pick up changes to your source files (outside the `docs` directory), use this instead:

    ```bash
    $ find .. -type f ! -path '../docs/_build/*' ! -path '../.git' | entr make html
    ```

## Document JavaScript Code

Hey Project Projects – I'm looking at you!

There are a variety of tools for documenting JavaScript projects, including Sphinx (as illustrated in the JavaScript example projects above).

There isn't (to my knowledge) anything in the JavaScript community as well-adopted as Sphinx.

For this assignment, pick one of:

* [Use Sphinx to generate your JS library docs](https://sphinx-js-howto.readthedocs.io/en/latest/)
* Consider [JSDoc](http://usejsdoc.org), [Docco](http://jashkenas.github.io/docco/), and [YUIDoc](http://yui.github.io/yuidoc/). (There is a comparison [here](http://www.fusioncharts.com/blog/2013/12/jsdoc-vs-yuidoc-vs-doxx-vs-docco-choosing-a-javascript-documentation-generator/). Doxx has been renamed mr-doc, and appears to be neither widely-adopted nor active. [Rumors of JSDoc's death](http://stackoverflow.com/questions/2351881/documenting-javascript-code), however, are [greatly exaggerated](http://www.thisdayinquotes.com/2010/06/reports-of-my-death-are-greatly.html).)

and see how far you get today.

The final project should include both architectural and API documentation, but coming to completion on this may be out of scope for today. In that case I recommend a modified form of ["timeboxing"](https://en.wikipedia.org/wiki/Timeboxing): allocate a fixed amount of time – e.g. ten minutes a day (or an hour a week) – towards setting up a framework, so that you continue to make progress without letting it hold up feature development.

## Document a REST API

Hey Olin API – I'm looking at you!

For a Flask application, [autohttp.flask](http://pythonhosted.org/sphinxcontrib-httpdomain/#module-sphinxcontrib.autohttp.flask) is worth a looksie.

## Publish your documentation

To publish your documentation to <https://readthedocs.org>:

* Push your changes to GitHub.

* Follow the instructions in the [Import Your Docs](https://docs.readthedocs.io/en/latest/getting_started.html#import-your-docs) section of "Read the Docs: Getting Started".

* [Optional] Add a link from your README to your docs. [Follow these instructions](http://docs.readthedocs.io/en/latest/badges.html) to use a *README badge* ![](https://img.shields.io/badge/docs-latest-brightgreen.svg?style=flat) for this.
