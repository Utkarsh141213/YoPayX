import axiosInstance from "../axios";

export const addFundInINR = async ({ amount, fiat }) => {
  if (typeof amount !== "number" || amount <= 0) {
    throw new Error("Amount must be a Number and greater than 0");
  }
  try {
    const response = await axiosInstance.post("/finance/deposit/fiat/request/", { amount, fiat });
    console.log(response);
    return response.data; 
  } catch (error) {
    throw error;
  }
};

export const confirmAddFundService = async (formData) => {
  try {
    const response = await axiosInstance.post(
      "/finance/deposit/fiat/create/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};



export const buyAssets = async (data) => {
  console.log(data);
  const response = await axiosInstance.post(
    "/finance/buy/coin/request/",
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log('RESPONSE', response.data);
  return response.data;
};


