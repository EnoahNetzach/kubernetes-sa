FROM node:12-alpine AS builder

WORKDIR /home/sa-frontend

COPY public /home/sa-frontend/public
COPY src /home/sa-frontend/src
COPY package.json /home/sa-frontend/package.json
COPY yarn.lock /home/sa-frontend/yarn.lock

RUN apk update && apk add yarn

RUN yarn install --production --pure-lockfile --prefer-offline

ARG REACT_APP_SA_API_URL=http://localhost:8080

RUN yarn build

FROM nginx:1.17-alpine

COPY --from=builder /home/sa-frontend/build /usr/share/nginx/html

EXPOSE 80
