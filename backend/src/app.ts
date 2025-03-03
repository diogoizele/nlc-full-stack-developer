import fastify from "fastify";

import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";

import { ENVS } from "./config/constants";
import { errorHandler } from "./middlewares/error-handler";
import { routes } from "./routes";

const app = fastify({
  logger: true,
});

app.setErrorHandler(errorHandler);

await app.register(cors, {
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  origin: "*",
});

app.register(fastifyJwt, { secret: ENVS.SECRET });

app.register(routes);

export default app;
