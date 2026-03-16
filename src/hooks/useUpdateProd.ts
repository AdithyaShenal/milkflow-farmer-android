import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "../services/apiClient";
import type { Production } from "./usefetchToday";

interface Payload {
  productionId: string;
  volume: number;
}

interface ApiError {
  message: string;
  status: number;
  details?: string;
  code: string;
}

const useUpdateProd = () => {
  const queryClient = useQueryClient();

  return useMutation<Production, AxiosError<ApiError>, Payload>({
    mutationFn: async ({ productionId, volume }) => {
      const response = await api.put(`/production/${productionId}`, { volume });
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["today", "production"] });
      queryClient.refetchQueries({ queryKey: ["today", "production"] });
    },
  });
};

export default useUpdateProd;
