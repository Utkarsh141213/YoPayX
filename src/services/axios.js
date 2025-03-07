import axios from "axios";
import { API_BASE_URL } from "../apiConfig";

if (!API_BASE_URL) {
  throw new Error("API_BASE_URL is missing");
}

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});


axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axiosInstance;
