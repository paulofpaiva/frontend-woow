import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "El correo es requerido")
    .email("El correo no es válido"),
  password: z
    .string()
    .min(1, "La contraseña es requerida")
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z.string().min(1, "El nombre es requerido").max(255, "Máximo 255 caracteres"),
    email: z
      .string()
      .min(1, "El correo es requerido")
      .email("El correo no es válido"),
    password: z
      .string()
      .min(1, "La contraseña es requerida")
      .min(8, "La contraseña debe tener al menos 8 caracteres"),
    confirmPassword: z.string().min(1, "Confirma la contraseña"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const updateProfileSchema = z.object({
  name: z.string().min(1, "El nombre es requerido").max(255, "Máximo 255 caracteres"),
});

export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;
