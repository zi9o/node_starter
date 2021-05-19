FROM nginx

COPY ./nginx/conf.d /etc/nginx/conf.d
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

RUN rm /etc/localtime
RUN ln -s /usr/share/zoneinfo/Europe/Paris /etc/localtime
RUN echo Europe/Paris > /etc/timezone
