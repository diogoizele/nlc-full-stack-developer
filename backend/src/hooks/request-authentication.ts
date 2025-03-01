import { type FastifyRequest } from "fastify";

import { HttpError } from "../errors/http-error";

export const requestAuthentication = async (request: FastifyRequest) => {
  const { authorization } = request.headers;

  if (!authorization) {
    throw HttpError.UNAUTHORIZED("Authorization header is required");
  }

  const token = authorization.replace("Bearer ", "");

  try {
    request.user = request.server.jwt.verify(token);
  } catch (error) {
    throw HttpError.UNAUTHORIZED("Invalid token - please log in again");
  }
};
