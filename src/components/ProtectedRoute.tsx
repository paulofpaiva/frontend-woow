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
      <div className="protected-route-loading" role="status" aria-label="Cargando">
        Cargando…
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
