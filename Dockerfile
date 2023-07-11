### STAGE 1:BUILD ###
FROM node:18-alpine AS build
# Create a Virtual directory inside the docker image
WORKDIR /usr/src/app/api
# Copy files to virtual directory
# COPY package.json package-lock.json ./
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

### STAGE 2:RUN ###
# Exposing a port, here it means that inside the container 
# the app will be using Port 3000 while running
FROM node:18-alpine
WORKDIR /app

# Set environment variables
ENV DB_CONNECTION_STRING=mongodb://mongo-example/book_store_db
ENV PORT=3000
ENV KEYCLOAK_DOMAIN=http://keycloak
ENV KEYCLOAK_REALM=book-store
ENV KEYCLOAK_CLIENT_ID=book-store-web

COPY --from=build /usr/src/app/api/dist ./dist
COPY package*.json ./
RUN npm ci --omit=dev

EXPOSE 3000
CMD [ "node", "dist/app.js" ]