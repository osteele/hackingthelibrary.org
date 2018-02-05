---
title: Owning your repo
date: 2018-02-05
description: Rename your repo and add your teammates as collaborators.
---

If you cloned `olinlibrary/bear-as-a-service`, your repo looks like this:

![](./img/forked-repo.jpg)

You don't want this! It doesn't reflect your project name. The description is
wrong. Also, if you haven't modified the repo settings or boilerplate files
since, there's probably other information that's out of date too.

Here's what to do:

## 1. Rename the repo

On the Github repo home page, click the "Settings" tab.

![](./img/repo-settings-tab.jpg)

The top Setting is "Repository name". Rename your to something that reflects
your project name.

![](./img/repo-name.jpg)

## 2. Add your collaborators

Click "Collaborators & Teams", in the left hand nav. Add your team members.

![](./img/repo-collaborators.jpg)

This prevents some issues that we've seen more than once in SoftDes, involving
late nights, last minute changes, and the flu. You're unlikely to run into this
on this *particular* project, but it's a good habit to get into.

## 3. Remove unused files

\[It may take you longer than today to figure out which forked files you're
keeping. Do it before code complete.\]

If there's files you aren't using in your project, remove them. (`git rm`, or
just delete them however you'd delete any other file and then commit the
removal). As a matter of hygiene, your repo shouldn't generally contain code
that isn't used, or doesn't relate to your project's features. This invariant
makes it easier to debug, maintain, and extend code in the future — there's less
total code, and less guessing game about what *code* matches what *functionality
and behavior*.

## 4. Update the README and LICENSE

Remove everything from the README that is not true of *your* project.

## Final Notes

These steps aren't necessary when you're forking a repo in order to apply your
own fixes or minor extensions to what is basically the same project, and/or to
prepare a pull request. They're necessary here because you're using creating a
*different project*, with a different purpose and goals. In this case, you're
using the repo as a *starter kit*. This is one common use of a repo, although
often in this case you'll clone the repo instead of forking it.
