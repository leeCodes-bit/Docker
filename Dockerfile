FROM node:18-alpine AS compilation

WORKDIR /initial

COPY . .

RUN npm install

RUN npm run compile

FROM node:18-alpine AS app

WORKDIR /app

COPY --from=compilation /initial/dist ./dist

COPY package.json .
COPY package-lock.json .

RUN npm install --production

COPY bin ./bin
COPY public ./public
COPY views ./views
COPY database.sqlite ./database.sqlite

CMD ["node", "bin/www"]

EXPOSE 3000