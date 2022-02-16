FROM node:16.14.0 as build

COPY . .
RUN npm ci
RUN npm run build

### FINAL IMAGE ###
FROM node:16.14.0

COPY package.json .
COPY package-lock.json .
RUN npm ci --production --ignore-scripts

COPY --from=build dist/ .

CMD ["node", "server.js"]
