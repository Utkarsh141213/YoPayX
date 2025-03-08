import axiosInstance from "../axios";

export const addFundInINR = async (amount) => {
  try {
    if (typeof amount !== "number" && amount <= 0) {
      throw new Error("Amount must be a Number and greate than 0");
    }

    const response = await axiosInstance.post("/finance/deposit/fiat/request/", amount);
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


