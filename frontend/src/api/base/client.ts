import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAppStore } from "../../stores/app.store";
import { useAuthStore } from "../../stores/auth.store";
import { LocalStorageManager } from "../../utils/local-storage-manager";

export const queryClient = new QueryClient();

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = LocalStorageManager.get("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.status === 401) {
      const clearToken = useAuthStore.getState().clearToken;
      const setIsLoading = useAppStore.getState().setIsLoading;
      LocalStorageManager.remove("token");
      clearToken();
      setIsLoading(false);
    }
    return Promise.reject(error);
  }
);
