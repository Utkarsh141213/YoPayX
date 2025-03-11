import axiosInstance from "./axios";

export const createKYC = async (formData) => {
  try {
    const response = await axiosInstance.post("/finance/kyc/create/", formData, {
      headers: {
        // "Content-Type": "multipart/form-data",
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

  await axiosInstance.post('/users/auth/resend-mobile-otp/', {phone_no: 9365946001, country_code: 91}, {
        headers: {
      "Content-Type": "application/json"
    }
  })
  return 
} 

export const changePIN = async (pin) => {
  return await axiosInstance.post('/users/pin/reset/', pin)
}
