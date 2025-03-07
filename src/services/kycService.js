import axiosInstance from "./axios";

export const createKYC = async (formData) => {
  try {
    const response = await axiosInstance.post("/finance/kyc/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const createBankDetials = async (data) => {
    try {
        const response = await axiosInstance.post("url", JSON.stringify(data), {
            headers: {
              "Content-Type": "multipart/form-data",
            },
        })

        return response
    } catch (error) {
        throw error
    }
}

export const generateOPT = async (phoneData) => {
  if(!Number.isInteger(phoneData.phone_no)){
    throw new Error('invalid phone number format') 
  }
  await axiosInstance.post('/auth/genrate_mobile_otp', phoneData, {
    headers: {
      "Content-Type": "application/json"
    }
  })
  return 
} 
