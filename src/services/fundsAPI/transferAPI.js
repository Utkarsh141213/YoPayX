import axiosInstance from "../axios"

export const getWalletDetails = async () => {
    const response = await axiosInstance.get("/finance/wallet/YTP/details/")
    return response.data
}