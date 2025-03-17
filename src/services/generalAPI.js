import { API_ENDPOINTS } from "../apiConfig"
import axiosInstance from "./axios"

export const getFAQ = async (params) => {
    const response = await axiosInstance.get(API_ENDPOINTS.FAQ, {params})
    return response.data
}