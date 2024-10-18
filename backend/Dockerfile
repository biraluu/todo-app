#using an official node js  runtime as a parent image
FROM node:18

#setting working directory
WORKDIR /usr/src/app

#copy package* file in the container

COPY package*.json ./
COPY ../frontend ./

#install any needed packages
RUN npm install

#yeta ko file utaa

COPY . .

#commands to run 

CMD ["node", "server.js"]



