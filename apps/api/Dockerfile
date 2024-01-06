# Stage 1: Build the application
FROM node:20-bullseye AS build
WORKDIR /app

COPY ./ ./
COPY package.json pnpm-lock.json* /app/

ARG PORT_API
ARG HOST_API
ARG MONGO_URI
ARG MUSIC_STORAGE

ENV PORT_API=${PORT_API}
ENV HOST_API=${HOST_API}
ENV MONGO_URI=${MONGO_URI}
ENV MUSIC_STORAGE=${MUSIC_STORAGE}
ENV NX_DAEMON=false

RUN npm install -g pnpm && pnpm install

COPY . .

RUN npx nx build api

# Stage 2: Create the production image
FROM node:20-bullseye

WORKDIR /app

COPY --from=build /app/dist/apps/api ./dist/apps/api
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json


EXPOSE ${PORT_API}

CMD ["node", "dist/apps/api/main.js"]
