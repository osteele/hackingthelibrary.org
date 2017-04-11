# Hacking the Library web site

The source to <http://hackingthelibrary.org>.


## Setup

1. [Install Jekyll](https://jekyllrb.com/docs/installation/)
2. `gem install bundler`
3. `bundle install`

Alternate: Install [Docker Compose](https://docs.docker.com/compose/install/)


## Develop

1. `bundle exec jekyll serve`
2. Browse to <http://localhost:4000>

Alternate:

1. `docker-compose up`
2. Browse to <http://localhost:4000>


## Check HTML

`./scripts/check-html`


## Publish

1. `git push` to GitHub
2. Browse to <http://hackingthelibrary.org>


## Copyright and Credits

The course material is Copyright (c) 2017 by the Franklin W. Olin College of Engineering.

The web site uses:

* A modified copy of the [Hyde Theme](http://hyde.getpoole.com)
* [Font Awesome](http://fontawesome.io) icons
