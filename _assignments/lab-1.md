---
title: Lab 1
date: 2017-01-18
due: 2017-01-26
---


## Overview

In this assignment, you will start with a GitHub repository containing web application that lets the user browse the Olin course catalog.

You will get this code running on your laptop. Then you will extend it.

Future labs will build on this code to help you develop skills that will be useful in the main project.


## Set up your environemnt

For this assignment, you will need a laptop with Python 3 installed.

Verify that Python 3 is installed by running `python3` from your command line.

If Python 3 is not installed, you have several alternatives:

* Install [Anaconda](https://www.continuum.io/downloads).
This is a one-click installer, available for Linux, macOS, and Windows.
* If you have a Ubuntu from SoftDes: Run `sudo apt-get install -y python3 python3-pip python3-tk python3-dev`.
This installs Python 3 (accessible via python3) alongside with the existing Python 2.6 (accessible via python [without a number]).
* If you’ve lost your Ubuntu and would like it back: Follow the [Get Set](http://softdes.website/assignments/setup-your-environment/) instructions from this year’s SoftDes class.
This installs both Python 3 (which this year’s SoftDes students are using), and Python 2.


## Clone the repository

Clone <https://github.com/olinlibrary/htl-lab1> to your own account.


## Make it pretty

Improve the visual appearance of the application.

If you know CSS, this is a good time to get out your CSS skills.
If you don't, anything you pick up is likely to be of use in the future.

Consider adding a link to the [Bootstrap](http://getbootstrap.com) style sheet.
You can download Bootstrap and add the files to your repository, or add a link to a Bootstrap CSS file
on a Content Delivery Network (CDN) – there's links [here](https://www.bootstrapcdn.com).

Advanced: make the pages look like (somewhat like) <http://www.olin.edu/course-listing/>.


## Add functionality

Do at least two of:

* Add a Back link from the Course Area page back to the home page.
* Add a page for each course. Clicking on a page
* Allow the user to view all the courses by an instructor.
* The instructor names are formatted "Last, First". Display them as "First, Last".
(Do this by adding code to `server.py`, not by modifying the CSV file.) Note that some courses list more than one instructor.
* Make the instructor names in course area view clickable.
* Add area descriptions to the Course Area pages. Bring these in from a CSV or other data file, and get the values to the template file.
* Something else – if you aren't sure whether your idea has enough to it, ask.


## Deliverables

These deliverables are due by the start of class on Thursday 26 January.

1. GitHub repository. Your fork of the lab repository should contain a executable application that includes at least one “make it pretty” extension, and at least one functional extension.

2. Documentation. Your repository's README should now incude your name as a contributor, and should describe the estensions that you made.

3. Reflection. By the start of class on Thursday, submit the form that will be provided on this page. The form will have three questions:

    1. Plus: Consider the repository as it was originally delivered to you. What aspects of the repository helped you run and contribute to it?
    2. Delta. What aspects could have been improved?
    3. How long did it take you? This is not assessed; it helps us calibrate future assignments.
    3. Honor code. Verify that any help you received and code you did not write that you incorporated is credited in the README and/or the source files.

4. (Optional) Show off your work. Email me a screenshot of your application by 10am. We'll have a slide show at the start of class.
