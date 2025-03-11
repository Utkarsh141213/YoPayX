import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getWalletDetails } from "../../services/fundsAPI/transferAPI";
import { toast } from "react-toastify";
import Background from "../../components/Background";

const Wallet = () => {
  const [wallet, setWallet] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const res = await getWalletDetails();
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
  }, []);

  return (
    <Background>
    <div className="min-h-screen flex items-center justify-center text-white p-6">
      <div className="border shadow-lg p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Wallet Details</h2>

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
              <p>
                <span className="font-semibold">Locked Balance:</span>{" "}
                {wallet.lock_balance}
              </p>
              <p>
                <span className="font-semibold">Address:</span> {wallet.address}
              </p>
              <p>
                <span className="font-semibold">Min. Limit:</span>{" "}
                {wallet.coin.min_limit}
              </p>
              <p>
                <span className="font-semibold">Staking ROI:</span>{" "}
                {wallet.staking_roi}%
              </p>

              <div className="flex justify-center">
                <img
                  src={`data:image/png;base64,${wallet.qr_code}`}
                  alt="QR Code"
                  className="w-40 h-40 border border-gray-600 rounded-lg"
                />
              </div>
            </div>
            <div
              onClick={() => navigate("/transfer-fund", { state : { balance: wallet.balance}})}
              className="mt-6 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-center cursor-pointer"
            >
              Transfer Fund
            </div>
          </div>
        )}
      </div>
    </div>
    </Background>
  );
};

export default Wallet;
