import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/services/auth.service";
import { useAuthStore } from "@/stores/auth.store";
import { loginSchema, type LoginFormValues } from "@/schemas/auth";

export function useLogin() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(data: LoginFormValues) {
    try {
      const res = await login({ email: data.email.trim(), password: data.password });
      setAuth(res.token, res.user);
      navigate("/profile", { replace: true });
    } catch (err) {
      const message =
        axios.isAxiosError(err) && typeof err.response?.data?.message === "string"
          ? err.response.data.message
          : "Credenciales inválidas";
      form.setError("root", { message });
    }
  }

  return { form, onSubmit };
}
