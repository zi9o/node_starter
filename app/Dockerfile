FROM node:10.24

WORKDIR /app

COPY ./package.json /app/package.json
RUN npm i @angular/cli@8.2.0 -g

RUN yarn
COPY . /app/

ENTRYPOINT ["sh", "endpoint.sh"]
