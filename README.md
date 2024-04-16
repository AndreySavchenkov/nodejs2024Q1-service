# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm run docker:up 
```

## Running prisma migrations inside the container

```
docker exec -it nodejs2024q1-service-api-1 npx prisma migrate dev --name init
```

## Testing

After application running open new terminal and enter:

```
npm run test
```

