FROM node:8.12.0 as build
RUN npm install -g yarn

COPY . .
RUN yarn install
RUN yarn build

### FINAL IMAGE ###
FROM node:8.12.0
RUN npm install -g yarn

COPY package.json .
COPY yarn.lock .
RUN yarn install --production

COPY --from=build dist/ .

CMD ["node", "server.js"]