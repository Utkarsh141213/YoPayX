import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaRegCopy } from "react-icons/fa";
import { getWalletDetails } from "../../services/fundsAPI/walletAPI";
import BackToHomeButton from "../../components/common/BackToHomeButton";

const Wallet = () => {
  const [wallet, setWallet] = useState(null);
  const [selectedAsset, setSelectedAsset] = useState("YTP");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const res = await getWalletDetails(selectedAsset);
        if (res?.data) {
          setWallet(res.data);
        } else {
          setWallet(null);
        }
      } catch (error) {
        toast.error("Failed to fetch wallet details");
        setWallet(null);
      }
    };
    fetchWallet();
  }, [selectedAsset]);

  const handleCopy = () => {
    if (!wallet?.address) return;
    navigator.clipboard.writeText(wallet.address);
    toast.success("Address copied to clipboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white p-6">
      <div className="absolute top-4 left-4 md:top-8 md:left-10">
        <BackToHomeButton />
      </div>
      <div className="border shadow-lg p-6 rounded-lg w-full max-w-md sm:max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Wallet Details</h2>

        {/* Responsive row for selecting asset */}
        <div className="mb-4 flex flex-col sm:flex-row items-center justify-center gap-2">
          <label className="font-semibold">Select Asset:</label>
          <select
            value={selectedAsset}
            onChange={(e) => setSelectedAsset(e.target.value)}
            className="text-black px-2 py-1 rounded w-full sm:w-auto "
          >
            {/* <option value="BTC">BTC</option> */}
            <option value="BNB">BNB</option>
            <option value="YTP">YTP</option>
            <option value="USDT">USDT</option>
          </select>
        </div>

        {!wallet ? (
          <div className="text-center text-red-500 text-lg">
            Create a wallet.
          </div>
        ) : (
          <div>
            <div className="space-y-3">
              <p>
                <span className="font-semibold">Coin:</span> {wallet.coin.name}{" "}
                ({wallet.coin.ticker})
              </p>
              <p>
                <span className="font-semibold">Balance:</span> {wallet.balance}{" "}
                {wallet.coin.ticker}
              </p>
              {/* Address with line-break fix */}
              <div className="my-4">
                <div
                  className="p-2 rounded"
                  style={{
                    border: "2px solid",
                  }}
                >
                  <span className="break-all">{wallet.address}</span>
                </div>
                <div
                  onClick={handleCopy}
                  className=" w-fit mx-auto cursor-pointer mt-3"
                >
                  Copy Address <FaRegCopy className="cursor-pointer " />
                </div>
              </div>
              <div className="flex justify-center">
                <img
                  src={`data:image/png;base64,${wallet.qr_code}`}
                  alt="QR Code"
                  className="w-40 h-40 border border-gray-600 rounded-lg"
                />
              </div>
            </div>

            <div
              onClick={() =>
                navigate("/transfer-fund", {
                  state: { balance: wallet.balance },
                })
              }
              className="mt-6 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-center cursor-pointer"
            >
              Transfer Fund
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wallet;
