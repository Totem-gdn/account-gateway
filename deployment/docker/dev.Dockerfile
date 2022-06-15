# builder
FROM node:lts-alpine AS builder

EXPOSE 3000 9229

WORKDIR /usr/src/account-gateway

RUN npm i glob rimraf

RUN npm i -g @nestjs/cli

COPY package.json package-lock.json ./

RUN npm i

COPY . .
