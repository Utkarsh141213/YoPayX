import axios from "axios";
import { TRAVEL_API_BASE_URL } from "../../apiConfig";

if (!TRAVEL_API_BASE_URL) {
  throw new Error("API_BASE_URL is missing");
}

const axiosTravelInstance = axios.create({
  baseURL: TRAVEL_API_BASE_URL,
  timeout: 10000,
});


axiosTravelInstance.interceptors.request.use(
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


axiosTravelInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axiosTravelInstance;
