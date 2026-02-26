import { useEffect, useState } from "react";
import { LogOut, Mail, Pencil, Shield } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EditNameModal } from "@/components/EditNameModal";
import { ProfileCardSkeleton } from "@/components/ProfileCardSkeleton";
import { useProfile } from "@/hooks/useProfile";
import { useLogout } from "@/hooks/useLogout";
import type { AuthenticatedLayoutContext } from "@/layouts/AuthenticatedLayout";

const PAGE_TITLE = "Perfil";

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .map((s) => s[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function ProfilePage() {
  const [openEditModal, setOpenEditModal] = useState(false);
  const { setPageTitle } = useOutletContext<AuthenticatedLayoutContext>();

  useEffect(() => {
    setPageTitle(PAGE_TITLE);
    return () => setPageTitle("Dashboard");
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

  const initials = getInitials(user.name);

  return (
    <div className="w-full max-w-lg">
      <Card className="overflow-hidden border-0 shadow-lg">
        {/* Cover strip */}
        <div className="h-24 bg-primary/10" />

        <CardContent className="relative px-6 pb-6 pt-0">
          {/* Avatar + name */}
          <div className="-mt-12 flex flex-col items-center gap-3 pb-4">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-background bg-primary text-2xl font-semibold text-primary-foreground shadow-md">
              {initials}
            </div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">{user.name}</h2>
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
          </div>

          {/* Info list */}
          <ul className="space-y-3 rounded-lg bg-muted/40 p-4">
            <li className="flex items-center gap-3 text-sm">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-background">
                <Mail className="size-4 text-muted-foreground" />
              </span>
              <div className="min-w-0 flex-1">
                <span className="text-muted-foreground">Correo</span>
                <p className="truncate font-medium">{user.email}</p>
              </div>
            </li>
            <li className="flex items-center gap-3 text-sm">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-background">
                <Shield className="size-4 text-muted-foreground" />
              </span>
              <div className="min-w-0 flex-1">
                <span className="text-muted-foreground">Rol</span>
                <p className="font-medium capitalize">{user.role}</p>
              </div>
            </li>
          </ul>

          <Button
            variant="outline"
            className="mt-6 w-full"
            type="button"
            onClick={() => void logout()}
          >
            <LogOut className="size-4" />
            Cerrar sesión
          </Button>
        </CardContent>
      </Card>

      <EditNameModal
        open={openEditModal}
        onOpenChange={setOpenEditModal}
        currentName={user.name}
      />
    </div>
  );
}
