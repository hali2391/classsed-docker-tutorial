FROM node:15

WORKDIR /app

RUN rm -rf node_modules

COPY . /

RUN npm install

CMD ["node", "scripts/migrate.js"]

ENTRYPOINT [ "npm", "start" ]


