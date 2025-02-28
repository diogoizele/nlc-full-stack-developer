FROM node:iron-slim

WORKDIR /home/backend

COPY package.json bun.lockb ./
COPY src/ src/
COPY prisma/ prisma/
COPY scripts/wait-for-mysql.sh script.sh

ARG PORT=8080

RUN apt update && apt upgrade && apt install -y openssl && \  
  npm install -g bun && bun install && \
  bun add -g prisma && chmod +x script.sh

EXPOSE $PORT

CMD ["./script.sh"]
