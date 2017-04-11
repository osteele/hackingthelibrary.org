FROM ruby:2.4

MAINTAINER Oliver Steele <steele@osteele.com>

WORKDIR /app
COPY Gemfile Gemfile.lock /app/
RUN bundle install

COPY . /app/

EXPOSE 4000

ENTRYPOINT ["bundle", "exec", "jekyll"]
CMD ["serve", "--host 0.0.0.0"]
