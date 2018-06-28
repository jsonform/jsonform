FROM nginx
MAINTAINER Haris Michopoulos <hmichopoulos@gmail.com>

COPY playground/start.html /usr/share/nginx/html/index.html
COPY lib /usr/share/nginx/html/lib
COPY deps /usr/share/nginx/html/deps
COPY playground /usr/share/nginx/html/playground