import { useMutation } from "@tanstack/react-query";
import { api } from "../services/apiClient";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

interface CreateUserFormValues {
  name: string;
  shortName: string;
  phone: string;
  address: string;
  pinNo: string;
  route: number;
  location: {
    lat: number;
    lon: number;
  };
}

interface ApiError {
  message: string;
  status: number;
  details: string;
  code: string;
}

export function useRegisterFarmer() {
  const navigate = useNavigate();

  return useMutation<unknown, AxiosError<ApiError>, CreateUserFormValues>({
    mutationFn: async (props) => {
      const { data } = await api.post("/farmer", props);
      return data;
    },

    onSuccess: async () => {
      navigate("/");
    },
  });
}
