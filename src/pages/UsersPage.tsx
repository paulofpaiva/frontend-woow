import { useEffect } from "react";
import { ShieldX } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { useAuthStore } from "@/stores/auth.store";
import type { AuthenticatedLayoutContext } from "@/layouts/AuthenticatedLayout";

const PAGE_TITLE = "Buscar usuarios";

export function UsersPage() {
  const { setPageTitle } = useOutletContext<AuthenticatedLayoutContext>();
  const user = useAuthStore((s) => s.user);
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    setPageTitle(PAGE_TITLE);
    return () => setPageTitle("Dashboard");
  }, [setPageTitle]);

  if (!isAdmin) {
    return (
      <div className="w-full max-w-4xl">
        <Empty className="border-amber-200 bg-amber-50/50 dark:border-amber-900 dark:bg-amber-950/20">
          <EmptyHeader>
            <EmptyMedia variant="icon" className="bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400">
              <ShieldX className="size-6" />
            </EmptyMedia>
            <EmptyTitle>Acceso restringido</EmptyTitle>
            <EmptyDescription>
              Solo los administradores pueden ejecutar la búsqueda de usuarios. Puedes ver los filtros pero no enviar la consulta.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>
    );
  }

  return <div className="w-full max-w-4xl space-y-4" />;
}
