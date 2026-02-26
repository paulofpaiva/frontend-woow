import axios from "axios";
import { useState, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { listUsers } from "@/services/users.service";

const USERS_QUERY_KEY = "users" as const;
const LIMIT = 10;

export type UsersSearchRole = "" | "user" | "admin";

type UsersSearchState = {
  search: string;
  role: UsersSearchRole;
  page: number;
  hasSearched: boolean;
};

type UsersSearchOptions = {
  initialSearch?: string;
  initialRole?: UsersSearchRole;
  initialPage?: number;
  onStateChange?: (state: UsersSearchState) => void;
};

export function useUsersSearch(isAdmin: boolean, options?: UsersSearchOptions) {
  const {
    initialSearch = "",
    initialRole = "",
    initialPage = 1,
    onStateChange,
  } = options ?? {};

  const [search, setSearch] = useState(initialSearch);
  const [role, setRole] = useState<UsersSearchRole>(initialRole);
  const [page, setPage] = useState(initialPage);
  const [submittedSearch, setSubmittedSearch] = useState<string | null>(null);
  const [submittedRole, setSubmittedRole] = useState<UsersSearchRole | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (!isAdmin) return;
    if (hasSearched) return;
    const hasInitialFilters =
      Boolean(initialSearch?.trim()) ||
      Boolean(initialRole) ||
      (typeof initialPage === "number" && initialPage > 1);

    if (!hasInitialFilters) return;

    setSubmittedSearch(initialSearch);
    setSubmittedRole(initialRole);
    setPage(initialPage);
    setHasSearched(true);
  }, [isAdmin, hasSearched, initialSearch, initialRole, initialPage]);

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
      onStateChange?.({
        search,
        role,
        page: 1,
        hasSearched: true,
      });
    },
    [isAdmin, search, role, onStateChange]
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (!isAdmin) return;
      setPage(newPage);
      setHasSearched(true);
      onStateChange?.({
        search,
        role,
        page: newPage,
        hasSearched: true,
      });
    },
    [isAdmin, onStateChange, role, search]
  );

  const errorMessage =
    query.error && axios.isAxiosError(query.error) && typeof query.error.response?.data?.message === "string"
      ? query.error.response.data.message
      : query.isError
        ? "Error al buscar usuarios. Intenta de nuevo."
        : null;

  const result = query.data ?? null;
  const totalPages = result?.pagination?.totalPages ?? 0;

  return {
    search,
    setSearch,
    role,
    setRole,
    page: result?.pagination?.page ?? page,
    loading: query.isFetching,
    error: query.isError ? errorMessage : null,
    result,
    totalPages,
    handleSubmit,
    handlePageChange,
  };
}
