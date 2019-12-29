FROM node:13.5.0-alpine3.11

WORKDIR /app

ADD package.json .

RUN npm install

ADD . .

ENTRYPOINT [ "npm", "start" ]