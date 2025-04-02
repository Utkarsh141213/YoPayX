import React, { useState, useEffect, useContext } from "react";
import TransactionHistory from "./TransactionHistory";
import {
  getTransactionHistory,
  withdrawFunds,
  getAvailableFunds,
} from "../../../services/fundsAPI/tradingScreenAPI";
import { toast } from "react-toastify";
import Loader from "../../common/Loader";
import { GlobalContext } from "../../../context/GlobalContext";

const WithdrawalScreen = ({ setAvailableBalance }) => {
  const { setIsLoading } = useContext(GlobalContext);

  const [amount, setAmount] = useState("");
  const [youWillGet, setYouWillGet] = useState("0.00");
  const [platformFee, setPlatformFee] = useState("0.5");
  const [transactions, setTransactions] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const transactionList = await getTransactionHistory();
        if (transactionList.data) {
          setTransactions(transactionList.data);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
        console.log(error);
      }
    })();
  }, []);

  // Calculate the net amount and platform fee for withdrawal
  const calculateWithdrawalAmount = (value) => {
    if (!value || isNaN(parseFloat(value))) {
      setYouWillGet("0.00");
      setPlatformFee("0.00");
      return;
    }
    const amountValue = parseFloat(value);
    const feePercentage = 0.5; // 0.5%
    const fee = ((amountValue * feePercentage) / 100).toFixed(2);
    const net = (amountValue - parseFloat(fee)).toFixed(2);
    setYouWillGet(net);
    setPlatformFee(fee);
  };

  const handleAmountChange = (e) => {
    const newValue = e.target.value;
    setAmount(newValue);
    calculateWithdrawalAmount(newValue);
  };

  const handleWithdraw = async () => {
    if (!amount || isNaN(parseFloat(amount))) {
      toast.error("Please enter a valid amount");
      return;
    }
    try {
      setIsLoading(true);
      await withdrawFunds({
        withdraw_request_amount: parseFloat(amount),
        fiat: "INR",
      });
      toast.success("Withdrawal successful");

      // Refetch available balance
      const fundsResult = await getAvailableFunds();
      if (fundsResult.data) {
        setAvailableBalance(fundsResult.data.inr_balance);
      }

      // Refetch transaction history
      const transactionList = await getTransactionHistory();
      if (transactionList.data) {
        setTransactions(transactionList.data);
      }

      setAmount("");
      setYouWillGet("0.00");
      setPlatformFee("0.00");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
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

      {/* You Will Get Section */}
      <div className="mb-2">
        <label className="block mb-2 text-white text-left text-2xl font-semibold">
          You will get INR
        </label>
        <input
          type="text"
          className="w-full bg-white text-black rounded-lg p-3 mb-1"
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
        <div
          onClick={handleWithdraw}
          className="w-full h-14 bg-[#4BAF2A] rounded-lg  relative flex items-center justify-center select-none cursor-pointer"
        >
          Withdraw
        </div>
      </div>

      <h2 className="text-white text-lg font-semibold mb-4">
        Withdrawal Transaction History
      </h2>
      {transactions ? (
        <TransactionHistory transactions={transactions} />
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default WithdrawalScreen;
