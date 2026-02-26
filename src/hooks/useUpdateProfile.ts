import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfile } from "@/services/auth.service";
import { useAuthStore } from "@/stores/auth.store";
import { updateProfileSchema, type UpdateProfileFormValues } from "@/schemas/auth";

const profileQueryKey = ["me"] as const;

export function useUpdateProfile(initialName: string, onSuccess?: () => void) {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((s) => s.setUser);

  const form = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: { name: initialName },
  });

  async function onSubmit(data: UpdateProfileFormValues) {
    const res = await updateProfile(data.name.trim());
    setUser(res.user);
    queryClient.invalidateQueries({ queryKey: profileQueryKey });
    onSuccess?.();
  }

  return { form, onSubmit };
}
