import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AuthenticatedLayoutContext } from "@/layouts/AuthenticatedLayout";
import { useAuthStore } from "@/stores/auth.store";

const PAGE_TITLE = "Dashboard";

export function DashboardPage() {
  const { setPageTitle } = useOutletContext<AuthenticatedLayoutContext>();
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    setPageTitle(PAGE_TITLE);
    return () => setPageTitle("Dashboard");
  }, [setPageTitle]);

  return (
    <div className="w-full max-w-2xl space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Bienvenido{user?.name ? `, ${user.name}` : ""}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Selecciona una opción en el menú para comenzar.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
