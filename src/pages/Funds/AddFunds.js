import React, { useContext, useEffect, useState } from "react";
import yatripayLogo from "../../assets/yatripay_logo.svg";
import { addFundInINR } from "../../services/fundsAPI/fundsAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getAvailableBalace } from "../../services/fundsAPI/tradingScreenAPI";
import { GlobalContext } from "../../context/GlobalContext";
import FAQ from "../../components/common/FAQ";

const Badge = ({ badge }) => (
  <div className="border border-white text-white/60 rounded-xl px-2 py-1 text-[0.6rem] font-extralight">
    {badge}
  </div>
);

const AddFunds = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [availableBalance, setAvailableBalance] = useState("0.00");

  const { setIsLoading } = useContext(GlobalContext);

  const quickAmounts = [500, 1000, 2000];

  const handleQuickAmount = (val) => {
    setAmount(val.toString());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true)
      const response = await addFundInINR({
        amount: parseInt(amount),
        fiat: "INR",
      });
      if (response) {
        const { qr_code, upi_id } = response;
        navigate(`/confirm-add-fund`, { state: { qr_code, upi_id, amount } });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }finally{
      setIsLoading(false)
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const balance = await getAvailableBalace();
        if (balance.data) {
          setAvailableBalance(balance.data.balance);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="text-white p-4 ">
      {/* Responsive Header */}
      <header className="flex flex-col sm:flex-row items-center justify-between mb-6 py-2 px-6 gap-2 sm:gap-0">
        {/* Logo Section */}
        <div className="flex items-center justify-center sm:justify-start w-full sm:w-auto">
          <div className="text-yellow-300 text-2xl font-bold">
            <img src={yatripayLogo} alt="yatripay logo" />
          </div>
        </div>

        {/* Balance Section - separate lines on small screens, single line on larger */}
        <div className="text-white text-base sm:text-lg md:text-2xl font-bold flex flex-col sm:flex-row items-center sm:gap-2">
          <div className="text-white text-xl md:text-xl font-semibold">
            Available Balance:
          </div>
          <div className="text-white/50 md:text-white text-xl ">
            {availableBalance} INR
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center space-y-10 mt-16">
        <h2 className="text-2xl font-bold mb-6">Add Funds</h2>

        <form
          // onSubmit={handleSubmit}
          className="w-full max-w-lg flex flex-col items-center"
        >
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
                className="cursor-pointer"
                onClick={() => handleQuickAmount(val)}
              >
                <Badge badge={`+${val}`} />
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div
            onClick={handleSubmit}
            className="bg-[#4BAF2A] text-white px-6 py-2 text-xl font-bold mt-2 md:mt-3 rounded hover:bg-green-600 transition cursor-pointer"
          >
            Add Fund
          </div>
        </form>
      </div>
      <FAQ code={'buy'} />
    </div>
  );
};

export default AddFunds;
