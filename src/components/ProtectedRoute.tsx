import { Loader2 } from "lucide-react";
import { type ReactNode, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores/auth.store";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { token, isHydrated } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      useAuthStore.getState().setHydrated();
    });
    return () => cancelAnimationFrame(id);
  }, []);

  if (!isHydrated) {
    return (
      <div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-white"
        role="status"
        aria-label="Cargando"
      >
        <Loader2 className="size-10 animate-spin text-muted-foreground" aria-hidden />
        <p className="text-muted-foreground text-sm">Cargando…</p>
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
