# Hello World App
This is simple web application for testing in Docker, Kubernetes, etc.

## Development

### Run in Docker
```shell
docker build -t polarsquad:hello-world-app
docker run -it --rm -p 3000:3000 polarsquad:hello-world-app
```
> Open [http://localhost:3000]()

### Run with Docker Compose
```shell
docker-compose up
```
> Open [http://localhost:3000]()

### Run locally
#### Prerequisites
1. Install NodeJS (check version from `.nvmrc`)
2. Install Yarn (`npm install -g yarn`)
3. Install dependencies (`yarn install`)

```shell
yarn start
```
> Open [http://localhost:3000]()
