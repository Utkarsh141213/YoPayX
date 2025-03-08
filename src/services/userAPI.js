import axiosInstance from "./axios"

export const getUserProfile = async (data) => {
    try {
        const response = axiosInstance.post("/users/auth/login", data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        return (await response).data
    } catch (error) {
        throw error
    }
}