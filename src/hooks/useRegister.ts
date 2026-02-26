import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { login, register } from "@/services/auth.service";
import { useAuthStore } from "@/stores/auth.store";
import { registerSchema, type RegisterFormValues } from "@/schemas/auth";

export function useRegister() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: RegisterFormValues) {
    try {
      await register({
        name: data.name.trim(),
        email: data.email.trim(),
        password: data.password,
      });
      const res = await login({
        email: data.email.trim(),
        password: data.password,
      });
      setAuth(res.token, res.user);
      navigate("/profile", { replace: true });
    } catch (err) {
      const message =
        axios.isAxiosError(err) && typeof err.response?.data?.message === "string"
          ? err.response.data.message
          : "Error al registrar. Intenta de nuevo.";
      form.setError("root", { message });
    }
  }

  return { form, onSubmit };
}
