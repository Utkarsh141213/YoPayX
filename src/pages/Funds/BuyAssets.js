import React, { useState, useEffect } from "react";
import Background from "../../components/Background";
import yatripayLogo from "../../assets/yatripay_logo.svg";
import Button from "../../components/Button";
import {
  getAssets,
  getAvailableBalace,
  getCurrencyList,
} from "../../services/fundsAPI/tradingScreenAPI";
import { buyAssets } from "../../services/fundsAPI/fundsAPI";
import { toast } from "react-toastify";

const Badge = ({ badge }) => (
  <div className="border border-white text-white/60 rounded-xl px-2 py-1 text-[0.5rem] font-extralight">
    {badge}
  </div>
);

const BuyAssets = () => {
  const [assets, setAssets] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState("");
  const [exchangeRate, setExchangeRate] = useState(0);

  // amountYTP: Coin amount the user wants to receive (editable)
  // amountINR: INR cost calculated (disabled)
  const [amountYTP, setAmountYTP] = useState("");
  const [amountINR, setAmountINR] = useState("");

  const [availableBalance, setAvailableBalance] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("Express");

  useEffect(() => {
    (async () => {
      try {
        const result = await getAssets();
        if (result) {
          console.log(result.data);
          setAssets(result.data);
        }
        const currency = await getCurrencyList();
        if (currency) {
          setCurrencyList(currency.data);
        }
      } catch (error) {
        console.log("ERROR", error);
      }
      const balance = await getAvailableBalace();
      if (balance) {
        setAvailableBalance(balance.data.balance);
      }
    })();
  }, []);

  useEffect(() => {
    if (!selectedAsset || assets.length === 0 || currencyList.length === 0) {
      setExchangeRate(0);
      return;
    }

    const assetObj = assets.find((a) => a.symbol === selectedAsset);
    if (!assetObj) {
      setExchangeRate(0);
      return;
    }

    const inrObj = currencyList.find((c) => c.symbol === "INR");
    if (!inrObj) {
      setExchangeRate(0);
      return;
    }

    const usdToInr = parseFloat(inrObj.price_usd);
    const assetUsd = parseFloat(assetObj.price_usd);
    const finalRate = assetUsd * usdToInr;
    setExchangeRate(finalRate);
  }, [selectedAsset, assets, currencyList]);

  const handleAssetChange = (symbol) => {
    setSelectedAsset(symbol);
    // Reset amounts when asset changes
    calculateAmounts("", true);
  };

  /**
   * Conversion Logic:
   * - When the user enters the YTP amount (first input):
   *     INR cost = YTP × exchangeRate × 1.01
   * - When the user enters an INR amount (if ever enabled):
   *     YTP = INR ÷ (exchangeRate × 1.01)
   */
  const calculateAmounts = (value, isFirstInput) => {
    if (isFirstInput) {
      // User enters YTP amount
      setAmountYTP(value);
      if (value && exchangeRate > 0) {
        const cost = parseFloat(value) * exchangeRate * 1.01;
        setAmountINR(cost.toFixed(2));
      } else {
        setAmountINR("");
      }
    } else {
      // User enters INR amount (this branch is not active since the INR field is disabled)
      setAmountINR(value);
      if (value && exchangeRate > 0) {
        const coinAmount = parseFloat(value) / (exchangeRate * 1.01);
        setAmountYTP(coinAmount.toFixed(8));
      } else {
        setAmountYTP("");
      }
    }
  };

  // Final "Buy" action
  const handleBuy = async () => {
    if (!selectedAsset || !amountYTP || !amountINR) {
      alert("Please fill all fields");
      return;
    }
    try {
      const response = await buyAssets({
        buy_amount: parseInt(amountYTP),
        fiat: "INR",
      });
      console.log("succ");
      console.log(response);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      console.log(error);
    }
  };

  return (
    <Background>
      <div className="text-white p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-6 py-2 px-6">
          <div className="flex items-center">
            <div className="text-yellow-300 text-2xl font-bold">
              <img src={yatripayLogo} alt="yatripay logo" />
            </div>
          </div>
          <div className="text-white text-sm md:text-2xl font-bold">
            Available Balance : {availableBalance || "0.00"}
          </div>
        </header>

        <h2 className="text-2xl font-bold text-center mb-6">Buy Assets</h2>

        <div className="space-y-6 max-w-xl mx-auto">
          {/* Choose Assets */}
          <div>
            <label className="block mb-1 text-left text-2xl font-bold">
              Choose assets
            </label>
            <div className="relative">
              <select
                className="w-full bg-white text-black rounded-lg p-[11px] px-4 appearance-none"
                value={selectedAsset}
                onChange={(e) => handleAssetChange(e.target.value)}
              >
                <option value="">XX</option>
                {assets.map((asset) => (
                  <option key={asset.id} value={asset.symbol}>
                    {asset.symbol}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-wrap gap-2 mb-4 mt-3">
              {assets.map((asset) => (
                <div
                  key={asset.id}
                  className="cursor-pointer"
                  onClick={() => handleAssetChange(asset.symbol)}
                >
                  <Badge badge={asset.symbol} />
                </div>
              ))}
            </div>
          </div>

          {/* YTP Amount Input */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block mb-1 text-left text-2xl font-bold">
                Amount YTP
              </label>
              <span className="text-sm text-gray-400">
                {selectedAsset
                  ? `${selectedAsset} = ${exchangeRate.toFixed(4)} INR`
                  : "XXX = XXX INR"}
              </span>
            </div>
            <input
              type="number"
              className="w-full bg-white text-black rounded-lg p-[12px] px-4"
              placeholder="0.00"
              value={amountYTP}
              onChange={(e) => calculateAmounts(e.target.value, true)}
            />
          </div>

          {/* INR Amount Display */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block mb-1 text-left text-2xl font-bold">
                Amount INR
              </label>
              <span className="text-sm text-gray-400">
                {selectedAsset
                  ? `${selectedAsset} = ${exchangeRate.toFixed(4)} INR`
                  : "XXX = XXX INR"}
              </span>
            </div>
            <input
              type="number"
              className="w-full bg-white text-black rounded-lg p-[12px] px-4"
              placeholder="0.00"
              value={amountINR}
              disabled
              onChange={(e) => calculateAmounts(e.target.value, false)}
            />

            {/* Payment Method + TDS Info */}
            <div className="flex justify-between items-center mt-3 mb-10">
              <div className="text-white/60 text-xl">TDS = 1%</div>
            </div>
          </div>

          {/* Buy Button */}
          <div className="flex justify-center">
            <Button
              handleFun={handleBuy}
              text={`Buy ${selectedAsset || "XXX"}`}
            />
          </div>
        </div>
      </div>
    </Background>
  );
};

export default BuyAssets;
