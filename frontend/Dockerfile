FROM node:iron-slim

WORKDIR /frontend

COPY . .

RUN apt update && apt upgrade && npm install -g bun && \ 
  bun install && bun run build

ARG PORT=3000

EXPOSE $PORT


CMD ["bunx", "--bun", "serve", "-s", "dist"]