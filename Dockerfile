FROM node:14-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

ARG DB_MONGO

ARG COLLECTION_MONGO

ARG USER_MONGO

ARG PASS_MONGO

ARG HOST_MONGO

ARG PORT_MONGO

RUN npm run build

CMD [ "npm", "run", "start:dev" ]

EXPOSE 3000
