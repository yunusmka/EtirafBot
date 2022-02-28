FROM node:12-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install --save telegraf

COPY . .

CMD ["bash","husnu.sh"]
