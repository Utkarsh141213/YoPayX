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
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const TradingScreen = () => {
  const [activeTab, setActiveTab] = useState("Sell");
  const [availableBalance, setAvailableBalance] = useState("0.00 INR");
  const [assets, setAssets] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);

  const location = useLocation();

  useEffect(() => {
    const { tab } = location.state || {};
    if (tab) {
      const lowerTab = tab.toLowerCase();
      if (lowerTab === "sell") {
        setActiveTab("Sell");
      } else if (lowerTab === "withdraw") {
        setActiveTab("Withdrawal");
      }
    }

    (async () => {
      try {
        const [assetsData, currency] = await Promise.all([
          getAssets(),
          getCurrencyList(),
        ]);
        const displayOrder = ["BTC", "YTP", "BNB", "USDT"]; 

        const sortedAssets = assetsData.data.sort(
          (a, b) =>
            displayOrder.indexOf(a.symbol) - displayOrder.indexOf(b.symbol)
        );
        setAssets(sortedAssets);
        setCurrencyList(currency.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [location.state]);

  useEffect(() => {
    (async () => {
      try {
        const active = activeTab.toLowerCase();
        let funds;
        if (active === "sell") {
          funds = await getAvailableBalace();
          setAvailableBalance(funds.data.balance);
        } else {
          funds = await getAvailableFunds();
          setAvailableBalance(funds.inr_balance);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
        console.error(error);
      }
    })();
  }, [activeTab]);

  return (
    <Background>
      <div className="min-h-screen text-white p-4 relative">
        <div className="w-fit mx-auto">
          <div className="flex mb-4 justify-center">
            <div
              className={`min-w-40 h-fit py-2 text-lg font-bold mr-2 rounded-lg cursor-pointer ${
                activeTab === "Sell"
                  ? "bg-[#4BAF2A] text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => setActiveTab("Sell")}
            >
              Sell
            </div>
            <div
              className={`min-w-40 h-fit py-2 text-lg font-bold rounded-lg cursor-pointer ${
                activeTab === "Withdrawal"
                  ? "bg-[#4BAF2A] text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => setActiveTab("Withdrawal")}
            >
              Withdrawal
            </div>
          </div>

          <div
            className={`${
              activeTab.toLowerCase() === "sell"
                ? "md:absolute top-4 right-4 md:text-right md:flex gap-2 text-center pt-2 pr-3"
                : "text-center mb-2"
            }`}
          >
            <div className="text-white text-xl md:text-xl font-semibold">
              Available{" "}
              {activeTab.toLowerCase() === "sell" ? "Balance:" : "Fund"}
            </div>

            <div
              className={`${
                activeTab.toLowerCase() === "sell"
                  ? "md:text-white text-white/50 text-xl md:text-lg font-semibold"
                  : "text-white/50 text-xl "
              }`}
            >
              {availableBalance}
            </div>
          </div>

          {activeTab.toLowerCase() === "sell" ? (
            <SellScreen
              assets={assets}
              currencyList={currencyList}
              setAvailableBalance={setAvailableBalance}
            />
          ) : (
            <WithdrawalScreen setAvailableBalance={setAvailableBalance} />
          )}
        </div>
      </div>
    </Background>
  );
};

export default TradingScreen;
