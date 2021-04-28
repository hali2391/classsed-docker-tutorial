FROM node:15

WORKDIR /app

COPY . /

RUN npm install

CMD ["node", "scripts/migrate.js"]

ENTRYPOINT [ "npm", "start" ]


