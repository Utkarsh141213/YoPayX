import React from "react";

const TransactionHistory = ({ transactions }) => {
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  return (
    <div className="">
      <div className="space-y-3">
        {transactions.map((transaction) => {
          const [rawDate] = transaction.created_at.split(" ");

          const [dayStr, monthStr] = rawDate.split("-");
          const dayNum = parseInt(dayStr, 10) || 1;
          const dayPadded = dayNum.toString().padStart(2, "0");

          const monthIndex = (parseInt(monthStr, 10) || 1) - 1;

          if (monthIndex < 0 || monthIndex > 11) {
            return null;
          }
          const monthAbbr = months[monthIndex];

          return (
            <div
              key={transaction.id}
              className="flex justify-between items-center bg-white rounded-lg"
            >
              <div className="flex w-full">
                <div className="text-white bg-[#4BAF2A] py-[10px]  px-[12px] rounded-lg flex flex-col">
                  <span className="text-lg font-bold leading-none h-fit ">
                    {dayPadded}
                  </span>

                  <span className="text-xs leading-none h-fit ">
                    {monthAbbr}
                  </span>
                </div>
                <div className="flex justify-between text-black/70 w-full px-3 items-center">
                  <div>
                    <div className="text-left">{transaction.trans_type}</div>
                    <div className="text-left text-xs">
                      {transaction.status}
                    </div>
                  </div>
                  <div className="">
                    {transaction.amount} {transaction.coin?.ticker}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TransactionHistory;
