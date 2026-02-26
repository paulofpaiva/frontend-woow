import { api } from "./api";
import type { ListUsersParams, ListUsersResponse } from "../types/auth";

export async function listUsers(
  params: ListUsersParams = {}
): Promise<ListUsersResponse> {
  const { data } = await api.get<ListUsersResponse>("/api/users", {
    params: {
      page: params.page ?? 1,
      limit: params.limit ?? 10,
      ...(params.search?.trim() && { search: params.search.trim() }),
      ...(params.role && { role: params.role }),
    },
  });
  return data;
}
