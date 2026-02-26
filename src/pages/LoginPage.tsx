import { Link } from "react-router-dom";
import { useLogin } from "@/hooks/useLogin";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import woowLogo from "@/assets/woow_logo.jpeg";

export function LoginPage() {
  const { form, onSubmit } = useLogin();
  const rootError = form.formState.errors.root?.message;

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-col items-center gap-4">
        <img
          src={woowLogo}
          alt="Woow Technology"
          className="h-16 w-auto object-contain"
        />
        <CardTitle>Iniciar sesión</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {rootError && (
                <p className="text-destructive text-sm" role="alert">
                  {rootError}
                </p>
              )}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="ejemplo@correo.com"
                        autoComplete="email"
                        disabled={form.formState.isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Mínimo 8 caracteres"
                        autoComplete="current-password"
                        disabled={form.formState.isSubmitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="text-muted-foreground text-center text-sm">
                ¿No tienes cuenta?{" "}
                <Link to="/register" className="text-primary underline-offset-4 hover:underline">
                  Registrarse
                </Link>
              </p>
              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Cargando…" : "Entrar"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
  );
}
