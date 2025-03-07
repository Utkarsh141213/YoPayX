import React from "react";

const TransactionHistory = ({ transactions }) => {
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
                  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  return (
    <div className="">
      <div className="space-y-3">
        {transactions.map((transaction) => {
          // transaction.created_at example: "06-03-2025 13:59"
          // We only need the date portion: "06-03-2025"
          const [rawDate] = transaction.created_at.split(" ");

          // Split that into [day, month, year]
          const [dayStr, monthStr] = rawDate.split("-");
          // Parse and pad the day (e.g., 7 -> "07")
          const dayNum = parseInt(dayStr, 10) || 1;
          const dayPadded = dayNum.toString().padStart(2, "0");

          // Convert the month to a 0-based index
          const monthIndex = (parseInt(monthStr, 10) || 1) - 1;
          // Fallback if invalid month
          if (monthIndex < 0 || monthIndex > 11) {
            // If month is out of range, just show rawDate
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
                  {/* Top span: padded day (e.g. "07") */}
                  <span className="text-lg font-bold leading-none h-fit ">
                    {dayPadded}
                  </span>
                  {/* Bottom span: month abbreviation (e.g. "MAR") */}
                  <span className="text-xs leading-none h-fit ">
                    {monthAbbr}
                  </span>
                </div>
                <div className="flex justify-between text-black/70 w-full px-3 items-center">
                  <div>
                    <div className="text-left">{transaction.trans_type}</div>
                    <div className="text-left text-xs">{transaction.status}</div>
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
