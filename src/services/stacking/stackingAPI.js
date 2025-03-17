import { API_ENDPOINTS } from "../../apiConfig"
import axiosInstance from "../axios"

export const getStackingOverview = async () => {

    const response = await axiosInstance.get(API_ENDPOINTS.STACKING.GET_OVERVIEW)
    return response.data
}

export const getCardDetails = async () => {
    const response =  await axiosInstance.get(API_ENDPOINTS.STACKING.STACKING_CARD_DETAILS)
    return response.data
}

export const getAllStacking = async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.STACKING.GET_ALL_STACKNIG)
    return response.data
}

export const getStackingReward = async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.STACKING.GET_STACKING_REWARDS)
    return response.data
}