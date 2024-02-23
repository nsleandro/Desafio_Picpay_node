FROM node:14

WORKDIR /usr/src/app
RUN npm install -g nodemon

COPY package.json .
RUN npm install

COPY . .
EXPOSE 8081

CMD ["npm", "start"]