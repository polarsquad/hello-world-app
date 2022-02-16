FROM node:16.14.0 as build

WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

### FINAL IMAGE ###
FROM node:16.14.0

RUN groupadd --gid 1111 app && \
    useradd --uid 1111 --gid 1111 -m app

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci --production --ignore-scripts

COPY --from=build /app/dist dist

USER app:app
CMD ["node", "dist/server.js"]
