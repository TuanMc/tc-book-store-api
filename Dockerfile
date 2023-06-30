### STAGE 1:BUILD ###
FROM node:18-alpine AS build
# Create a Virtual directory inside the docker image
WORKDIR /usr/src/app/api

# Set environment variables
ENV DB_CONNECTION_STRING = mongodb://127.0.0.1:27017/book_store_db
ENV PORT = 3000
ENV KEYCLOAK_DOMAIN = http://localhost:8080
ENV KEYCLOAK_REALM = book-store
ENV KEYCLOAK_CLIENT_ID = book-store-web

# Copy files to virtual directory
# COPY package.json package-lock.json ./
COPY package.json package-lock.json ./
COPY . .

RUN npm ci --omit=dev
RUN npm run build

### STAGE 2:RUN ###
# Exposing a port, here it means that inside the container 
# the app will be using Port 3000 while running
EXPOSE 3000
CMD [ "node", "dist/app.js" ]