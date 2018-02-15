---
title: "Hide Files From Git With `.gitignore`"
description: >
    Don't ignore the `.gitignore`! Punishment: death by git merge conflict (and a messy repo).
topics: ['git', 'gitignore']
thumbnail: ./img/alternative_facts.jpg
thumbnail_source: Richard Ricciardi
thumbnail_source_url: https://www.flickr.com/photos/ricricciardi/33093276772
---

Tldr:

* A code repo should generally include a `.gitignore` file.
* For a Python project, this should contain at least the line `*.pyc`.
* Or, use [gitignore.io](https://www.gitignore.io/) to generate a `.gitignore` file.
* The cost of ignoring this advice is (1) an unprofessional-looking repo littered with `*.pyc` files; and (2) merge conflicts that didn't have to be.

## Keeping a clean `git status`

Here's a couple of useful invariants of your workflow:

1. `git status` reports only files that should be committed.

2. When you have no pending changes in your working directory, `git status`  is "clean":

   ```bash
   $ git status
   On branch master
   Your branch is up to date with 'origin/master'.

   nothing to commit, working tree clean
   ```

With these invariants, you can use commands such as `git commit --all`,  `git commit -a`, or their GUI equivalents, without adding a file to the repo that isn't supposed to be there. Also, this plays well with tooling, that tells you whether you've got pending changes. Finally, any time I've got files that shouldn't go in the repo but show up in `git status`, at some point I've accidentally committed them anyway.

In order to maintain this invariant, you need to either: (1) never put a file in your working directory that shouldn't go in the repo (but sometimes this isn't practical); or, (2) tell git that some files in your directory should be ignored. The latter is configured via `.gitignore`. 

## `.gitignore`

`.gitignore` is just a text file, with a special meaning to git. It's a list of blank lines and comments (lines starting with `#`), that git, um, ignores; and file globs like `TODO`, that matches the single file `TODO`; `build/`, that matches the *directory* named `build`; and `*.pyc`, that matches any file whose name ends in `.pyc`.

(The patterns in `.gitignore` are [file globs](https://en.wikipedia.org/wiki/Glob_(programming)), not [regular expressions](https://en.wikipedia.org/wiki/Regular_expression). Therefore, the pattern is `*.pyc`, not `.*\.pyc`.)

`.gitignore` itself is just a text file, that can be added to the repo. You *should* add it to the repo, so that you and your collaborators have git configured to ignore the same files.

## Things that don't belong in a repo

Some files that end up in your *working directory*, should never go in your *repo*.

**Secrets** shouldn't go in the repo. These are discussed in [Keeping secrets](./2018-02-07-keeping-secrets).

Secrets shouldn't go in the repo because once you push to Github, those secrets accessible to the whole world. Even if your project sources aren't published to a public repo, they're better protected by [defense in depth](https://en.wikipedia.org/wiki/Defense_in_depth_(computing)).[^1] Also, you eventually want different secrets in your development environment from your staging, production, and possibly other environments, which makes this a special case of:

**Environment-specific configuration values** shouldn't go in the repo. Aside from secrets, some configuration variables in our example projects hold the paths to components such as the database (the value of `DATABASE_URL`) and the message broker (the value of `MQTT_URL`). These values don't go in the repo, because everything in the repo is deployed to multiple environments.[^2]

An exception is that it's common to wire in a default value that works for the development environment, and override this in other environments. For example, you might use on a local database for development. In that case, default the database configuration to a datase running on localhost.

**Absolute paths** don't go in the repo. Your source shouldn't contain any strings such as `/Users/osteele/src/my-project` (macOS), `C:\users\osteele\src\my-project` (Windows), or `/usr/osteele/src/my-project` (one of several possibilities for Unix), or even `~/src/my-project`. The first three of these won't work for any user who doesn't share your login name. The last won't work for users who arrange their projects differently, which probably include CI servers and deployment environmens.

**Object files** *generally* don't go in the repo. An *object* file, for our purpose, is a (generally not editable) file that's programmatically created from some other file (a *source* file — although not necessarily a *program* source file). Note that, by this definition, a bitmap image file whose source (say, a Photoshop, Inkscape, or PlantUML file) is in the repo is an object file, while the same image file, if its source is not in the repo, is not.

**Compiler artifacts** are a special case of an object file (and indeed, in many contexts are what is meant by "object file"). In Python, these files end in `.pyc`, `.pyo`, or `.pyz`. (In C, they include `*.o` files. In Java, they include `*.class`. Some other languages — especially dynamic languages — don't  create them.)

The reason to keep object files out of the repo is that they introduce unnecessary merge conflicts. If two authors edit different sections of `example.py`, `git pull` can resolve this. [^At least the syntactic aspects. Usually the semantics works out too.] If two authors edit different sections of `example.py`, each generate their own `example.pyo`, and commit that, then one of them is going to see a merge conflict that they need to manually resolve.

**Log files** don't go in the repo. These are another special case of object files. I'm calling them out because they're the other kind of file (aside from compilation artifacts) that often sneaks in. Just add `*.log` to your `.gitignore`, or use oe of the `.gitignore` templates below.

**Editor backup files** don't go in the repo. These typically have names like `file~` or `.#file`. 

**Operating system metadata files** don't go in the repo. On macOS, this includes `.DS_Store` and `Icon\r\r`. On Windows, this includes `Desktop.ini` and  `Thumbs.db`. 

The patterns of editor backup files and operating system metadata is a ridiculous amount to know. Just start from a template, or grow your `.gitignore` file as you see `git status` listing files that you didn't write.

## References

* [gitignore.io](https://www.gitignore.io) generates a `.gitignore`, based on your technology stack and operating system.
* [GitHub documentation](https://help.github.com/articles/ignoring-files/)

* [Tutorial from Atlassian](https://www.atlassian.com/git/tutorials/gitignore)

* [`gitignore` templates](https://github.com/dvcs/gitignore/) is the community repository of templates behind [gitignore.io](https://www.gitignore.io).



[^1]: [Last week's iPhone source code leak](https://motherboard.vice.com/en_us/article/a34g9j/iphone-source-code-iboot-ios-leak) gave both black hats and security researchers a lot to work with. It would have been a lot worse if it had included hardware keys.
[^2]: There's a different approach, pioneered(?) in Rails and used frameworks that copy it, which is that the source repo includes a configuration file with a different section for each environment. This makes it easier to audit the configurations, and update all the configurations at once, say when a new resource comes in.