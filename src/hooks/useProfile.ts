import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/services/auth.service";

const profileQueryKey = ["me"] as const;

export function useProfile() {
  const query = useQuery({
    queryKey: profileQueryKey,
    queryFn: getMe,
  });

  const errorMessage =
    query.error && axios.isAxiosError(query.error) && typeof query.error.response?.data?.message === "string"
      ? query.error.response.data.message
      : query.isError
        ? "Error al cargar el perfil"
        : null;

  return {
    ...query,
    errorMessage: query.isError ? errorMessage : null,
  };
}
