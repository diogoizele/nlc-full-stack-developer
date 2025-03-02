import { apiClient } from "./base/client";
import { LoginRequest, LoginResponse } from "./interfaces/login";

export const login = async (payload: LoginRequest) => {
  const { data } = await apiClient.post<LoginResponse>("/auth/login", payload);

  return data;
};
