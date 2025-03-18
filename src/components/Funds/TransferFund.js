import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

// API services
import { getWalletDetails } from "../../services/fundsAPI/transferAPI";
import {
  getAssets,
} from "../../services/fundsAPI/tradingScreenAPI";
import { useNavigate } from "react-router-dom";

const TransferFund = () => {
  const [isSend, setIsSend] = useState(false);
  const [QR, setQR] = useState("");
  const [balance, setBalance] = useState("0.00");
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {

        const walletRes = await getWalletDetails();
        if (walletRes && walletRes.data) {
          setQR(walletRes.data.qr_code);
          setBalance(walletRes.data.balance)
        }

        const assetsRes = await getAssets();
        if (assetsRes && assetsRes.data) {
          setAssets(assetsRes.data);
        }
      } catch (error) {
        console.error(error);
        toast.error("Error in fetching wallet details or balance/assets");
      }
    })();
  }, []);

  const handleSubmit = () => {
    if (!selectedAsset){
      toast.error('Choose an asset first')
      return 
    }
      navigate("/transfer-amount-screen", {
        state: { balance, selectedAsset },
      });
  };

  const handleAssetChange = (e) => {
    setSelectedAsset(e.target.value);
  };

  return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-4 sm:min-w-[40vw]">
          {/* Header Section */}
          <div className="flex justify-center space-x-4 mb-4">
            <div
              onClick={() => setIsSend(false)}
              className={`${
                isSend ? "bg-white text-black" : "bg-[#4BAF2A] text-white"
              }  w-32 px-4 py-2 text-lg rounded flex items-center justify-center font-semibold cursor-pointer`}
            >
              Receive
            </div>
            <div
              onClick={() => setIsSend(true)}
              className={`${
                isSend ? "bg-[#4BAF2A] text-white" : "bg-white text-black"
              }  w-32 px-4  py-2 text-lg rounded flex items-center justify-center font-semibold cursor-pointer`}
            >
              Send
            </div>
          </div>

          <div className="text-white text-center mb-4">
            <p className="text-xl font-semibold">
              Available Balance : {balance} INR
            </p>
          </div>

          {/* Middle Section */}
          {/* {!isSend && ( */}
          <div className="flex flex-col items-center mb-4">
            {/* Display the QR code */}
            {QR ? (
              <img
                src={`data:image/png;base64,${QR}`}
                alt="QR Code"
                style={{ width: "200px", height: "200px" }}
              />
            ) : (
              <div className="w-40 h-40 bg-gray-300 border border-gray-400" />
            )}
            <p className="text-white text-sm mt-2">Scan QR</p>
          </div>
          {/* )} */}

          {/* Form Section */}
          <div className="space-y-4 mb-4">
            <div>
              <select
                value={selectedAsset}
                onChange={handleAssetChange}
                className={`w-full bg-white  p-3 rounded-lg appearance-none outline-none
            ${selectedAsset ? "text-black" : "text-black/50"} `}
              >
                <option value="" disabled selected>
                  Choose assets
                </option>
                {assets.map((asset) => (
                  <option key={asset.id} value={asset.symbol}>
                    {asset.symbol}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-white text-sm mb-1 block text-left">
                YTP Address
              </label>
              <input
                type="text"
                placeholder="XXX"
                className="w-full bg-white text-black p-3 rounded border border-gray-300 px-3"
              />
            </div>
          </div>

          {/* Footer Section */}
          <div
            onClick={handleSubmit}
            className="w-full text-lg bg-[#4BAF2A] py-3 text-white rounded font-bold cursor-pointer"
          >
            Transfer
          </div>
        </div>
      </div>
  );
};

export default TransferFund;
