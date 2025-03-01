import fastify from "fastify";

import fastifyJwt from "@fastify/jwt";
import { ENVS } from "./config/constants";
import { errorHandler } from "./middlewares/error-handler";
import { routes } from "./routes";

const app = fastify({
  logger: true,
});

app.setErrorHandler(errorHandler);

app.register(fastifyJwt, { secret: ENVS.SECRET });

app.register(routes);

export default app;
