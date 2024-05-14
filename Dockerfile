# Configura a imagem Node para compilar a aplicação

FROM node:18-alpine AS build

WORKDIR /tmp/app

COPY package.json package-lock.json ./

RUN npm install \
    && npm cache clean --force  

ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

COPY . .

RUN npm run build

# Configura a imagem Nginx para servir a aplicação

FROM nginx:stable-alpine3.17

COPY --from=build /tmp/app/dist /usr/share/nginx/html

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
