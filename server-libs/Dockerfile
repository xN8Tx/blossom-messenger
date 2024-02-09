FROM node:19-alpine

WORKDIR /lib-server

COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .

CMD [ "npm", "run", "build" ]