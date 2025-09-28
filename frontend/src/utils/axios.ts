import axios, {type AxiosInstance} from "axios";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:2001/api" : "/api",
  timeout: 30000,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
);
