# TODO App - React

## Instructions

Install dependencies

```bash
yarn install
```

Start local server at http://localhost:3000

```bash
yarn serve
```

Build production ready build

```bash
yarn build
yarn start
```

Run tests (with and without coverage)

```bash
yarn test
yarn test:coverage
```

Run linting checks

```bash
yarn lint
```

See the supported browser list

```bash
npx browserslist
```

## Docker

Build container (will serve the build folder using nginx)

```bash
docker build -t todo-web .
```

Run the container:

```bash
docker run -p 3000:80 todo-web
```

And using docker compose (to spin up api and FE):

```bash
docker-compose up --build
```

If you need to change any of the environment variables, please use the `.env` file.
