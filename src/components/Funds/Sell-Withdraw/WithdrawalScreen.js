import React, { useState, useEffect } from "react";
import { LiaAngleDownSolid } from "react-icons/lia";
import Swip from "./Swip";
import TransactionHistory from "./TransactionHistory";

const WithdrawalScreen = ({ assets }) => {
  const [amount, setAmount] = useState("");
  const [selectedAsset, setSelectedAsset] = useState("");
  const [youWillGet, setYouWillGet] = useState();
  const [platformFee, setPlatformFee] = useState("0.00");
  const [isCoinDisplayed, setIsCoinDisplayed] = useState(true);

  const walletData = [
    { type: "Available", amount: 1.0 },
    { type: "Locked", amount: 1.0 },
    { type: "Total", amount: 1.0 },
  ];

  useEffect(() => {
    calculateWithdrawalAmount();
  }, [amount, selectedAsset]);

  const calculateWithdrawalAmount = () => {
    if (!amount || isNaN(parseFloat(amount))) {
      setYouWillGet("0.00");
      setPlatformFee("0.00");
      return;
    }

    const amountValue = parseFloat(amount);
    const feePercentage = 0.5; // 0.5%
    const fee = ((amountValue * feePercentage) / 100).toFixed(2);
    const net = (amountValue - parseFloat(fee)).toFixed(2);

    setYouWillGet(net);
    setPlatformFee(fee);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  return (
    <div className="p-4 pb-0 rounded-lg md:w-[600px]">
      {/* Amount Input */}
      <div className="mb-3">
        <input
          type="number"
          className="w-full bg-white text-black rounded-lg p-3"
          placeholder="Amount to withdraw"
          value={amount}
          onChange={handleAmountChange}
        />
      </div>

      {/* Asset Selection */}
      <div className="mb-4 relative">
        <select
          className="w-full bg-white text-black rounded-lg p-3  appearance-none"
          value={selectedAsset}
          onChange={(e) => setSelectedAsset(e.target.value)}
        >
          <option value="">Choose assets</option>
          {assets.map((asset) => (
            <option key={asset.id} value={asset.symbol}>
              {asset.name}
            </option>
          ))}
        </select>
        <LiaAngleDownSolid className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black" />
      </div>

      {/* You Will Get Section */}
      <div className="mb-2 ">
        <label className="block mb-2 text-white text-left text-2xl font-semibold">
          You will get INR
        </label>
        <input
          type="text"
          className="w-full bg-white text-black rounded-lg p-3  mb-1"
          placeholder="0.00"
          value={youWillGet}
          readOnly
        />
        <div className="bg-[#A8A8A8] text-black text-sm rounded-xl py-1 px-3 flex justify-between items-center">
          <span>Platform Fee</span>
          <span>0.5% = {platformFee} INR</span>
        </div>
      </div>

      <div className="px-5 my-4">
        <Swip text={"withdraw"} handleFun={() => {}} />
      </div>

      {/* Coin and Reward Section */}
      <div className="my-6">
        <div className="flex justify-center gap-10 mb-6 text-lg">
          <span
            onClick={() => setIsCoinDisplayed(true)}
            className={`text-green-500 font-medium cursor-pointer ${
              isCoinDisplayed ? "text-green-500" : "text-white"
            }`}
          >
            Coin
          </span>
          <span
            onClick={() => setIsCoinDisplayed(false)}
            className={`font-medium  cursor-pointer ${
              isCoinDisplayed ? "text-white" : "text-green-500"
            }`}
          >
            Reward
          </span>
        </div>

        <div className="w-full">
          {walletData.map((item, index) => (
            <div
              key={index}
              className="bg-white text-black rounded-lg mb-2 flex items-center"
            >
              <div className="bg-[#4BAF2A] text-white py-[10px] px-[10px] rounded-lg text-sm text-center">
                YTP
              </div>
              <div className="flex-1 px-4 py-2 text-left text-black/60">
                {item.type}
              </div>
              <div className="px-4 py-2 font-medium text-black/60">
                {item.amount.toFixed(2)} YTP
              </div>
            </div>
          ))}
        </div>
      </div>

      <h2 className="text-white text-lg font-semibold mb-4">
        Withdrawal Transaction History
      </h2>
      <TransactionHistory />
    </div>
  );
};

export default WithdrawalScreen;
