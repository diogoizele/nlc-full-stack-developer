import type { JWT } from "@fastify/jwt";
import bcrypt from "bcrypt";

import type { LoginRequest } from "../controllers/requests/login-request.types";
import { HttpError } from "../errors/http-error";
import UserRepository from "../repositories/user.repository";

class AuthService {
  async login({ email, password }: LoginRequest) {
    this.loginBodyValidator({ email, password });
    const user = await UserRepository.findByEmail(email);

    const isMatch = user && bcrypt.compareSync(password, user.password);

    if (!user || !isMatch) {
      throw HttpError.UNAUTHORIZED("Invalid credentials");
    }

    return { email: user.email };
  }

  generateAccessToken(user: { email: string }, jwt: JWT) {
    return {
      accessToken: jwt.sign(user, {
        expiresIn: "60m",
      }),
    };
  }

  private loginBodyValidator(body: LoginRequest) {
    const { email, password } = body;

    if (!email) {
      throw HttpError.BAD_REQUEST("Email is required");
    }

    if (!password) {
      throw HttpError.BAD_REQUEST("Password is required");
    }
  }
}

export default new AuthService();
