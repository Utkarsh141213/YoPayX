import React, { useState, useEffect, useContext } from "react";
import yatripayLogo from "../../assets/yatripay_logo.svg";
import Button from "../../components/Button";
import {
  getAssets,
  getAvailableFunds,
  getCurrencyList,
} from "../../services/fundsAPI/tradingScreenAPI";
import { buyAssets } from "../../services/fundsAPI/fundsAPI";
import { toast } from "react-toastify";
import { GlobalContext } from "../../context/GlobalContext";
import FAQ from "../../components/common/FAQ";

const Badge = ({ badge }) => (
  <div className="border border-white text-white/60 rounded-xl px-2 py-1 text-[0.5rem] font-extralight">
    {badge}
  </div>
);

const BuyAssets = () => {
  const [assets, setAssets] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState("YTP");
  const [exchangeRate, setExchangeRate] = useState(0);

  const [amountYTP, setAmountYTP] = useState("");
  const [amountINR, setAmountINR] = useState("");

  const [availableBalance, setAvailableBalance] = useState(null);
  // const [paymentMethod, setPaymentMethod] = useState("Express");

  const { setIsLoading } = useContext(GlobalContext);

  const DISPLAY_ORDER = ["BTC", "YTP", "BNB", "USDT"];

function sortAssets(assets) {
  return assets.sort(
    (a, b) => DISPLAY_ORDER.indexOf(a.symbol) - DISPLAY_ORDER.indexOf(b.symbol)
  );
}

useEffect(() => {
  (async () => {
    setIsLoading(true);
    try {
      // Fetch assets, currency, and balance in parallel
      const [assetsRes, currencyRes, balanceRes] = await Promise.all([
        getAssets(),
        getCurrencyList(),
        getAvailableFunds()
      ]);

      // Process assets
      if (assetsRes) {
        const sortedAssets = sortAssets(assetsRes.data);
        setAssets(sortedAssets);
      }

      // Process currency
      if (currencyRes) {
        setCurrencyList(currencyRes.data);
      }

      // Process balance
      if (balanceRes) {
        setAvailableBalance(balanceRes.data.balance);
      }
    } catch (error) {
      console.log("ERROR", error);
    } finally {
      setIsLoading(false);
    }
  })();
}, [setIsLoading]);


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
    calculateAmounts("", true);
  };

  const calculateAmounts = (value, isFirstInput) => {
    if (isFirstInput) {
      setAmountYTP(value);
      if (value && exchangeRate > 0) {
        const cost = parseFloat(value) * exchangeRate * 1.01;
        setAmountINR(cost.toFixed(2));
      } else {
        setAmountINR("");
      }
    } else {
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
      setIsLoading(true)
      await buyAssets({
        coin_amount: parseInt(amountYTP),
        fiat_currency: "INR",
        coin_symbol: selectedAsset,
      });
      toast.success("Transaction Successful");

      const funds = await getAvailableFunds();
      if (funds) {
        setAvailableBalance(funds.data.balance);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }finally{
      setIsLoading(false)
    }
  };

  return (
      <div className="text-white p-6">

        <header className="flex flex-col sm:flex-row items-center justify-between mb-6 py-2 px-6 gap-2 sm:gap-0">

          <div className="flex items-center justify-center sm:justify-start w-full sm:w-auto">
            <div className="text-yellow-300 text-2xl font-bold">
              <img src={yatripayLogo} alt="yatripay logo" />
            </div>
          </div>

          <div className="text-white text-base sm:text-lg md:text-2xl font-bold flex flex-col sm:flex-row items-center sm:gap-2">
            <div className="text-white text-xl md:text-xl font-semibold">
              Available Balance:
            </div>
            <div className="text-white/50 md:text-white text-xl ">
              {availableBalance} INR
            </div>
          </div>
        </header>

        <h2 className="text-2xl font-bold text-center mb-10">Buy Assets</h2>

        <div className="space-y-6 max-w-xl mx-auto">
          {/* Choose Assets */}
          <div>
            <label className="block mb-1 text-left text-xl font-bold">
              Choose assets
            </label>
            <div className="relative">
              <select
                className={`w-full bg-white text-black rounded-lg p-[11px] px-4 appearance-none`}
                value={selectedAsset}
                onChange={(e) => handleAssetChange(e.target.value)}
              >
                {assets.map((asset) => {
                  if (asset.symbol === "YTP") {
                    return (
                      <option key={asset.id} value={asset.symbol} selected>
                        {asset.symbol}
                      </option>
                    );
                  }
                  return (
                    <option key={asset.id} value={asset.symbol}>
                      {asset.symbol}
                    </option>
                  );
                })}
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
              <label className="block mb-1 text-left text-xl font-bold">
                Amount {selectedAsset || "YTP"}
              </label>
              <span className="text-sm text-gray-400">
                {selectedAsset
                  ? `${selectedAsset} = ${exchangeRate.toFixed(4)} INR`
                  : "0 = 0.00 INR"}
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
              <label className="block mb-1 text-left text-xl font-bold">
                Amount INR
              </label>
              <span className="text-sm text-gray-400">
                {selectedAsset
                  ? `${selectedAsset} = ${exchangeRate.toFixed(4)} INR`
                  : "0 = 0.00 INR"}
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
            <div className="flex justify-between items-center mt-3 mb-6">
              <div className="text-white/60 text-xl">TDS = 1%</div>
            </div>
          </div>

          {/* Buy Button */}
          <div className="flex justify-center">
            <Button handleFun={handleBuy} text={`Buy ${selectedAsset}`} />
          </div>
        </div>
        <FAQ code={'buy'} />
      </div>
  );
};

export default BuyAssets;
