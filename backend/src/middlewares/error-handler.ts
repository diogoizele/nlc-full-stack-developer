import type { FastifyError, FastifyReply, FastifyRequest } from "fastify";

export const errorHandler = (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  if (error.statusCode) {
    reply.status(error.statusCode).send({
      statusCode: error.statusCode,
      message: error.message,
    });
  } else {
    reply.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};
