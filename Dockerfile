FROM node:18

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

EXPOSE 443

CMD ["npm", "run", "start"]