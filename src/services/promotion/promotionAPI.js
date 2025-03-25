import { API_ENDPOINTS } from "../../apiConfig"
import axiosInstance from "../axios"

export const getUserReferralLink = async () => {
    const respone = await axiosInstance.get(API_ENDPOINTS.PROMOTION.USER_REFERRAL_LINK)
    return respone.data
}

export const createCustomReferralLink = async (data) => {
    const respone = await axiosInstance.post(API_ENDPOINTS.PROMOTION.CREATE_CUSTOM_REFERRAL_LINK, data)
    return respone.data
}

export const getBannerList = async () => {
    const respone = await axiosInstance.get(API_ENDPOINTS.PROMOTION.BANNER_LIST)
    return respone.data
}
export const getVideoList = async () => {
    const respone = await axiosInstance.get(API_ENDPOINTS.PROMOTION.VIDEO_LIST)
    return respone.data
}