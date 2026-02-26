import { useAuthStore } from "@/stores/auth.store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ProfilePage() {
  const user = useAuthStore((s) => s.user);

  if (!user) {
    return (
      <main className="p-6">
        <p className="text-muted-foreground">No hay datos de sesión.</p>
      </main>
    );
  }

  return (
    <main className="p-6">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    </main>
  );
}
