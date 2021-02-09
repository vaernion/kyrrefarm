# Kyrrefarm

REST API that retrieves text files inside a private network.

React frontend to view stats from certain reports retrieved using the server.

## Config

### Server .env

- SSH_PATH
- SSH_USER
- SSH_KEY

## Build

### Server

```sh
cd server
npm i
npm build
```

### Client

```sh
cd client
npm i
npm build
```

## Dev

### Server

```sh
cd server
npm i
npm start
```

### Client

```sh
cd client
npm i
npm start
```

## API

| method | endpoint              | description                      |
| ------ | --------------------- | -------------------------------- |
| get    | /companies            | get all company names            |
| get    | /reports              | get all company reports          |
| get    | /reports/:companyName | get a specific company's reports |
