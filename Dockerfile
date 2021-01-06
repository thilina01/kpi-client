# Stage 1: Build an Angular Docker Image
FROM node:14.15.4-alpine as build
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app
RUN npm run prebuild:prod && npm run build:prod

# Stage 2, use the compiled app, ready for production with Nginx
FROM nginx
COPY --from=build /app/dist/ /usr/share/nginx/html
