import { API_ENDPOINTS } from "../apiConfig";
import axiosInstance from "./axios";

export const createKYC = async (formData) => {
  try {
    const response = await axiosInstance.post("/finance/kyc/create/", formData, {
      headers: {
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const getKYC = async () => {
  const res = await axiosInstance.get('/finance/kyc/list')
  return res.data
}

export const createBankDetials = async (data) => {
  try {
    const response = await axiosInstance.post("/finance/bank-account-details/create/", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getBankDetails = async () => {
  const response =  await axiosInstance.get("/finance/bank-account-details/list/")
  return response.data.data
};

export const generateOPT = async (phoneData) => {
  console.log(phoneData);
  await axiosInstance.post(`${API_ENDPOINTS.GENERATE_MOBILE_OTP}`, phoneData, {
        headers: {
      "Content-Type": "application/json"
    }
  })
  return 
} 

export const changePIN = async (pin) => {
  return await axiosInstance.post('/users/pin/reset/', pin)
}
