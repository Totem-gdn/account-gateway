# builder
FROM node:lts-alpine AS builder

WORKDIR /usr/src/account-gateway

RUN npm i glob rimraf

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

# production
FROM node:lts-alpine

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/account-gateway

COPY package.json package-lock.json ./

RUN npm ci --omit=dev

COPY --from=builder /usr/src/account-gateway/views ./views

COPY --from=builder /usr/src/account-gateway/dist ./dist

CMD ["node", "dist/main"]
