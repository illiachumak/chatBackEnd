FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

RUN npm install -g nodemon

COPY . .

EXPOSE 3001
CMD [ "npm", "start" ]