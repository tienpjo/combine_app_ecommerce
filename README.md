# My Typescript Side Project Repository

Repository is combine from the two repositories `server` and `client`  for **Docker**. 
Repository will be separated into `server` and `client` directory for **NestJS** backend and **Angular** frontend resepctively. 

- [x] Server repository
- [x] Client repository
- [x] Docker support
- [x] Hook up Server and Client

## Server-side (NestJS)

The Project's backend written using **NestJS**

- **NSwag**: Nswag allows us to generate API Calls to our Backend on our Frontend in forms of Functions. The abstraction of **HttpClientModule** takes place in the generated file.
- **Steps**:
    1. `cd ./server` & `npm i` to install all dependencies for Server side. 
    2. Have an instance of **MongoDB** running (`mongod`). 
    3. `npm run start:dev` to start the server with Nodemon. 

## Client-side (Angular)

This repository Project's frontend written using **Angular CLI 15.2.7**

- **Run**: `cd ./client` & `npm i` to install all the dependencies then just start the application with `ng serve`. 
- **Note**:  Backend have CORS setup with CORS ORIGIN. 

## Docker

Docker is supported. 

- **Branch**: `docker`,`master`
- **Steps**: Just clone the repository, check out `docker` or `master` branch then from `root` directory, edit client/environments & docker-compose.yaml and set value ENV you want, run `docker compose up -d` and Docker will take over. When prebuild, run `docker compose build` first, after run `docker compose up -d`.
- **Note**: Angular application will be served by NGINX on `localhost`; Nest application will be running on `localhost:8080`. Again, it's worthwhile to explore the Dockerfile in both `client` and `server` directory; `docker-compose.yaml` to get the gist of how Docker and Docker Compose work.
