# builder
FROM node:lts-alpine AS builder

WORKDIR /usr/src/account-gateway

COPY package.json ./

RUN npm i glob rimraf

RUN npm i --only=development

COPY . .

RUN npm run build

# production
FROM node:lts-alpine

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/account-gateway

COPY package.json .

RUN npm i --only=production

COPY --from=builder /usr/src/account-gateway/dist ./dist

CMD ["node", "dist/main"]
