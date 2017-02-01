---
title: Lab 2
description: Deploying to the cloud
date: 2017-01-26
due_date: 2017-02-02
---

{% include toc %}

## Overview

In this assignment, you will deploy the web application from [Lab 1]( {% link _assignments/lab-1.md %}) to the cloud, so that users can visit it at a public
URL.

As with Lab 1, track your time.


## Create an account on Heroku

1. Follow the instructions [here](https://signup.heroku.com) to sign up for
a (free) account Heroku cloud platform. Heroku manages servers that will
run your app.

2. Follow the instructions [here](https://devcenter.heroku.com/articles/heroku-cli#download-and-install) to download the Heroku command-line interface.

3. Run `heroku login` with the credentials you created in step 1:

    ```
    Enter your Heroku credentials.
    Email: frankly.olin@olin.edu
    Password (typing will be hidden):
    ```


## Create a Heroku application

Run `heroku apps:create` to create a Heroku **application**:

```
heroku apps:create                                                                              lab2 ◼
Creating app... done, ⬢ boiling-brushlands-71788
https://boiling-brushlands-71788.herokuapp.com/ | https://git.heroku.com/boiling-brushlands-71788.git
```

[`heroku apps:create` constructs a random name (above, "boiling-brushlands-71788")
for your application. You can also specify a name, so long as it is unique
among all Heroku applications (for all users). For example, `heroku app:create htl-lab1-osteele` makes my application available at <https://htl-lab-osteele.herokuapp.com>.]

## Publish Your Application to Heroku

```
$ cd /path/to/htl-lab-1
$ heroku git:remote -a my-heroku-app-name
$ git push heroku master
```

where `my-heroku-app-name` is the name of your Heroku application.

You should see an error message:

```
Total 0 (delta 0), reused 0 (delta 0)
remote: Compressing source files... done.
remote: Building source:
remote:
remote: -----> Failed to detect set buildpack https://codon-buildpacks.s3.amazonaws.com/buildpacks/heroku/python.tgz
remote: More info: https://devcenter.heroku.com/articles/buildpacks#detection-failure
remote:
remote:  !     Push failed
remote: Verifying deploy....
remote:
remote: !	Push rejected to my-heroku-app-name.
remote:
To https://git.heroku.com/my-heroku-app-name.git
 ! [remote rejected] 7039fff -> master (pre-receive hook declined)
error: failed to push some refs to 'https://git.heroku.com/my-heroku-app-name.git'
```


## Why Doesn't it Work? – Setting Your Repo Up for Heroku

If you Google around and spend some time learning what a "buildpack" is
(not required for this course), you will eventually learn that Heroku
doesn't recognize what language your application is written in, and
therefore doesn't know how to run it.

You need to add three files to your repository in order to tell Heroku
how to [provision a server](https://en.wikipedia.org/wiki/Provisioning#Server_provisioning):

* `requirements.txt` is a list of Python packages. (This list is currently in the project README. Heroku can't [yet] read that.) This tells Heroku that your application is a Python
program, and which packages to install.
* `Procfile` lists the command and arguments that starts your program.
(This is also in the README: `python server.py`.)
* `runtime.txt` specifies the Python version. Without this, Heroku assumes Python 2.7.
The starter code for Lab 1 uses features from Python 3, so it is necessary to override this.

Create the following files with these contents:

`Procfile`
: `web: python3 server.py`

`runtime.txt`
: `python-3.5.2`

`requirements.txt`
: I'm going to make you fish for this one. What Python packages does your applicaiton
depend on? Put the list of packages in this file, one per line.
**Note:** Your application does *not* need to run `scripts/scrape_course_catalog.py`.
This was run offline to create the `data/olin-courses-16-17.csv` file; it
doesn't to run online on the web server.

Test your `Procfile` locally. The following line has the same effect as
`python server.py`, but uses the same `Procfile` that Heroku uses to do this.

    $ heroku local web

Now `git push heroku master` again. This time the deploy should succeed:

```
$ git push heroku master
[…]
remote: -----> Launching...
remote:        Released v18
remote:        https://htl-lab-osteele.herokuapp.com/ deployed to Heroku
remote: Verifying deploy.... done.
To https://git.heroku.com/my-heroku-app-name.git
```


## Open Your App in a Browser

Do you do this in one two ways:

1. Find the line `https://htl-lab-osteele.herokuapp.com/ deployed to Heroku`
in the `git push` output above. Open `https://htl-lab-osteele.herokuapp.com/`
in a browser. Or:

2. `heroku apps:open` does this automatically.

You should see an “Application Error” page.


## Why Doesn't it Work (2)? Configuring Your Server to Accept Remote Connections

By default, your application only accepts HTTP requests from the same machine.
This is because it uses `127.0.0.1` as the host.

This is appropriate for local development, but does not make for a web server in the cloud.

Define port then add `host` and `port` arguments to the last line of `server.py` as below, commit the change,
push to Heroku, and test again. You should see your application.

```
    port = int(os.environ.get('PORT', 5000)))
    app.run(host='0.0.0.0', debug=True, port=port)
```


## (Optional) Going Beyond

Some things you can do to learn more and/or have more fun:

* Add more functionality to the application. ([Seaborn](http://seaborn.pydata.org)? [D3](https://d3js.org)?)
* Modify your server so that it binds to `0.0.0.0` on Heroku but `127.0.0.1`
on your laptop (even when you run it on your laptop with `heroku local`). This will be the topic of Lab 3.
* Add an `app.json` file, and a ![](https://www.herokucdn.com/deploy/button.svg) button. [Instructions](https://devcenter.heroku.com/articles/heroku-button).


## What to Turn In

1. Complete the [survey](https://goo.gl/forms/DIXcfapK8cPVtjL93) before class on {{ page.due_date | date: '%A, %-d %b'}}.

2. Add a link from your GitHub repo to your (Heroku) application URL.

Here's how to add the link:
Open your repo page on GitHub. Near the top of the page is an Edit button;
this discloses text entry fields for a project Description and Website.

![]({% link images/repo-description-1.png %})

Paste your application URL into the Website field, and Save.

![]({% link images/repo-description-2.png  %})
