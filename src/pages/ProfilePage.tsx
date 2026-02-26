import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EditNameModal } from "@/components/EditNameModal";
import { ProfileCardSkeleton } from "@/components/ProfileCardSkeleton";
import { useProfile } from "@/hooks/useProfile";
import { useLogout } from "@/hooks/useLogout";
import type { AuthenticatedLayoutContext } from "@/layouts/AuthenticatedLayout";

const PAGE_TITLE = "Perfil";

export function ProfilePage() {
  const [openEditModal, setOpenEditModal] = useState(false);
  const { setPageTitle } = useOutletContext<AuthenticatedLayoutContext>();

  useEffect(() => {
    setPageTitle(PAGE_TITLE);
    return () => setPageTitle("Inicio");
  }, [setPageTitle]);
  const { data: user, isLoading, isError, errorMessage } = useProfile();
  const { logout } = useLogout();

  if (isLoading) {
    return <ProfileCardSkeleton />;
  }

  if (isError || !user) {
    return (
      <p className="text-destructive">{errorMessage ?? "Error al cargar el perfil"}</p>
    );
  }

  return (
    <Card className="max-w-md w-full">
      <CardHeader>
        <CardTitle>Perfil</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <dl className="grid gap-3">
          <div className="grid grid-cols-[120px_1fr_auto] gap-2 items-center">
            <dt className="text-muted-foreground text-sm">Nombre</dt>
            <dd className="text-sm">{user.name}</dd>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-8 shrink-0"
              aria-label="Editar nombre"
              onClick={() => setOpenEditModal(true)}
            >
              <Pencil className="size-4" />
            </Button>
          </div>
          <div className="grid grid-cols-[120px_1fr] gap-2">
            <dt className="text-muted-foreground text-sm">Correo</dt>
            <dd className="text-sm">{user.email}</dd>
          </div>
          <div className="grid grid-cols-[120px_1fr] gap-2">
            <dt className="text-muted-foreground text-sm">Rol</dt>
            <dd className="text-sm">{user.role}</dd>
          </div>
        </dl>
        <Button variant="outline" type="button" onClick={() => void logout()}>
          Cerrar sesión
        </Button>
      </CardContent>

      <EditNameModal
        open={openEditModal}
        onOpenChange={setOpenEditModal}
        currentName={user.name}
      />
    </Card>
  );
}
