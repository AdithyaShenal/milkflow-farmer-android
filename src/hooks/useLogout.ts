import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/apiClient";

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await api.post("/auth/farmer/logout");
    },
    onSuccess: () => {
      queryClient.clear();
      window.location.href = "/";
    },
  });
}
