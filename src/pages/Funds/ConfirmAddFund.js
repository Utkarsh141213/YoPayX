import React, { useContext, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputField from "../../components/KYC/InputField";
import { RxCross2 } from "react-icons/rx";
import { confirmAddFundService } from "../../services/fundsAPI/fundsAPI";
import { GlobalContext } from "../../context/GlobalContext";

const ConfirmAddFund = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setIsLoading } = useContext(GlobalContext);

  const { qr_code, upi_id, amount } = location.state || {};

  // If there's no QR or UPI data, redirect
  if (!qr_code || !upi_id) {
    navigate("/");
  }

  // Local component state
  const [transactionId, setTransactionId] = useState("");
  const [screenshot, setScreenshot] = useState(null);

  // Ref to the file input
  const govIdInputRef = useRef(null);

  // Handle file selection
  const handleGovtIdChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setScreenshot(e.target.files[0]);
    }
  };

  // Handle final submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!transactionId) {
      toast.error("Please provide a Transaction ID");
      return;
    }
    if (!screenshot) {
      toast.error("Please attach a screenshot of the transaction");
      return;
    }

    const formData = new FormData();
    formData.append("amount", amount); 
    formData.append("transaction_id", transactionId);
    formData.append("fiat", "INR"); 
    formData.append("screen_shot", screenshot);

    try {
      setIsLoading(true)
      await confirmAddFundService(formData);
      toast.success("Funds added successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      console.log(error);
    }finally{
      setIsLoading(false)
    }
  };

  return (
      <div className="min-h-screen">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center w-[80vw] sm:w-[40vw] mx-auto min-h-screen"
        >
          <div className="space-y-8 mb-4 flex flex-col items-center">
            <h1 className="text-3xl font-bold">Complete Transaction</h1>

            {/* Placeholder for QR code display */}
            <div className="h-32 w-32 bg-white/70"></div>
            <p className="text-center text-sm text-white/50">QR Code</p>
            {/* UPI ID Display */}
            <p className="text-center text-sm text-white">UPI ID: {upi_id}</p>
          </div>

          <div className="text-left w-full">
            <label htmlFor="transactionId" className="text-white/50 text-sm mb-2">
              Transaction ID
            </label>
            <InputField
              name="transactionId"
              placeholder="Enter Transaction ID"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
            />

            {/* Screenshot of transaction */}
            <div className="flex mb-4 bg-white py-1 rounded gap-2">
              <input
                type="file"
                accept="image/*"
                ref={govIdInputRef}
                onChange={handleGovtIdChange}
                required
                hidden
                className="w-full p-3 rounded focus:outline-none"
              />
              {screenshot ? (
                <div className="flex items-center gap-2 w-full p-2 text-xs rounded text-black/50 text-left whitespace-nowrap truncate cursor-pointer">
                  <span className="whitespace-nowrap truncate">
                    {screenshot.name}
                  </span>
                  <span
                    onClick={() => setScreenshot(null)}
                    className="text-black text-lg w-fit h-fit"
                  >
                    <RxCross2 />
                  </span>
                </div>
              ) : (
                <div
                  onClick={() => {
                    govIdInputRef.current && govIdInputRef.current.click();
                  }}
                  className="w-full p-3 text-xs rounded text-black/50 text-left whitespace-nowrap truncate cursor-pointer"
                >
                  Screenshot of transaction
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#4BAF2A] text-white my-3 w-fit px-12 py-4 text-lg font-bold flex items-center"
          >
            Submit
          </button>
        </form>
      </div>
  );
};

export default ConfirmAddFund;
