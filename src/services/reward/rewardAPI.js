import { API_ENDPOINTS } from "../../apiConfig"
import axiosInstance from "../axios"

export const getTaskList = async () => {
    const respone = await axiosInstance.get(API_ENDPOINTS.REWARDS.GET_TASK_LIST)
    return respone.data
}

export const getIphoneTaskList = async () => {
    const respone = await axiosInstance.get(API_ENDPOINTS.REWARDS.GET_IPHONE_TASK_LIST)
    return respone.data
}

export const claimReward = async (data) => {
    const respone = await axiosInstance.post(API_ENDPOINTS.REWARDS.CLAIM_REWARD, data)
    return respone.data
}