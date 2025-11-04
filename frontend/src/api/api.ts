import axios from "axios";
import { useAppContext } from "@/context/AppContext";

// ⚡️ Recomendación: exportar una función que usa el token actual
export const useApi = () => {
  const { token } = useAppContext();

  const api = axios.create({
    baseURL: "http://localhost:8080/api", // tu backend
  });

  // Interceptor para agregar el header Authorization
  api.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return api;
};
