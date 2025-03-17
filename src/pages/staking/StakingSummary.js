import React from "react";

const StakingSummary = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 px-4 text-white">
      <div className="w-full max-w-lg ">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-center md:mt-10 mb-4">
          Staking
        </h1>

        {/* Available Balance */}
        <p className="text-center mb-4">Available Balance : 00.00 YTP</p>

        {/* Stats */}
        <div className="text-left text-white/90 text-sm mb-6">
          <p className="mb-2">Subscribers: 0000</p>
          <p className="mb-2">Staked YTP: 00.00</p>
          <p className="mb-2">Quota left: 00.00</p>
        </div>

        {/* Subscription Details */}
        <div className="flex justify-between md:gap-40 mt-10 mb-6 text-left">
          <div className="w-1/2  pr-2">
            <p className=" font-semibold mb-2 ">Subscription Type</p>
            {/* <div className="bg-[#FFFFFF33] flex justify-center items-center rounded-xl py-3 px-3 mb-2"> */}
              <select className="stacking-summary-select leading-none bg-[#FFFFFF33] text-white   rounded-xl py-3 px-8 mb-2 appearance-none">
                <option value="LARNER">LARNER</option>
                <option value="EARNER">EARNER</option>
                <option value="TRAVELER">TRAVELER</option>
              </select>
            {/* </div> */}
            <p className="text-white/80">Min. Stake : 00.00 YTP</p>
          </div>
          <div className="w-1/2 pl-2">
            <p className=" font-semibold mb-2 ">Subscription Type</p>
            <div className="bg-[#FFFFFF33] flex justify-center items-center rounded-xl py-3 px-3 mb-2">
              <span className="leading-none ">7 DAYS</span>
            </div>
            <p className="text-white/80">Min. Stake : 00.00 YTP</p>
          </div>
        </div>

        {/* Lock Amount Section */}
        <div className="mb-6">
          <p className="text-lg font-semibold mb-2 text-left">Lock Amount</p>
          <div className="mb-2">
            <div className="flex justify-between">
              <span>Total Price :</span>
              <span>0 USD = 0.00 YTP</span>
            </div>
            <div className="flex justify-between">
              <span>Discount :</span>
              <span>0% = 0.00 USD</span>
            </div>
            <div className="flex justify-between">
              <span>Final Payable Amount:</span>
              <span>0 USD = 0.00 YTP</span>
            </div>
          </div>
        </div>

        {/* Input Section */}
        <div className="mb-10">
          <p className="text-lg font-semibold text-left mb-2">Lock Amount</p>
          <input
            type="text"
            placeholder="Amount to withdraw"
            className="w-full p-3 rounded-md bg-white text-black"
          />
        </div>

        {/* Staking Limitation */}
        <div className="text-left mb-10">
          <p className="font-semibold mb-2">Staking Limitation</p>
          <p className="">Available Quota : 00.00 YTP</p>
        </div>

        {/* Summary */}
        <div className="bg-[#FFFFFF33] rounded-md p-4 mb-10 text-left">
          <p className="text-xl font-semibold mb-3">Summary</p>

          <div className="stacking-summary-card grid grid-cols-2 gap-2 pb-3 mb-3">
            <div>Staking Start Date</div>
            <div className="text-right">DD-MM-YYYY 00:00</div>

            <div>Staking Start Date</div>
            <div className="text-right">DD-MM-YYYY 00:00</div>

            <div>Refund Period</div>
            <div className="text-right">Daily</div>
          </div>

          <div className="stacking-summary-card grid grid-cols-2 gap-2 pb-3  mb-3">
            <div>Per Annum</div>
            <div className="text-right">30%</div>

            <div>Est. Return</div>
            <div className="text-right">0.00 YTP</div>
          </div>

          <div className=" grid grid-cols-2 gap-2 pb-3  mb-3">
            <div>Subscription Price</div>
            <div className="text-right">0 USD = 00.00 YTP</div>

            <div>Lock Amount</div>
            <div className="text-right">0.00 YTP</div>

            <div>Transaction Fees</div>
            <div className="text-right">0.00 YTP</div>

            <div>Total Amount</div>
            <div className="text-right">0.00 YTP</div>
          </div>

          <div className="px-3">
            <div className="bg-white text-black w-fit flex justify-center items-center gap-6 px-6 py-[0.6rem] rounded-lg mb-8">
              <input
                type="checkbox"
                id="agree-check"
                name="agree-check"
                className="big-checkbox relative -top-1 w-fit bg-r-500 cursor-pointer"
              />

              <lable htmlfor="agree-check" className="text-xs md:text-sm">
                I have read and I agree to YariPay Staking Service Agreement
              </lable>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="bg-[#4BAF2A] text-white py-2 px-8 font-semibold rounded-md text-center cursor-pointer">
              Confirm
            </div>
          </div>
        </div>

        {/* Referral Link */}
        <div className="mb-6 px-10">
          <p className="text-left text-xl leading-none mb-1">Referral Link</p>
          <p className="text-left mb-4 leading-none">XXXXXXXX</p>
          <div className="bg-[#4BAF2A] text-white py-2 rounded-md text-center cursor-pointer">
            Invite Friends
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakingSummary;
