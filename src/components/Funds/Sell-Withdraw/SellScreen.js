import React, { useState, useEffect } from "react";
import { LiaAngleDownSolid } from "react-icons/lia";
import TransactionHistory from "./TransactionHistory";
import {
  getAvailableBalace,
  getTransactionHistory,
  sellAsset,
} from "../../../services/fundsAPI/tradingScreenAPI";
import { toast } from "react-toastify";

const Badge = ({ badge }) => (
  <div className="border border-white text-white/60 rounded-xl px-2 py-1 text-xs font-extralight">
    {badge}
  </div>
);

/**
 * SellScreen Component
 * @param {Array} assets - Array of asset objects (e.g., [{id, symbol, price_usd}, ...])
 * @param {Array} currencyList - Array of currency objects (e.g., [{id, symbol, price_usd}, ...])
 */
const SellScreen = ({ assets, currencyList, setAvailableBalance }) => {
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [amount, setAmount] = useState("");
  // "youWillGet" now reflects the INR amount received after deducting 1% TDS on coins
  const [youWillGet, setYouWillGet] = useState("0.00");
  const [exchangeRate, setExchangeRate] = useState(0); // 1 coin => X INR
  const [transactions, setTransactions] = useState([]);

  // 1) Whenever user picks an asset, compute its INR rate from currencyList
  useEffect(() => {
    if (!selectedAsset || !assets.length || !currencyList.length) {
      setExchangeRate(0);
      return;
    }

    // Find the chosen asset
    const assetObj = assets.find((a) => a.symbol === selectedAsset);
    if (!assetObj) {
      setExchangeRate(0);
      return;
    }

    // Find the INR object
    const inrObj = currencyList.find((c) => c.symbol === "INR");
    if (!inrObj) {
      setExchangeRate(0);
      return;
    }

    // Calculate final rate: asset's price in USD * USD→INR
    const usdToInr = parseFloat(inrObj.price_usd); // e.g. 82
    const assetUsd = parseFloat(assetObj.price_usd);
    const finalRate = usdToInr * assetUsd; // 1 coin => finalRate INR

    setExchangeRate(finalRate);
  }, [selectedAsset, assets, currencyList]);

  // 2) User enters coin amount => we calculate "You will get" in INR (after 1% TDS deduction)
  const handleAmountChange = (e) => {
    const val = e.target.value;
    setAmount(val);

    if (val && exchangeRate > 0) {
      // Deduct 1% TDS on the coin amount: only 99% of the coin amount is converted
      const totalInr = parseFloat(val) * exchangeRate * 0.99;
      setYouWillGet(totalInr.toFixed(2));
    } else {
      setYouWillGet("0.00");
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const result = await getTransactionHistory();
        if (result.data) {
          setTransactions(result.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // 3) User selects an asset from the dropdown or badges
  const handleAssetSelect = (value) => {
    setSelectedAsset(value);
    setAmount("");
    setYouWillGet("0.00");
  };

  // 4) Final Sell Action
  const handleSell = async () => {
    if (!selectedAsset || !amount || !youWillGet) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      const result = await sellAsset({
        fiat_currency: "INR", // Adjust if your API needs a different currency
        ytp_amount: parseInt(amount),
        coin_symbol: selectedAsset,
      });
      console.log("Sell successful:", result);
      toast.success("Sell successful");
      setSelectedAsset(null)
      setAmount(null)
      setYouWillGet(null)
      const balanceResult = await getAvailableBalace();
      if (balanceResult && balanceResult.data) {
        setAvailableBalance(balanceResult.data.balance);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  return (
    <div className="p-4 pb-0 rounded-lg md:w-[600px]">
      <div className="relative mb-4">
        <label className="text-left w-full text-xl mb-2 font-bold">
          Choose Assets
        </label>
        <select
          className={`w-full bg-white  p-3 rounded-lg appearance-none outline-none
            ${selectedAsset ? "text-black" : "text-black/50"}
            `}
          name="select_option"
          value={selectedAsset}
          onChange={(e) => handleAssetSelect(e.target.value)}
        >
          <option value="" hidden>
            xx
          </option>
          {assets.map((asset) => (
            <option key={asset.id} value={asset.symbol}>
              {asset.symbol}
            </option>
          ))}
        </select>
        <LiaAngleDownSolid className="absolute right-5 top-14 text-black" />

        <div className="flex gap-2 mt-2">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className="cursor-pointer"
              onClick={() => handleAssetSelect(asset.symbol)}
            >
              <Badge badge={asset.symbol} />
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        {/* User enters coin amount here */}
        <div>
          <label className="text-white text-lg font-bold block mb-2 w-full text-left">
            {selectedAsset || "XXX"} Amount
          </label>
          <input
            type="number"
            className="w-full text-black p-3 rounded-lg outline-none"
            value={amount}
            onChange={handleAmountChange}
            placeholder="0.00"
          />
        </div>

        {/* "You will get" in INR (disabled) */}
        <div>
          <label className="text-white text-lg font-bold block mb-2 w-full text-left">
            {selectedAsset || "XXX"} / INR
          </label>
          <input
            type="text"
            className="w-full bg-white text-black p-3 rounded-lg outline-none"
            value={youWillGet}
            disabled
            placeholder="0.00"
          />
        </div>
      </div>

      {/* Swipe button to sell */}
      <div className="px-5 my-4">
        <div
          onClick={handleSell}
          className="w-full h-14 bg-[#4BAF2A] rounded-lg  relative flex items-center justify-center select-none cursor-pointer"
        >
          Sell
        </div>
      </div>

      {/* Transaction history */}
      <h2 className="text-white text-lg font-semibold mb-4">
        Transaction History
      </h2>
      <TransactionHistory transactions={transactions} />
    </div>
  );
};

export default SellScreen;
