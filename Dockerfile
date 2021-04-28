FROM node:15

WORKDIR /app

RUN rm -rf node_modules

COPY . /

RUN npm install

RUN node ./scripts/migrate.js

ENTRYPOINT [ "npm", "start" ]


