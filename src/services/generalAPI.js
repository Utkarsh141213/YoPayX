import { API_ENDPOINTS } from "../apiConfig"
import axiosInstance from "./axios"

export const getFAQ = async (params) => {
    const response = await axiosInstance.get(API_ENDPOINTS.GENERAL.FAQ, {params})
    return response.data
}

export const getNotifications = async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.GENERAL.NOTIFICATION)
    return response.data
}