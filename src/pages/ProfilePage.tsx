import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProfileCardSkeleton } from "@/components/ProfileCardSkeleton";
import { useProfile } from "@/hooks/useProfile";
import { useLogout } from "@/hooks/useLogout";

export function ProfilePage() {
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
        <CardTitle>Dashboard</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <dl className="grid gap-3">
          <div className="grid grid-cols-[120px_1fr] gap-2">
            <dt className="text-muted-foreground text-sm">Nombre</dt>
            <dd className="text-sm">{user.name}</dd>
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
    </Card>
  );
}
