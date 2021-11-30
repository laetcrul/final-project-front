FROM node:current-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY src ./

RUN ng serve
