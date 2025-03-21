import React, { useContext, useEffect, useState } from "react";

import SellScreen from "./Sell-Withdraw/SellScreen";
import WithdrawalScreen from "./Sell-Withdraw/WithdrawalScreen";
import {
  getAssets,
  getAvailableBalace,
  getAvailableFunds,
  getCurrencyList,
} from "../../services/fundsAPI/tradingScreenAPI";
import { useLocation } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import BackToHomeButton from "../common/BackToHomeButton";

const DISPLAY_ORDER = ["BTC", "YTP", "BNB", "USDT"];

function sortAssets(assets) {
  return assets.sort(
    (a, b) => DISPLAY_ORDER.indexOf(a.symbol) - DISPLAY_ORDER.indexOf(b.symbol)
  );
}

const TradingScreen = () => {
  const { setIsLoading } = useContext(GlobalContext);

  const [activeTab, setActiveTab] = useState("Sell");
  const [availableBalance, setAvailableBalance] = useState("0.00 INR");
  const [assets, setAssets] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const location = useLocation();

  useEffect(() => {

    async function init() {
      setIsLoading(true);
      try {

        let funds;
        if (activeTab.toLowerCase() === "sell") {
          funds = await getAvailableBalace();
          setAvailableBalance(funds.data.balance);
        } else {
          funds = await getAvailableFunds();
          setAvailableBalance(funds.inr_balance);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    init();
  }, [location.state, activeTab, setIsLoading]);

  useEffect(() => {

    const { tab } = location.state || {};
    if (tab) {
      const t = tab.toLowerCase();
      setActiveTab(
        t === "sell" ? "Sell" : t === "withdraw" ? "Withdrawal" : "Sell"
      );
    }

    const init = async () => {
      setIsLoading(true)
      try {
        const [assetsData, currency] = await Promise.all([
          getAssets(),
          getCurrencyList(),
        ]);

        const sortedAssets = sortAssets(assetsData.data);
        setAssets(sortedAssets);
        setCurrencyList(currency.data);
      } catch (error) {
        console.log(error);
      }
      finally{
        setIsLoading(false)
      }
    };
    init()
  }, []);

  return (
    <div className="min-h-screen text-white p-4 relative">
      <div className="absolute top-8 left-10">
        <BackToHomeButton />
      </div>
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
            Available {activeTab.toLowerCase() === "sell" ? "Balance:" : "Fund"}
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
  );
};

export default TradingScreen;
