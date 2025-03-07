import React, { useState } from "react";
import Background from "../../components/Background";
import yatripayLogo from "../../assets/yatripay_logo.svg";

const Badge = ({ badge }) => (
  <div className="border border-white text-white/60 rounded-xl px-2 py-1 text-[0.6rem] font-extralight">
    {badge}
  </div>
);

const AddFunds = () => {

  const [amount, setAmount] = useState("");

  const quickAmounts = [250, 500, 1000, 2000];


  const handleQuickAmount = (val) => {
    setAmount(val.toString());
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your logic to add funds
    console.log("Adding funds:", amount);
  };

  return (
    <Background>
    <div className="text-white p-4">
      {/* Header */}
      <header className="flex justify-between items-center mb-6 py-2 px-6">
          <div className="flex items-center">
            <div className="text-yellow-300 text-2xl font-bold">
              <img src={yatripayLogo} alt="yatripay logo" />
            </div>
          </div>
          <div className="text-white text-sm md:text-2xl font-bold">
            Available Balance : 0.00 INR
          </div>
        </header>

      {/* Main Content */}
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-6">Add Funds</h2>

        <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col items-center">
          <label className="text-lg mb-2 w-full text-left font-semibold">
            Amount INR
          </label>
          <input
            type="number"
            className="w-full mb-3 p-[11px] px-3 rounded text-black outline-none"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          {/* Quick Amount Buttons */}
          <div className="flex gap-2 mb-4 justify-start self-start">
            {quickAmounts.map((val) => (
              <div
                key={val}
                className="cursor-pointer "
                onClick={() => handleQuickAmount(val)}
              >
                <Badge badge={`+${val}`} />
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div
            type="submit"
            className="bg-[#4BAF2A] text-white px-6 py-2 text-xl font-bold mt-2 rounded hover:bg-green-600 transition"
          >
          
            Add Fund
          </div>
        </form>
      </div>
    </div>
    </Background>
  );
};

export default AddFunds;
