FROM node:14 AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 443

RUN npm run devStart

FROM node:14-alpine AS production

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package*.json ./

RUN apk add --no-cache certbot

EXPOSE 443

CMD ["certbot", "certonly", "--standalone", "-d", "hexgame0.com"]

RUN npm run start
