import React, { useEffect, useState } from "react";
import TransactionHistory from "../../components/Funds/Sell-Withdraw/TransactionHistory";
import { getTransactionHistory } from "../../services/fundsAPI/tradingScreenAPI";
import { toast } from "react-toastify";
import Background from "../../components/Background";

const Transaction = () => {
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getTransactionHistory();
        if (res) {
          setTransaction(res.data);
        }
      } catch (error) {
        toast.error(error.response.data.message || error.message);
      }
    })();
  });

  return (
    <Background>
      <div className="px-8 md:px-[20vw] xl:px-[28vw] space-y-10 pt-10">
        <div className="flex justify-end">
          <div className="text-xl bg-[#4BAF2A] w-fit px-10 py-2 rounded-xl font-semibold">
            Filter
          </div>
        </div>
        <h1 className="text-4xl">Transaction History</h1>
        <TransactionHistory transactions={transaction} />
      </div>
    </Background>
  );
};

export default Transaction;
