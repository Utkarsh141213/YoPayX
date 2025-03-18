import { API_ENDPOINTS } from "../../apiConfig"
import axiosInstance from "../axios"

export const getUserReferralLink = async () => {
    const respone = await axiosInstance.get(API_ENDPOINTS.PROMOTION.USER_REFERRAL_LINK)
    return respone.data
}

export const getTaskList = async () => {
    const respone = await axiosInstance.get(API_ENDPOINTS.PROMOTION.GET_TASK_LIST)
    return respone.data
}

export const getIphoneTaskList = async () => {
    const respone = await axiosInstance.get(API_ENDPOINTS.PROMOTION.GET_IPHONE_TASK_LIST)
    return respone.data
}