import app from "./app";

import { ENVS } from "./config/constants";

const start = async () => {
  try {
    await app.listen({
      port: ENVS.PORT,
      host: ENVS.HOST,
    });
    app.log.info(`Server is running on ${ENVS.HOST}:${ENVS.PORT} 🔥`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
