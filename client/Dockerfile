FROM node:18-alpine AS build
WORKDIR /tienpjo/client/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine
COPY --from=build /tienpjo/client/src/app/dist/client /usr/share/nginx/html
EXPOSE 80
