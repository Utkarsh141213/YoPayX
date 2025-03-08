import React, { useEffect, useState } from "react";
import Background from "../Background";

import SellScreen from "./Sell-Withdraw/SellScreen";
import WithdrawalScreen from "./Sell-Withdraw/WithdrawalScreen";
import {
  getAssets,
  getAvailableBalace,
  getAvailableFunds,
  getCurrencyList,
} from "../../services/fundsAPI/tradingScreenAPI";
import { LiaChessKingSolid } from "react-icons/lia";
import { toast } from "react-toastify";

// Main Trading Screen Component
const TradingScreen = () => {
  const [activeTab, setActiveTab] = useState("Sell");
  const [availableBalance, setAvailableBalance] = useState("0.00 INR");
  const [assets, setAssets] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);

  // const calculateYouWillGet = () => {
  //   if (amount && exchangeRate) {
  //     const total = parseFloat(amount) * parseFloat(exchangeRate);
  //     const tds = total * 0.01; // 1% TDS
  //     return (total - tds).toFixed(2);
  //   }
  //   return "0.00";
  // };

  useEffect(() => {
    // Fetch assets
    (async () => {
      try {
        const assetsData = await getAssets();
        setAssets(assetsData.data);
        const currency = await getCurrencyList();
        setCurrencyList(currency.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        let funds;
        if (activeTab.toLocaleLowerCase() === "sell") {
          funds = await getAvailableBalace();
          console.log(funds.data);
          setAvailableBalance(funds.data.balance);
        } else {
          funds = await getAvailableFunds();
          console.log(funds);
          setAvailableBalance(funds.inr_balance)
        }
      } catch (error) {
        toast.error(error.response.data.message || error.message)
        console.error(error);
      }
    })();
  }, [activeTab]);

  return (
    <Background>
      <div className="min-h-screen text-white p-4">
        <div className="w-fit mx-auto">
          <div className="flex mb-4 justify-center">
            <div
              className={`min-w-40 h-fit py-2 text-lg font-bold mr-2 rounded-lg cursor-pointer ${
                activeTab === "Sell"
                  ? "bg-[#4BAF2A] text-white"
                  : "bg-white text-black "
              }`}
              onClick={() => setActiveTab("Sell")}
            >
              Sell
            </div>
            <div
              className={`min-w-40 h-fit py-2 text-lg font-bold rounded-lg cursor-pointer ${
                activeTab === "Withdrawal"
                  ? "bg-[#4BAF2A] text-white"
                  : "bg-white text-black "
              }`}
              onClick={() => setActiveTab("Withdrawal")}
            >
              Withdrawal
            </div>
          </div>

          <div className="text-center mb-2">
            <div className="text-white">
              Available{" "}
              {`${
                activeTab.toLocaleLowerCase() === "sell" ? "Balance" : "Fund"
              }`}
            </div>
            <div className="text-white/50 text-xl">{availableBalance}</div>
          </div>

          {activeTab.toLocaleLowerCase() === "sell" ? (
            <SellScreen assets={assets} currencyList={currencyList} setAvailableBalance={setAvailableBalance} />
          ) : (
            <WithdrawalScreen setAvailableBalance={setAvailableBalance}/>
          )}
        </div>
      </div>
    </Background>
  );
};

export default TradingScreen;
