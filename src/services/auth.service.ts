import { api } from "./api";
import type {
  LoginCredentials,
  LoginResponse,
  RegisterCredentials,
  User,
} from "../types/auth";

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>("/api/auth/login", credentials);
  return data;
}

export async function register(
  credentials: RegisterCredentials
): Promise<{ message: string }> {
  const { data } = await api.post<{ message: string }>(
    "/api/auth/register",
    credentials
  );
  return data;
}

export async function logout(): Promise<void> {
  await api.post("/api/auth/logout");
}

export async function getMe(): Promise<User> {
  const { data } = await api.get<User>("/api/users/me");
  return data;
}

export async function updateProfile(name: string): Promise<{ message: string; user: User }> {
  const { data } = await api.put<{ message: string; user: User }>("/api/users/me", {
    name,
  });
  return data;
}
