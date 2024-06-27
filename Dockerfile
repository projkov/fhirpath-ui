FROM node:lts as builder

RUN mkdir -p /app/src

WORKDIR /app

ADD package.json package.json
ADD yarn.lock yarn.lock

RUN yarn install

ADD . /app

RUN yarn build

RUN yarn start
