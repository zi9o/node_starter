FROM node:10.24

RUN npm i -g @roarr/cli@3.2.0

WORKDIR /app
COPY . /app/
RUN yarn

# Defines the list of required variables
COPY .env.example /app/.env.example


CMD ["ln", "-snf", "/usr/share/zoneinfo/$TZ", "/etc/localtime"]
CMD ["echo", "$TZ", ">", "/etc/timezone"]

ENTRYPOINT ["bash", "entrypoint.sh"]
