import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  createStacking,
  getStackingCardDetailsById,
} from "../../services/stacking/stackingAPI";
import { getAvailableBalace } from "../../services/fundsAPI/tradingScreenAPI";
import dayjs from "dayjs";
import { getUserReferralLink } from "../../services/promotion/promotionAPI";
import { toast } from "react-toastify";
import Footer from "../../components/common/Footer";
import { getValueOfCoinByType } from "../../services/fundsAPI/fundsAPI";

const StakingSummary = () => {
  const location = useLocation();

  const [cardId, setCardId] = useState(location.state?.cardId);
  const [referralLink, setReferralLink] = useState(location.state?.referralLink);
  const [availableBalance, setAvailableBalace] = useState("0.00");
  const [stackingDetails, setStackingDetails] = useState(null);
  const [lockAmount, setLockAmount] = useState("");
  const [estReturn, setEstReturn] = useState("0.00");
  const [isAgreed, setIsAgreed] = useState(false);
  const [coinValue, setCoinValue] = useState(null);

  const startDate = dayjs(Date.now()).format("YYYY-MM-DD hh:mm");
  const endDate = stackingDetails
    ? dayjs().add(stackingDetails.return_period, "day").format("YYYY-MM-DD hh:mm")
    : "";

  // Fetch data for stacking details, balance, and coin value
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [stackingRes, balanceRes, coinRes] = await Promise.all([
          getStackingCardDetailsById(cardId),
          getAvailableBalace(cardId),
          getValueOfCoinByType("YTP"),
        ]);
        if (stackingRes) setStackingDetails(stackingRes.data);
        if (balanceRes) setAvailableBalace(balanceRes.data.balance);
        if (coinRes) setCoinValue(coinRes.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

    if (!referralLink) {
      const fetchReferral = async () => {
        try {
          const resReferral = await getUserReferralLink();
          if (resReferral && resReferral.data) setReferralLink(resReferral.data.url);
        } catch (error) {
          console.log(error);
        }
      };
      fetchReferral();
    }
  }, [cardId, referralLink]);


  useEffect(() => {
    if (lockAmount > 0 && stackingDetails) {
      const perAnnum = stackingDetails.per_annum; 
      const returnPeriod = stackingDetails.return_period; 
      const interest = (parseFloat(lockAmount) * (perAnnum / 100) * returnPeriod) / 365;
      setEstReturn((parseFloat(lockAmount) + interest).toFixed(2));
    } else {
      setEstReturn("0.00");
    }
  }, [lockAmount, stackingDetails]);

  const handleConfirm = async () => {
    try {
      if (!lockAmount) throw new Error("Amount is required");
      if (!isAgreed) throw new Error("Please check the agree box");
      const res = await createStacking({
        staking_type_id: stackingDetails.id,
        amount: lockAmount,
        agreement: isAgreed,
        auto_stake: false,
        apply_voucher: false,
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  if (!stackingDetails || !coinValue) {
    return <div>Loading...</div>;
  }

  // Calculate subscription price in YTP and total amount
  const subscriptionPriceYTP = (stackingDetails.final_price / coinValue.USD).toFixed(2);
  const totalAmount = (parseFloat(lockAmount || "0") + parseFloat(subscriptionPriceYTP)).toFixed(2);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 px-4 text-white">
      <div className="w-full max-w-lg">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-center md:mt-10 mb-4">
          Staking
        </h1>

        {/* Available Balance */}
        <p className="text-center mb-4">
          Available Balance : {availableBalance} YTP
        </p>

        {/* Stats */}
        <div className="text-left text-white/90 text-sm mb-6">
          <p className="mb-2">Subscribers: {stackingDetails.subscribers}</p>
          <p className="mb-2">Staked YTP: {stackingDetails.staked_assets.toFixed(2)}</p>
          <p className="mb-2">Quota left: {stackingDetails.quota_left.toFixed(2)}</p>
        </div>

        {/* Subscription Details */}
        <div className="flex justify-between md:gap-40 mt-10 mb-6 text-left">
          <div className="w-1/2 pr-2">
            <p className="font-semibold mb-2">Subscription Type</p>
            <select
              onChange={(e) => setCardId(e.target.value)}
              className="stacking-summary-select leading-none bg-[#FFFFFF33] text-white rounded-xl py-3 px-8 mb-2 appearance-none"
            >
              <option value="1">LEARNER</option> {/* Corrected typo "LARNER" */}
              <option value="2">EARNER</option>
              <option value="3">TRAVELER</option>
            </select>
            <p className="text-white/80 text-sm">
              Min. Stake : {stackingDetails.min_stake} YTP
            </p>
          </div>
          <div className="w-1/2 pl-2">
            <p className="font-semibold mb-2">Subscription Type</p>
            <div className="bg-[#FFFFFF33] flex justify-center items-center rounded-xl py-3 px-3 mb-2">
              <span className="leading-none">{stackingDetails.return_period} DAYS</span>
            </div>
            <p className="text-white/80 text-sm">
              Max. Stake : {stackingDetails.max_stake} YTP
            </p>
          </div>
        </div>

        {/* Lock Amount Section */}
        <div className="mb-6">
          <p className="text-lg font-semibold mb-2 text-left">Lock Amount</p>
          <div className="mb-2">
            <div className="flex justify-between">
              <span>Total Price :</span>
              <span>
                {stackingDetails.price.toFixed(2)} USD = {(stackingDetails.price / coinValue.USD).toFixed(2)} YTP
              </span>
            </div>
            <div className="flex justify-between">
              <span>Discount :</span>
              <span>
                {stackingDetails.price_discount_per}% = {((stackingDetails.price * stackingDetails.price_discount_per) / 100).toFixed(2)} USD
              </span>
            </div>
            <div className="flex justify-between">
              <span>Final Payable Amount:</span>
              <span>
                {stackingDetails.final_price.toFixed(2)} USD = {(stackingDetails.final_price / coinValue.USD).toFixed(2)} YTP
              </span>
            </div>
          </div>
        </div>

        {/* Input Section */}
        <div className="mb-10">
          <p className="text-lg font-semibold text-left mb-2">Lock Amount</p>
          <input
            type="number"
            value={lockAmount}
            onChange={(e) => setLockAmount(e.target.value)}
            placeholder="Enter lock amount" // Updated placeholder
            className="w-full p-3 rounded-md bg-white text-black"
          />
        </div>

        {/* Staking Limitation */}
        <div className="text-left mb-10">
          <p className="font-semibold mb-2">Staking Limitation</p>
          <p className="">Available Quota : {stackingDetails.quota_left.toFixed(2)} YTP</p>
        </div>

        {/* Summary */}
        <div className="bg-[#FFFFFF33] rounded-md p-4 mb-10 text-left">
          <p className="text-xl font-semibold mb-3">Summary</p>

          <div className="stacking-summary-card grid grid-cols-2 gap-2 pb-3 mb-3">
            <div>Staking Start Date</div>
            <div className="text-right">{startDate}</div>

            <div>Staking End Date</div>
            <div className="text-right">{endDate}</div>

            <div>Refund Period</div>
            <div className="text-right">{stackingDetails.return_period} day</div>
          </div>

          <div className="stacking-summary-card grid grid-cols-2 gap-2 pb-3 mb-3">
            <div>Per Annum</div>
            <div className="text-right">{stackingDetails.per_annum}%</div>

            <div>Est. Return</div>
            <div className="text-right">{estReturn} YTP</div>
          </div>

          <div className="grid grid-cols-2 gap-2 pb-3 mb-3">
            <div>Subscription Price</div>
            <div className="text-right">
              {stackingDetails.final_price.toFixed(2)} USD = {subscriptionPriceYTP} YTP
            </div>

            <div>Lock Amount</div>
            <div className="text-right">{lockAmount || "0.00"} YTP</div>

            <div>Transaction Fees</div>
            <div className="text-right">0.00 YTP</div>

            <div>Total Amount</div>
            <div className="text-right">{totalAmount} YTP</div>
          </div>

          <div className="px-3">
            <div className="bg-white text-black w-fit flex justify-center items-center gap-6 px-6 py-[0.6rem] rounded-lg mb-8">
              <input
                type="checkbox"
                id="agree-check"
                name="agree-check"
                className="big-checkbox relative -top-1 w-fit bg-r-500 cursor-pointer"
                onChange={() => setIsAgreed((prev) => !prev)}
              />
              <label htmlFor="agree-check" className="text-xs md:text-sm"> {/* Corrected "lable" and "htmlfor" */}
                I have read and I agree to YariPay Staking Service Agreement
              </label>
            </div>
          </div>

          <div className="flex justify-center">
            <div
              onClick={handleConfirm}
              className="bg-[#4BAF2A] text-white py-2 px-8 font-semibold rounded-md text-center cursor-pointer"
            >
              Confirm
            </div>
          </div>
        </div>

        {/* Referral Link */}
        <div className="mb-6 px-10">
          <p className="text-left text-xl leading-none mb-1">Referral Link</p>
          <p className="text-left mb-4 leading-none">{referralLink}</p>
          <div className="bg-[#4BAF2A] text-white py-2 rounded-md text-center cursor-pointer">
            Invite Friends
          </div>
        </div>
      </div>
      <section className="flex mt-16 ml-[4vw]">
        <Footer />
      </section>
    </div>
  );
};

export default StakingSummary;