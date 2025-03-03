# NLC Full-Stack Developer

## Requirements

- Docker Compose version v2.32.4-desktop.1

## Running project

With docker compose installed, run the following command:

```bash
docker compose build --no-cache && docker compose up -d
```

## Using application

- Access `http://localhost:3000` to see the frontend application.

Use this credentials (pre-created) to login:

- **Email**: `admin@mail.com`
- **Password**: `admin`

## Ports

- Frontend running on `http://localhost:3000`
- Backend running on `http://localhost:8080`
- Database running on `http://localhost:3306`

## Choices

- [Frontend] Create project using [vite CLI](https://vite.dev/guide/#scaffolding-your-first-vite-project) to init a React with TypeScript boilerplate initial code.
- [Backend] Use [Bun](https://bun.sh/) as a TypeScript runtime, task runner and package manager.
- [Docker] I use [this repository](https://github.com/docker/awesome-compose/tree/master/react-express-mysql) to guide myself with docker compose.
- [Frontend] Using [Serve](https://github.com/vercel/serve#readme) to expose frontend app.
- [Database] Using Prisma ORM to manage database schema and queries.
