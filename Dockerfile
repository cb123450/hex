FROM node:14

WORKDIR /client

COPY client/package*.json .

RUN npm install

COPY client/ .

RUN npm run build

WORKDIR /server

COPY server/package.json .

RUN npm install

COPY server/ .

WORKDIR /

COPY . .

WORKDIR /server

EXPOSE 80

CMD ["npm", "devStart"]