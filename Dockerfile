FROM node:14

WORKDIR /client

COPY client/package.json .
COPY client/package-lock.json .

RUN npm install

RUN npm build

WORKDIR /server

COPY server/package.json .
COPY server/package-lock.json .

RUN npm install

WORKDIR /

EXPOSE 443

CMD ["npm", "run", "devStart"]