import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "../services/apiClient";

export interface ApiError {
  message: string;
  status: number;
  details?: string;
  code: string;
}

interface Response {
  registered: boolean;
  message: string;
  production: Production | null;
}

export interface Production {
  _id: string;
  volume: number;
  status: string;
  registration_time: string;
  failure_reason?: string;
  collectedVolume?: number;
  blocked: boolean;
}

const useFetchToday = () => {
  return useQuery<Response, AxiosError<ApiError>>({
    queryKey: ["today", "production"],
    queryFn: () => api.get("/production/today").then((res) => res.data),
  });
};

export default useFetchToday;
