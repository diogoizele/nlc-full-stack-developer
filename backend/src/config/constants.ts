export const ENVS = {
  PORT: Number(process.env.PORT) || 8080,
  HOST: process.env.HOST || "0.0.0.0",
  SECRET: String(process.env.SECRET),
};
