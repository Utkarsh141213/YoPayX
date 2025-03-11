import axiosInstance from "../axios"

export const getWalletDetails = async () => {
    const res = await axiosInstance.get('/finance/wallet/YTP/details/')
    return res.data
}