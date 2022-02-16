FROM node:16.14.0 as build

WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

### FINAL IMAGE ###
FROM node:16.14.0

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci --production --ignore-scripts

COPY --from=build /app/dist dist

CMD ["node", "dist/server.js"]
