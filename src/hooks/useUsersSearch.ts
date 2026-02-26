import axios from "axios";
import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { listUsers } from "@/services/users.service";

const USERS_QUERY_KEY = "users" as const;
const LIMIT = 10;

export type UsersSearchRole = "" | "user" | "admin";

export function useUsersSearch(isAdmin: boolean) {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<UsersSearchRole>("");
  const [page, setPage] = useState(1);
  const [submittedSearch, setSubmittedSearch] = useState<string | null>(null);
  const [submittedRole, setSubmittedRole] = useState<UsersSearchRole | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const query = useQuery({
    queryKey: [USERS_QUERY_KEY, page, submittedSearch, submittedRole],
    queryFn: () =>
      listUsers({
        page,
        limit: LIMIT,
        ...(submittedSearch?.trim() && { search: submittedSearch.trim() }),
        ...(submittedRole && { role: submittedRole }),
      }),
    enabled: isAdmin && hasSearched,
  });

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!isAdmin) return;
      setSubmittedSearch(search);
      setSubmittedRole(role);
      setPage(1);
      setHasSearched(true);
    },
    [isAdmin, search, role]
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (!isAdmin) return;
      setPage(newPage);
    },
    [isAdmin]
  );

  const errorMessage =
    query.error && axios.isAxiosError(query.error) && typeof query.error.response?.data?.message === "string"
      ? query.error.response.data.message
      : query.isError
        ? "Error al buscar usuarios. Intenta de nuevo."
        : null;

  const result = query.data ?? null;
  const totalPages = result ? Math.ceil(result.total / result.limit) : 0;

  return {
    search,
    setSearch,
    role,
    setRole,
    page,
    loading: query.isFetching,
    error: query.isError ? errorMessage : null,
    result,
    totalPages,
    handleSubmit,
    handlePageChange,
  };
}
