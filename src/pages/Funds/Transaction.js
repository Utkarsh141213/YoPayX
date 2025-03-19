import React, { useEffect, useState } from "react";
import TransactionHistory from "../../components/Funds/Sell-Withdraw/TransactionHistory";
import { getTransactionHistoryWithFilters } from "../../services/fundsAPI/tradingScreenAPI";
import { toast } from "react-toastify";

const Transaction = () => {
  const [transaction, setTransaction] = useState([]);
  const [filter, setFilter] = useState('')

  useEffect(() => {
    (async () => {
      try {
        const res = await getTransactionHistoryWithFilters(['Withdraw']);
        console.log(res)
        if (res) {
          setTransaction(res.data);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message || error.message);
      }
    })();
  });

  return (
      <div className="px-8 md:px-[20vw] xl:px-[28vw] space-y-10 pt-10">
        <div className="flex justify-end">
          <select className={`text-xl text-white bg-[#4BAF2A] w-fit max-w-28 pl-7 py-2 rounded-xl font-semibold outline-none appearance-none
            ${filter ? '' : ''}
          `}
          value=""
          onChange={(e) => setFilter(e.target.value)}
          >
            <option value='' >Filter</option>
            <option value='a'>Buy YTP</option>
            <option value='b'>Sell YTP</option>
            <option value='c'>Staking Reward</option>
            <option value='d'>Referral Reward</option>
            <option value='e'>Staking Hike</option>
            <option value='f'>Staking Referral Reward</option>
          </select>
        </div>
        <h1 className="text-4xl">Transaction History</h1>
        <TransactionHistory transactions={transaction} />
      </div>
  );
};

export default Transaction;
