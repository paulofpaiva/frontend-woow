import { useNavigate } from "react-router-dom";
import { logout as logoutApi } from "@/services/auth.service";
import { useAuthStore } from "@/stores/auth.store";

export function useLogout() {
  const navigate = useNavigate();

  async function logout() {
    try {
      await logoutApi();
    } finally {
      useAuthStore.getState().logout();
      navigate("/login", { replace: true });
    }
  }

  return { logout };
}
