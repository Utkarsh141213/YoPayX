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

export const createSubTask = async (data) => {
    const respone = await axiosInstance.post(API_ENDPOINTS.PROMOTION.CREATE_SUB_TASK, data)
    return respone.data
}

export const createTask = async (data) => {
    const respone = await axiosInstance.post(API_ENDPOINTS.PROMOTION.CREATE_TASK, data)
    return respone.data
}

export const quitTask = async (data) => {
    const respone = await axiosInstance.post(API_ENDPOINTS.PROMOTION.QUIT_TASK, data)
    return respone.data
}