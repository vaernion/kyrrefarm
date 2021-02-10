# Kyrrefarm

REST API that retrieves text files inside a private network.

React frontend to view stats from certain reports retrieved using the server.

## Todo

- [ ] web
  - [ ] KC health: annualized inflation rate (reduce reports income & expenses)
  - [x] per site overview
  - [ ] graphs
  - [x] summary of all companies
  - [x] localstorage favorite company
- [ ] api
  - [x] routes
  - [x] caching
  - [x] ssh & curl
  - [ ] HATEOAS

## Config

### Server env

- SSH_HOST
- SSH_USER
- SSH_KEY

## Build

### Server

```sh
cd server
npm i
npm run build
```

### Client

```sh
cd client
npm i
npm run build
```

## Dev

### Dev Server

```sh
cd server
npm i
npm start
```

### Dev Client

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
