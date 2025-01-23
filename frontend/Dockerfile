FROM node:21.6-alpine

RUN mkdir /backend
WORKDIR /frontend

COPY . .
RUN npm install

CMD [ "npm", "run", "build"]