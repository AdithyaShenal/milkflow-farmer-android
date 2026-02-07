import { useQuery } from "@tanstack/react-query";
import { api } from "../services/apiClient";
import type { AxiosError } from "axios";
import { Preferences } from "@capacitor/preferences";

interface FarmerData {
  _id: string;
  address: string;
  location: {
    lat: number;
    lon: number;
  };
  name: string;
  route: number;
  updatedAt: string;
  createdAt: string;
  phone: string;
}

export function useAuth() {
  return useQuery<FarmerData, AxiosError>({
    queryKey: ["auth", "user"],
    queryFn: async () => {
      // Check if token exists before making request
      const { value: token } = await Preferences.get({ key: "authToken" });

      if (!token) {
        throw new Error("No authentication token found");
      }

      const { data } = await api.get<FarmerData>("/auth/farmer/me");
      return data;
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    // Only fetch if we might have a token
    enabled: true,
  });
}
