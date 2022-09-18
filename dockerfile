FROM node:16.17.0

WORKDIR /app

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ADD . .

RUN npm install

RUN npm test

RUN npm run build

RUN npm install -g serve

ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 3000

CMD ["serve", "-s", "dist"]
