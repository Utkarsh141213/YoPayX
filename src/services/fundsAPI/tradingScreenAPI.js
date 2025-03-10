import axiosInstance from "../axios";


export const getAvailableFunds = async () => {
  const response = await axiosInstance.get("/finance/retreave_balance_conversion");
  return response.data;
};

export const getAvailableBalace = async () => {
  const response = await axiosInstance.get("/finance/coin/YTP/balance");
  return response.data;
};




export const getAssets = async () => {
  const response = await axiosInstance.get("/finance/currency/crypto/list");
  return response.data;
};


export const sellAsset = async (sellData) => {
    console.log(sellData);
    console.log('IN API');
  const response = await axiosInstance.post("/finance/sell/fiat_to_coin/", sellData, {
    headers: {
        "Content-Type": "application/json"
    }
  }
  );
  console.log('GOT RES', response);
  return response.data;
};


export const withdrawFunds = async (withdrawData) => {
  const response = await axiosInstance.post("/finance/withdraw/fiat/create/", withdrawData);
  return response.data;
};


export const getTransactionHistory = async () => {
  const response = await axiosInstance.get("/finance/transactions/list");
  return response.data;
};



export const getCurrencyList = async () => {
  const response = await axiosInstance.get("/finance/currency/fiat/list");
  return response.data;
};


