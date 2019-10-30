FROM alpine

COPY . /app
WORKDIR /app

RUN apk add nodejs-npm
RUN npm install

EXPOSE 4001

CMD [ "node", "app.js" ]
