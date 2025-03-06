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

export const createKYCMoblieOTP = async (data) => {
  try {
    //NO BASE URL PROVIDED
    const response = await axiosInstance.post("url", JSON.stringify(data), {
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
