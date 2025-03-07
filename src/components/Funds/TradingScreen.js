import React, { useEffect, useState } from "react";
import Background from "../Background";

import SellScreen from "./Sell-Withdraw/SellScreen";
import WithdrawalScreen from "./Sell-Withdraw/WithdrawalScreen";
import { getAssets, getAvailableBalace, getAvailableFunds, getCurrencyList } from "../../services/fundsAPI/tradingScreenAPI";


// Main Trading Screen Component
const TradingScreen = () => {
  const [activeTab, setActiveTab] = useState("Sell");
  const [availableFund, setAvailableFund] = useState("0.00 INR");
  const [assets, setAssets] = useState(["BTC", "ETH", "USDT", "BNB"])
  const [currencyList, setCurrencyList] = useState([])


  // const calculateYouWillGet = () => {
  //   if (amount && exchangeRate) {
  //     const total = parseFloat(amount) * parseFloat(exchangeRate);
  //     const tds = total * 0.01; // 1% TDS
  //     return (total - tds).toFixed(2);
  //   }
  //   return "0.00";
  // };


  useEffect(() => {
    // Fetch available funds
    (async () => {
      try {
        const funds = await getAvailableBalace();
        setAvailableFund(funds.data.balance); // or funds.balance, etc.
      } catch (error) {
        console.error(error);
      }
    })();

    // Fetch assets
    (async () => {
      try {
        const assetsData = await getAssets();
        setAssets(assetsData.data);
        const currency = await getCurrencyList()
        setCurrencyList(currency.data)
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

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
            <div className="text-white/50 text-xl">{availableFund}</div>
          </div>

          {activeTab.toLocaleLowerCase() === "sell" ? <SellScreen assets={assets} currencyList={currencyList} /> : <WithdrawalScreen assets={assets} currencyList={currencyList} />}


        </div>
      </div>
    </Background>
  );
};

export default TradingScreen;
