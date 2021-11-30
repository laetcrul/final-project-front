FROM node:current-alpine

RUN mkdir -p /usr/src/app

COPY src /usr/src/app

WORKDIR /usr/src/app

RUN npm install

ENTRYPOINT ["ng serve"]
