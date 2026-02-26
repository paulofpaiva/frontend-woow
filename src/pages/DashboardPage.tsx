import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import type { AuthenticatedLayoutContext } from "@/layouts/AuthenticatedLayout";

const PAGE_TITLE = "Inicio";

export function DashboardPage() {
  const { setPageTitle } = useOutletContext<AuthenticatedLayoutContext>();

  useEffect(() => {
    setPageTitle(PAGE_TITLE);
    return () => setPageTitle("Inicio");
  }, [setPageTitle]);

  return (
    <div className="w-full max-w-2xl space-y-4">
      <h2 className="text-2xl font-semibold">Inicio</h2>
      <p className="text-muted-foreground">
        Bienvenido al dashboard. Selecciona una opción en el menú.
      </p>
    </div>
  );
}
