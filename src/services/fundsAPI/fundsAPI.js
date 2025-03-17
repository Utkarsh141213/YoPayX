import axiosInstance from "../axios";

export const addFundInINR = async ({ amount, fiat }) => {
  if (typeof amount !== "number" || amount <= 0) {
    throw new Error("Amount must be a Number and greater than 0");
  }
  try {
    const response = await axiosInstance.post(
      "/finance/deposit/fiat/request/",
      { amount, fiat }
    );

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

  const response = await axiosInstance.post(
    "/finance/sell/fiat_to_coin/",
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

export const getCoinValueInCurrency = async (currency = null) => {
  if (currency) {
    const res = await axiosInstance.get(`/finance/coin/${currency}/value/`);
    return res.data;
  }
  const res = await axiosInstance.get("/finance/coin/YTP/value/");
  return res.data;
};

export const sendYTP = async ({
  pin,
  amount,
  ticker,
  address,
}) => {

  return axiosInstance.post("/finance/send/amount/", {
    transaction_pin: pin,
    amount,
    ticker,
    address,
  });
}
