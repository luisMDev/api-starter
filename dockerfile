FROM node:20.12.2 as builder

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 2000