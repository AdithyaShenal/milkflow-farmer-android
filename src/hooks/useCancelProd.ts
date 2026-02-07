import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "../services/apiClient";

interface ParamProps {
  productionId: string;
}

interface ApiError {
  message: string;
  status: number;
  details?: string;
  code: string;
}

const useCancelProd = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<ApiError>, ParamProps>({
    mutationFn: (params: ParamProps) =>
      api.delete(`/production/${params.productionId}`),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["today", "production"] });
    },
  });
};

export default useCancelProd;

// Good example -> Conditional usage of react query
// useMutation<void, AxiosError<ApiError>, ProductionActionPayload>({
//   mutationFn: async ({ productionId, action, volume }) => {
//     if (action === "cancel") {
//       await api.delete(`/production/${productionId}`);
//       return;
//     }

//     await api.patch(`/production/${productionId}`, { volume });
//   },
// });
