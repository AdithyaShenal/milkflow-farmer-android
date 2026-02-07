import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "../services/apiClient";
import type { ApiError, Production } from "./usefetchToday";

const useFetchProd = () => {
  return useQuery<Production[], AxiosError<ApiError>>({
    queryKey: ["productionHistory"],
    queryFn: () => api.get("/production/me").then((res) => res.data),
  });
};

export default useFetchProd;
