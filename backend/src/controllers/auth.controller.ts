import type { FastifyReply, FastifyRequest } from "fastify";

import AuthService from "../services/auth.service";
import type { LoginRequest } from "./requests/login-request.types";

class AuthController {
  async login(
    request: FastifyRequest<{ Body: LoginRequest }>,
    reply: FastifyReply
  ) {
    const userData = await AuthService.login(request.body);

    const response = AuthService.generateAccessToken(
      userData,
      request.server.jwt
    );

    reply.send(response);
  }
}

export default new AuthController();
