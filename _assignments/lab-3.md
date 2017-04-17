---
title: 'Lab 3: Deployment Environments'
date: 2017-02-03 00:00:00 -05:00
description: In which we use environment variables to configure deployment environments
due_date: 2017-02-12 19:00:00 -05:00
lab: 3
---

## Overview

*Spend no more than 40 minutes on this lab without checking in with your NINJA. Spend no more than 90 minutes total. If your work is incomplete because you ran out of time, please make this known to me.*

In this assignment, you will configure the server application from [Lab 2]( {% link _assignments/lab-2.md %})
to run in different [deployment environments](https://en.wikipedia.org/wiki/Deployment_environment).

As with previous labs, track your time.

## Framing the Problem

In Lab 2, you [modified your application]({% link _assignments/lab-2.md%}#why-doesnt-it-work-2-configuring-your-server-to-accept-remote-connections) to run on port `0.0.0.0`, so that it would accept connections from remote clients such as a web browser running on a different machine.

This is the correct configuration for a server running in the cloud. It is not necessarily correct for a development server running on your laptop.

[Question: why not?]

## An Introduction to Environment Variables

An [environment variable](https://en.wikipedia.org/wiki/Environment_variable) is a named value that is available to a computer process.

Unlike a [global variable](https://en.wikipedia.org/wiki/Global_variable) that is defined within a particular programming language, environment variables are accessible to programs written in any language. You can *set* an environment variable from the terminal, and then *read* it within a program that is launched from the terminal.

### Part 1: Reading Environment Variables

The operating system has already set some environment variables.
We'll use one of these for practice.

`USER` is the name of the current user.
Other interesting environment variables are `SHELL`, `HOME`, and `PATH`.
`SHELL` is the path to whichever shell (probably *bash* or *zsh*) runs inside your terminal windows. This is the program that prints the prompt `$` , lets you enter a command such as `ls` or `python3`; and locates
and launches the program that implements that command.
`PATH` is the list of directories (separated by `:`) in which the shell looks for programs.

1\. In a UNIX / Linux / macOS terminal window, execute:

    ```bash
    $ printenv USER
    osteele
    ```

2\. Launch a Python REPL:

    ```bash
    $ python3
    >>> import os
    >>> os.environ['USER'] # this would error if USER weren't set
    osteele
    >>> os.environ.get('USER', None) # this would return None if USER isn't set
    osteele
    >>> quit()
    ```

This Python code can be smushed into a single line, so that we can run it non-interactively:

The following line has the same effect as `printenv USER`, but verifies that the environment variable is available to programs launched from the terminal, not just to the terminal itself.

```bash
$ python3 -c 'import os; print(os.environ.get("USER", ""))'
osteele
```

You can also print all the environment variables:

```bash
$ printenv
```

or:

```bash
$ python3
>>> import os
>>> os.environ
[…stuff…]
>>> quit()
```

Now let's look at how to *set* environment variables:

### Part 2: Setting an environment variable within a terminal session

In a terminal window:

```bash
$ setenv LAB_NO=3
```

The variable is now set *in this terminal session*, and *in any programs launched from this terminal session*.

You can test that the environment variable is set:

```bash
$ printenv LAB_NO
3
$ python3 -c 'import os; print(os.environ.get("LAB_NO", ""))'
3
```

### Part 3: Setting an environment variable for a single command

To set an environment variable for a single command, use the syntax:

```bash
$ HELLO=world python3 -c 'import os; print(os.environ.get("HELLO", ""))'
world
$ python3 -c 'import os; print(os.environ.get("HELLO", ""))'

$ printenv HELLO
```

[crickets]

Only the first command prints `world`. The `HELLO` environment variable is set within an environment that is only used for programs executed in that line.

### [Optional] Part 3: Setting an environment variable for all future terminal sessions

Print the value of your `SHELL` environment variable. If it ends in `bash`, your shell (that runs in your terminal) is **bash**. If it ends in `zsh`, your shell is **zsh**. It's probably one of those two.

When you create a terminal window or tab, your shell executes the commands in a set of *startup files*, just as though you'd typed them. If your shell is **bash**, your startup files are `.bash_profile` and `.bashrc` . If your shell is **zsh**, your startup files are `.zshenv`, `.zprofile`, `.zshrc`, and `.zlogin`.

Add the following to one of your shell startup files*:

```bash
setenv LAB_NO=1
```

Now any new terminal will start with `LAB_NO` already set. Test this by creating a new terminal window, and using one of the techniques above to verify the value of `LAB_NO`.

\* The bash and zsh documentation recommends that you define environment variables in the *first* file in their respective lists of startup files: `.bash_profile` for bash, `.zshenv` for zsh. I more commonly see  them added to `.bashrc` and `.zshrc`, and the installation instructions for many utilties instruct you to plac definitions there.

### Part 4: Getting and setting environment variables on Heroku

The above syntax lets you set or get environment variables on your laptop (or another machine that you have logged into). They are useful for testing that your program reads environment variables; we'll get to that below.

You will need a different set of commands for manipulating environment variables on Heroku. In your project directory (so that Heroku knows which application to operate on):

```bash
$ heroku config:set HELLO=world
$ heroku config:get HELLO
world
$ heroku config # prints all the environment variables
=== htl-lab-osteele Config Vars
ENVIRONMENT: production
```

### [Optional] Part 5: Gotchas

* Setting an environment variable in one terminal doesn't set it in another.
* Environment values are strings, not integers or Boolean values (even when they look otherwise). `LAB_NO=3 python3 -c 'import os; print(2 * os.environ["LAB_NO"])'` may surprise you. (Try it!)
* Shells let you say `export VARNAME=value` if `value` doesn't contain any spaces, `$`, or other special characters. Otherwise you need to quote the value `export VARNAME='value'`. Quoting the value is *always* safe; but is not *idiomatic* when the value is a simple number or one-word string.
* Adding `setenv VARNAME=1` to your shell startup file doesn't give it a value in any terminal windows that are already open. You need to *also* execute  `setenv VARNAME=1` in each of those terminal windows;  or, close them and open new ones.
* Shells let you set variables without using `export`: `c=yes`. This sets a *shell variable*, but it does not create an *environment variable*: a program that the shell launches will not have see `SHELL_VAR` in its environment. (However, if you previously executed `export SHELL_VAR` or `export SHELL_VAR=previous-value`, then `SHELL_VAR` *is* an environment variable, and setting it again within the same terminal session changes the environment variable, even if you leave off the `export` this time.)
* Shells also let you retrieve an environment variable by prefixing it with `$`: `echo $LAB_NO` has the same effect as `printenv $LAB_NO`.  This syntax retrieves the values of both environment variables *and shell variables*, so it isn't diagnostic as to whether there's an environment variable with that name.

## Assignment: Modify Your Application to Use an Environment Variable

Take your code from Lab 2, and modify it to use host 127.0.0.1 on your local host, and 0.0.0.0 on Heroku.

Your output should look something like this:

```bash
$ heroku local
[WARN] No ENV file found
12:18:59 PM web.1 |   * Running on http://0.0.0.0:5000/ (Press CTRL+C to quit)
12:18:59 PM web.1 |   * Restarting with stat
12:19:01 PM web.1 |   * Debugger is active!
12:19:01 PM web.1 |   * Debugger pin code: 491-101-196
```

[You are looking for the `127.0.0.1` in the `Running on` line.]

And:

```bash
$ git push heroku master
[…]
$ heroku logs -n 10
2017-02-03T17:17:57.002336+00:00 heroku[web.1]: Restarting
2017-02-03T17:17:57.003847+00:00 heroku[web.1]: State changed from up to starting
2017-02-03T17:17:57.938117+00:00 heroku[web.1]: Stopping all processes with SIGTERM
2017-02-03T17:17:58.875769+00:00 heroku[web.1]: Process exited with status 0
2017-02-03T17:18:02.726976+00:00 heroku[web.1]: Starting process with command `python3 server.py`
2017-02-03T17:18:05.222874+00:00 app[web.1]:  * Running on http://0.0.0.0:45762/ (Press CTRL+C to quit)
2017-02-03T17:18:05.223596+00:00 app[web.1]:  * Restarting with stat
2017-02-03T17:18:05.990813+00:00 app[web.1]:  * Debugger is active!
2017-02-03T17:18:05.992283+00:00 app[web.1]:  * Debugger pin code: 670-329-886
2017-02-03T17:18:06.356910+00:00 heroku[web.1]: State changed from starting to up
```

[You are looking for the `0.0.0.0` in the `Running on` line.]

Some ingredients you may find useful:

* Look at the use of `PORT` in the Lab 2 code.
* Use `heroku config` to introduce a difference between your laptop environment and the Heroku environment.
* For testing, you can also make your laptop environment temporarily look like the Heroku environment.

## What to Turn In

1. Complete the [survey](https://goo.gl/forms/XfzEzyOp6FYZs9dL2) before class on {{ page.due_date | date: '%A, %-d %b'}}. The survey questions will include:
   1. How long did the assignment take?
   2. All that stuff about environment variables – [] I already knew all that; [] I knew some of that but it was useful to see it; [] this was news to me but now I understand it; [] this was just confusing.
   3. Delta / plus
2. Push your changes to GitHub.

## References

* [The Twelve-Factor App: Config](https://12factor.net/config)
* [Python documentation: `os.environ`](https://docs.python.org/3/library/os.html#os.environ)
* [Beyond Linux From Scratch: Bash Shell Startup Files](http://www.linuxfromscratch.org/blfs/view/7.6/postlfs/profile.html)
* [Zsh Startup Files](http://zsh.sourceforge.net/Intro/intro_3.html)
