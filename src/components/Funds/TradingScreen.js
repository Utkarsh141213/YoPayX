import React, { useRef, useState } from "react";
import Background from "../Background";
// import { ChevronDown, RefreshCw } from 'lucide-react';
import { LiaAngleDownSolid } from "react-icons/lia";

// Transaction History Component
const TransactionHistory = () => {
  const transactions = [
    {
      id: 1,
      date: "01 FEB",
      type: "Yatripay (TYP)",
      amount: 1.0,
      status: "To Reward",
    },
    {
      id: 2,
      date: "01 FEB",
      type: "Yatripay (TYP)",
      amount: 1.0,
      status: "To Reward",
    },
    {
      id: 3,
      date: "01 FEB",
      type: "Yatripay (TYP)",
      amount: 1.0,
      status: "To Reward",
    },
    {
      id: 4,
      date: "01 FEB",
      type: "Yatripay (TYP)",
      amount: 1.0,
      status: "To Reward",
    },
    {
      id: 5,
      date: "01 FEB",
      type: "Yatripay (TYP)",
      amount: 1.0,
      status: "To Reward",
    },
    {
      id: 6,
      date: "01 FEB",
      type: "Yatripay (TYP)",
      amount: 1.0,
      status: "To Reward",
    },
    {
      id: 7,
      date: "01 FEB",
      type: "Yatripay (TYP)",
      amount: 1.0,
      status: "To Reward",
    },
    {
      id: 8,
      date: "01 FEB",
      type: "Yatripay (TYP)",
      amount: 1.0,
      status: "To Reward",
    },
  ];

  return (
    <div className="">
      <h2 className="text-white text-lg font-semibold mb-4">
        Transaction History
      </h2>
      {/* <div className="space-y-2 max-h-64 overflow-y-auto"> */}
      <div className="space-y-3">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex justify-between items-center bg-white rounded-lg "
          >
            <div className="flex w-full">
              <div className="text-white bg-[#4BAF2A] py-[10px] px-[12px] rounded-lg flex flex-col">
                <span className="text-lg font-bold leading-none h-fit">
                  {transaction.date.split(" ")[0]}
                </span>
                <span className="text-xs leading-none h-fit">
                  {transaction.date.split(" ")[1]}
                </span>
              </div>
              <div className="flex justify-between text-black/70 w-full px-3 items-center">
                <div>
                  <div className="">{transaction.type}</div>
                  <div className="text-left text-xs">{transaction.status}</div>
                </div>
                <div className="">{transaction.amount} TYP</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SwipeToSell = () => {
  const containerRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [handleX, setHandleX] = useState(7); // Horizontal position of the white circle

  // Start dragging
  const handleMouseDown = () => {
    setDragging(true);
  };

  // Stop dragging
  const handleMouseUp = () => {
    setDragging(false);
    // Optional: If handleX > some threshold, trigger an action
    // e.g., if (handleX > 150) { console.log("Swiped!") }
  };

  // Update position while dragging
  const handleMouseMove = (e) => {
    if (!dragging) return;

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    // Calculate the new X position relative to the container
    let newX = e.clientX - rect.left - 20; // "20" is half the handle's width

    // Constrain the handle so it stays within the container
    if (newX < 7) newX = 7;
    if (newX > rect.width - 53) newX = rect.width - 53; // 40 = handle width
    if (newX > rect.width - 190) newX = rect.width - 53;

    setHandleX(newX);
  };

  return (
    <div
      className="w-full h-14  bg-green-700 rounded-full relative flex items-center justify-center select-none"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // If user drags out of container
    >
      {/* Centered text */}
      <span className="text-white text-2xl font-semibold pointer-events-none">
        Swipe to sell
      </span>

      {/* Draggable white circle */}
      <div
        className="absolute w-11 h-11 bg-white rounded-full shadow cursor-pointer"
        style={{ left: handleX, top: "5.5px" }}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};

const Badge = ({ badge }) => (
  <div className="border border-white text-white/60 rounded-xl px-2 py-1 text-xs font-extralight">
    {badge}
  </div>
);

// Main Trading Screen Component
const TradingScreen = () => {
  const [activeTab, setActiveTab] = useState("Sell");
  const [selectedAsset, setSelectedAsset] = useState("");
  const [amount, setAmount] = useState("");
  const [exchangeRate, setExchangeRate] = useState("");
  const [youWillGet, setYouWillGet] = useState("");

  const assets = ["BTC", "ETH", "USDT", "BNB"];

  const calculateYouWillGet = () => {
    if (amount && exchangeRate) {
      const total = parseFloat(amount) * parseFloat(exchangeRate);
      const tds = total * 0.01; // 1% TDS
      return (total - tds).toFixed(2);
    }
    return "0.00";
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    setYouWillGet(calculateYouWillGet());
  };

  const handleExchangeRateChange = (e) => {
    const value = e.target.value;
    setExchangeRate(value);
    setYouWillGet(calculateYouWillGet());
  };

  return (
    <Background>
      <div className="min-h-screen text-white p-4">
        <div className="w-fit mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">YatriPay</h1>
            <div className="text-white">Available Balance: 0.00 INR</div>
          </div>

          <div className="flex mb-4 justify-center">
            <div
              className={`min-w-40 h-fit py-2 text-lg font-bold mr-2 rounded-lg cursor-pointer ${
                activeTab === "Sell"
                  ? "bg-[#4BAF2A] text-white"
                  : "bg-white text-black "
              }`}
              onClick={() => setActiveTab("Sell")}
            >
              Sell
            </div>
            <div
              className={`min-w-40 h-fit py-2 text-lg font-bold rounded-lg cursor-pointer ${
                activeTab === "Withdrawal"
                  ? "bg-[#4BAF2A] text-white"
                  : "bg-white text-black "
              }`}
              onClick={() => setActiveTab("Withdrawal")}
            >
              Withdrawal
            </div>
          </div>

          <div className="p-4 pb-0 rounded-lg">
            <div className="relative mb-4">
              <label className="text-left w-full text-xl mb-2 font-bold">
                Choose Assets
              </label>
              <select
                className="w-full bg-white text-black/50 p-3 rounded-lg appearance-none outline-none"
                name="select_option"
                value={selectedAsset}
                onChange={(e) => setSelectedAsset(e.target.value)}
              >
                <option value="" hidden>
                  xx
                </option>
                {assets.map((asset) => (
                  <option key={asset} value={asset}>
                    {asset}
                  </option>
                ))}
              </select>
              {/* <ChevronDown className="absolute right-3 top-4 text-white" /> */}
              <LiaAngleDownSolid className="absolute right-5 top-14 text-black" />
              <div className="flex gap-2 mt-2">
                {assets && assets.map((badge) => <Badge badge={badge} />)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-white text-lg font-bold block mb-2 w-full text-left">
                  XXX Amount
                </label>
                <input
                  type="number"
                  className="w-full text-black p-3 rounded-lg outline-none"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="text-white text-lg font-bold block mb-2 w-full text-left">
                  XXX / INR
                </label>
                <input
                  type="number"
                  className="w-full  text-black p-3 rounded-lg outline-none"
                  value={exchangeRate}
                  onChange={handleExchangeRateChange}
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="text-white text-lg font-bold w-full text-left block mb-2">
                You will get
              </label>
              <div className="flex">
                <input
                  type="text"
                  className="w-full bg-white text-black outline-none p-3 rounded-lg"
                  value={youWillGet}
                  readOnly
                  placeholder="0.00"
                />
                <div className="text-gray-400 mt-1">
                  TDS = 1%{" "}
                  {amount ? (parseFloat(amount) * 0.01).toFixed(2) : "0.00"} INR
                </div>
              </div>
            </div>

            {/* <button className="w-full bg-green-600 text-white p-4 rounded-lg flex items-center justify-center">
              Swipe to Sell
            </button> */}
            <div className="px-5 my-4">
              <SwipeToSell />
            </div>
          </div>

          <TransactionHistory />
        </div>
      </div>
    </Background>
  );
};

export default TradingScreen;
