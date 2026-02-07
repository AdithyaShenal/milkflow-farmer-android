import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "../services/apiClient";

interface Payload {
  volume: number;
}

interface ApiError {
  message: string;
  status: number;
  details?: string;
  code: string;
}

const useSubmitProd = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<ApiError>, Payload>({
    mutationFn: (payload: Payload) => api.post("/production", payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["today", "production"] });
    },
  });
};

export default useSubmitProd;
