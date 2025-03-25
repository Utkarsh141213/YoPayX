import {API_ENDPOINTS } from "../../apiConfig";
import axiosInstance from "../axios";


export const getAvailableFunds = async () => {
  const response = await axiosInstance.get("/finance/retreave_balance_conversion/");
  return response.data;
};

export const getAvailableBalace = async () => {
  const response = await axiosInstance.get("/finance/coin/YTP/balance");
  return response.data;
};

export const getAvailableBalaceByAssetType = async (asset) => {
  const response = await axiosInstance.get(`/finance/coin/${asset}/balance`);
  return response.data;
};




export const getAssets = async () => {
  const response = await axiosInstance.get("/finance/currency/crypto/list");
  return response.data;
};


export const sellAsset = async (sellData) => {

  const response = await axiosInstance.post("/finance/sell/ytp_to_fiat/", sellData, {
    headers: {
        "Content-Type": "application/json"
    }
  }
  );

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

export  const getTransactionHistoryWithFilters = async (data) => {
  const response = await axiosInstance.post(API_ENDPOINTS.FUND.TRANSACTION_HISTORY_FILTER, data)
  return response.data
}



export const getCurrencyList = async () => {
  const response = await axiosInstance.get("/finance/currency/fiat/list");
  return response.data;
};


