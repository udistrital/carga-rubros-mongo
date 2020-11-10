FROM node:14

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

ARG ESQUEMA_MONGO

ARG CONECCION_MONGO

# RUN npm i -g @nestjs/cli
RUN npm install

CMD [ "npm", "run", "start:dev" ]

EXPOSE 3000