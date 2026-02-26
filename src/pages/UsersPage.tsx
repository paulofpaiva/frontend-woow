import { useEffect } from "react";
import { ChevronLeft, ChevronRight, ShieldX } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuthStore } from "@/stores/auth.store";
import { useUsersSearch, type UsersSearchRole } from "@/hooks/useUsersSearch";
import type { User } from "@/types/auth";
import type { AuthenticatedLayoutContext } from "@/layouts/AuthenticatedLayout";

const PAGE_TITLE = "Usuarios";

export function UsersPage() {
  const { setPageTitle } = useOutletContext<AuthenticatedLayoutContext>();
  const user = useAuthStore((s) => s.user);
  const isAdmin = user?.role === "admin";

  const {
    search,
    setSearch,
    role,
    setRole,
    page,
    loading,
    error,
    result,
    totalPages,
    handleSubmit,
    handlePageChange,
  } = useUsersSearch(isAdmin);

  useEffect(() => {
    setPageTitle(PAGE_TITLE);
    return () => setPageTitle("Dashboard");
  }, [setPageTitle]);

  return (
    <div className="w-full max-w-4xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-4">
            <div className="min-w-[200px] flex-1 space-y-2">
              <Label htmlFor="search">Buscar (nombre o correo)</Label>
              <Input
                id="search"
                type="text"
                placeholder="Ej: Juan o juan@mail.com"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                maxLength={255}
                disabled={!isAdmin}
              />
            </div>
            <div className="w-[140px] space-y-2">
              <Label htmlFor="role">Rol</Label>
              <select
                id="role"
                value={role}
                onChange={(e) =>
                  setRole((e.target.value || "") as UsersSearchRole)
                }
                disabled={!isAdmin}
                className="border-input h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
              >
                <option value="">Todos</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <Button type="submit" disabled={!isAdmin || loading}>
              {loading ? "Buscando…" : "Buscar"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {!isAdmin && (
        <Empty className="border-amber-200 bg-amber-50/50 dark:border-amber-900 dark:bg-amber-950/20">
          <EmptyHeader>
            <EmptyMedia
              variant="icon"
              className="bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400"
            >
              <ShieldX className="size-6" />
            </EmptyMedia>
            <EmptyTitle>Acceso restringido</EmptyTitle>
            <EmptyDescription>
              Solo los administradores pueden ejecutar la búsqueda de usuarios.
              Puedes ver los filtros pero no enviar la consulta.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}

      {isAdmin && error && (
        <p className="text-destructive text-sm" role="alert">
          {error}
        </p>
      )}

      {isAdmin && result && (
        <Card>
          <CardHeader>
            <CardTitle>
              Resultados ({result.pagination.total}{" "}
              {result.pagination.total === 1 ? "usuario" : "usuarios"})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="px-4 py-3">Nombre</TableHead>
                  <TableHead className="px-4 py-3">Correo</TableHead>
                  <TableHead className="px-4 py-3">Rol</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result.users.map((u: User) => (
                  <TableRow key={u.id}>
                    <TableCell className="px-4 py-3">{u.name}</TableCell>
                    <TableCell className="px-4 py-3 text-muted-foreground">
                      {u.email}
                    </TableCell>
                    <TableCell className="px-4 py-3 capitalize">
                      {u.role}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex items-center justify-between gap-4 border-t px-4 py-3">
              <p className="text-muted-foreground text-sm">
                Página {page} de {totalPages || 1}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page <= 1 || loading}
                >
                  <ChevronLeft className="size-4" />
                  Anterior
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page >= (totalPages || 1) || loading}
                >
                  Siguiente
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
