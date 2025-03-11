import React, { useState, useEffect } from "react";
import Background from "../Background";
import logo from "../../assets/yatri-pay-logo-main.png";
import { useLocation, useNavigate } from "react-router-dom";
import { getCoinValueInCurrency, sendYTP } from "../../services/fundsAPI/fundsAPI";
import { toast } from "react-toastify";
import TransactionPin from "../KYC/TransactionPin";

const TransferAmountScreen = () => {
  const location = useLocation();
  const { balance = "0.00", selectedAsset = "YTP" } = location.state || {};
  const navigate = useNavigate();

  const [receiverAddress, setReceiverAddress] = useState("");
  const [ytpAmount, setYtpAmount] = useState("");
  const [inrAmount, setInrAmount] = useState("");
  const [assetPriceINR, setAssetPriceINR] = useState(0);
  const [showTransactionPin, setShowTransactionPin] = useState(false);

  useEffect(() => {
    if (selectedAsset) {
      fetchCoinValue(selectedAsset);
    }
  }, [selectedAsset]);

  const fetchCoinValue = async (assetSymbol) => {
    try {
      const res = await getCoinValueInCurrency(assetSymbol);
      if (res && res.data?.INR) {
        setAssetPriceINR(parseFloat(res.data.INR));
      }
    } catch (error) {
      console.error("Error fetching coin value:", error);
    }
  };

  const handleYtpChange = (e) => {
    const newYtpValue = e.target.value;
    setYtpAmount(newYtpValue);
    if (assetPriceINR > 0 && newYtpValue) {
      const inrValue = parseFloat(newYtpValue) * assetPriceINR;
      setInrAmount(inrValue.toFixed(2));
    } else {
      setInrAmount("");
    }
  };

  // When Transfer is clicked, render the TransactionPin component
  const handleTransfer = () => {
    setShowTransactionPin(true);
  };

  const handlePinSubmit = async (pin) => {
    try {
      const response = await sendYTP({
        pin,
        amount: ytpAmount,
        ticker: selectedAsset,
        address: receiverAddress,
      });
      console.log(response);
      if (response.data?.success) {
        toast.success(response.data.message || "Transaction successful!");
        setShowTransactionPin(false);
        navigate("/dashboard2");
      } else {
        toast.error(response.data?.message || "Transaction failed!");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || err.message);
    }
  };

  // Conditionally render either the transfer form or the TransactionPin screen
  if (showTransactionPin) {
    return (
      <TransactionPin 
        onSubmitPin={handlePinSubmit} 
        onCancel={() => setShowTransactionPin(false)}
      />
    );
  }

  return (
    <Background>
      <div className="bg-black min-h-screen flex justify-center items-center">
        <div className="container bg-black p-5 w-full max-w-2xl">
          {/* Header Section */}
          <div className="header text-center mb-5">
            <div className="header-logo mb-3">
              <img
                src={logo}
                alt="YatriPay Logo"
                className="max-w-[150px] h-auto mx-auto"
              />
            </div>
            <div className="text-white text-2xl font-semibold">
              Available Balance : {balance} INR
            </div>
          </div>

          {/* Form Section */}
          <div className="space-y-5">
            {/* Receiving Address */}
            <div className="rounded-lg overflow-hidden bg-white">
              <input
                type="text"
                id="receivingAddress"
                placeholder="Receiving Address"
                value={receiverAddress}
                onChange={(e) => setReceiverAddress(e.target.value)}
                className="border-none px-4 py-[17px] flex-grow text-gray-700 focus:outline-none w-full"
              />
            </div>

            {/* YTP Amount */}
            <div className="flex rounded-lg overflow-hidden bg-white">
              <input
                type="number"
                id="ytpAmount"
                placeholder="YTP Amount"
                value={ytpAmount}
                onChange={handleYtpChange}
                className="border-none px-4 py-3 flex-grow text-gray-700 focus:outline-none text-sm"
              />
              <div className="bg-[#4BAF2A] text-white px-4 py-3 font-semibold">
                {selectedAsset || "YTP"}
              </div>
            </div>

            {/* INR Amount (Disabled) */}
            <div className="flex rounded-lg overflow-hidden bg-white">
              <input
                type="text"
                id="inrAmount"
                placeholder="INR Amount"
                value={inrAmount}
                disabled
                className="border-none px-4 py-3 flex-grow text-gray-700 focus:outline-none text-sm"
              />
              <div className="unit bg-[#4BAF2A] text-white px-4 py-3 font-semibold">
                INR
              </div>
            </div>

            {/* Transfer Button */}
            <div
              onClick={handleTransfer}
              className="transfer-button bg-[#4BAF2A] text-white py-3 px-5 rounded-lg w-full shadow-md transition-colors duration-200 cursor-pointer text-center"
            >
              Transfer
            </div>
          </div>
        </div>
      </div>
    </Background>
  );
};

export default TransferAmountScreen;
