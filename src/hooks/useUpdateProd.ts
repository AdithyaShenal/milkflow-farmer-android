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
    mutationFn: ({ productionId, volume }) =>
      api.put(`/production/${productionId}`, { volume }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["today", "production"] });
    },
  });
};

export default useUpdateProd;
