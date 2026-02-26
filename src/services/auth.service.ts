import { api } from "./api";
import type { LoginCredentials, LoginResponse, User } from "../types/auth";

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>("/api/auth/login", credentials);
  return data;
}

export async function getMe(): Promise<User> {
  const { data } = await api.get<User>("/api/users/me");
  return data;
}
