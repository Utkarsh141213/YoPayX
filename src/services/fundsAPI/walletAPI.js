import { API_ENDPOINTS } from "../../apiConfig"
import axiosInstance from "../axios"

export const getWalletDetails = async (asset) => {
    const res = await axiosInstance.get(`${API_ENDPOINTS.FUND.GET_WALLET_DETAILS}${asset}/details/`)
    return res.data
}