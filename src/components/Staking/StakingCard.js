import React from "react";
import { cardLock, cardSetting, cardPerson } from "../../assets/stacking/page1";

const StakingCard = ({ data, background, btnClass, handleFn }) => {
  if (!data) {
    return null;
  }

  return (
    <div
      className="relative w-full min-w-72 md:min-w-80 max-w-sm"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "450px",
      }}
    >
      <div className="py-6 pt-12 px-8 h-full flex flex-col">
        <div className="text-center">
          <div className="text-white text-4xl font-bold">{data.name}</div>
          <div className="text-xs font-semibold" style={{ color: data.color || "#29ABE2" }}>
            {data.description}
          </div>

          <div className="text-white text-lg font-bold mt-6">
            {data.per_annum}% P.A.
          </div>
          <div className="text-sm font-semibold" style={{ color: data.color || "#29ABE2" }}>
            Minimum Stake: {data.min_stake} INR
          </div>
        </div>

        <div className="mt-5">
          <div className="flex justify-between text-sm mb-3">
            <div className="flex gap-2 items-center">
              <img src={cardLock} alt="lock" className="h-[0.65rem]" />
              <div className="text-white font-semibold text-[0.65rem]">Referral</div>
            </div>
            <div className="text-white font-semibold">{data.per_annum}% P.A.</div>
          </div>

          <div className="flex justify-between text-sm mb-3">
            <div className="flex gap-2 items-center">
              <img src={cardSetting} alt="lock" className="h-[0.65rem]" />
              <div className="text-white font-semibold text-[0.65rem]">
                Locking Period
              </div>
            </div>
            <div className="text-white font-semibold">{data.return_period} days</div>
          </div>

          <div className="flex justify-between text-sm mb-8">
            <div className="flex gap-2 items-center">
              <img src={cardPerson} alt="lock" className="h-[0.65rem]" />
              <div className="text-white font-semibold text-[0.65rem]">
                Subscription Cost
              </div>
            </div>
            <div className="text-white font-semibold">$ {data.price}</div>
          </div>

          <div className="flex justify-center">
            <div
                onClick={handleFn}
              className={`${btnClass} text-xl font-bold w-fit px-10 py-[0.35rem] text-white rounded-xl  transition-colors cursor-pointer`}
            >
              Start Now
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakingCard;
