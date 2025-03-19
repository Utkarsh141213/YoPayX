import React, { useContext, useEffect, useState } from "react";
import logo from "../../assets/yatri-pay-logo-main.png";
import { card1, card2, card3 } from "../../assets/stacking/page1";
import {
  getCardDetails,
  getStackingOverview,
} from "../../services/stacking/stackingAPI";
import StakingCard from "../../components/Staking/StakingCard";
import { getUserReferralLink } from "../../services/promotion/promotionAPI";
import AllStacking from "../../components/Staking/AllStaking";
import StackingReward from "../../components/Staking/StakingReward";
import FAQ from "../../components/common/FAQ";
import Footer from "../../components/common/Footer";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";

const Page1 = () => {
  const [activeTab, setActiveTab] = useState("locked");
  const [totalSubs, setTotalSubs] = useState("0000");
  const [totalLocked, setTotalLocked] = useState("00.00");
  const [cardDetails, setCardDetails] = useState([]);
  const [referralLink, setReferralLink] = useState(
    "Referral link is not available"
  );

  const { setIsLoading } = useContext(GlobalContext);

  const navigate = useNavigate()

  const [activeButton, setActiveButton] = useState("allStaking");

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true)
        const [resOverview, resCards, resReferral] = await Promise.all([
          getStackingOverview(),
          getCardDetails(),
          getUserReferralLink(),
        ]);

        if (resOverview && resOverview.data) {
          setTotalSubs(resOverview.data.subscribers);
          setTotalLocked(resOverview.data.total_value_locked);
        }

        if (resCards && resCards.data) {
          setCardDetails(resCards.data);
        }

        if (resReferral && resReferral.data) {
          setReferralLink(resReferral.data.url);
        }
      } catch (error) {
        console.log("Error in Promise.all:", error);
      }finally{
        setIsLoading(false)
      }
    })();
  }, []);

  return (
      <div className="min-h-screen">
        <header>
          <div className="flex justify-start p-8">
            <img src={logo} alt="logo" className="h-8 md:h-12" />
          </div>
        </header>

        <main className="px-12 md:px-12 lg:px-16 xl:px-40 pb-16">
          <h1 className="text-white text-4xl md:text-5xl font-bold text-center mb-12">
            Staking
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
            {/* LOCKED (Mobile: 1st, Desktop: 1st) */}
            <div className="order-1 md:order-1 w-full flex flex-col items-center gap-6">
              <div className="rounded-lg flex justify-center md:justify-end gap-10 w-full">
                <div
                  className={`py-[0.65rem] md:py-[0.6rem] px-12 rounded-lg text-xl font-semibold transition-colors ${
                    activeTab === "locked"
                      ? "bg-[#39B54A]"
                      : "bg-white text-black"
                  } cursor-pointer`}
                  onClick={() => setActiveTab("locked")}
                >
                  LOCKED
                </div>
              </div>
            </div>

            {/* PORTFOLIO (Mobile: 2nd, Desktop: 3rd) */}
            <div className="order-2 md:order-3 w-full flex flex-col items-center gap-6">
              <div className="rounded-lg flex justify-center md:justify-start gap-10 w-full">
                <div
                  className={`py-[0.61rem] px-9 rounded-lg text-xl font-semibold transition-colors ${
                    activeTab === "portfolio"
                      ? "bg-[#39B54A]"
                      : "bg-white text-black"
                  } cursor-pointer`}
                  onClick={() => setActiveTab("portfolio")}
                >
                  PORTFOLIO
                </div>
              </div>
            </div>

            {/* TOTAL SUBSCRIBERS (Mobile: 3rd, Desktop: 2nd) */}
            <div className="order-3 md:order-2 w-full flex flex-col items-center gap-6">
              <div className="feature-box bg-[#FFFFFF20] rounded-3xl md:rounded-[2rem] p-[14px] md:p-6 text-center w-full">
                <div className="text-white text-xl md:text-2xl mb-2 font-semibold">
                  Total Subscribers
                </div>
                <div className="text-gray-400/70 md:text-xl font-semibold leading-none">
                  {totalSubs}
                </div>
              </div>
            </div>

            {/* TOTAL LOCKED YTP (Mobile: 4th, Desktop: 4th) */}
            <div className="order-4 md:order-4 w-full flex flex-col items-center gap-6">
              <div className="feature-box bg-[#FFFFFF20] rounded-3xl md:rounded-[2rem] p-[16px] md:p-6 text-center w-full">
                <div className="text-white text-xl md:text-2xl mb-2 font-semibold">
                  Total Locked YTP
                </div>
                <div className="text-gray-400/70 md:text-xl font-semibold leading-none">
                  {totalLocked}
                </div>
              </div>
            </div>
          </div>

          {activeTab === "locked" ? (
            <>
              {/* Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-20 w-fit mx-auto justify-items-center my-24">
                {cardDetails.length > 0 && (
                  <StakingCard
                    data={cardDetails[0]}
                    background={card1}
                    btnClass="stacting-pag1-card1-btn hover:bg-blue-900/30"
                    handleFn={() => {
                      navigate('/staking-summary', { state: { cardId: 1, referralLink }})
                    }}
                  />
                )}

                {/* Card 2 */}
                {cardDetails.length > 1 && (
                  <StakingCard
                    data={cardDetails[1]}
                    background={card2}
                    btnClass="stacting-pag1-card2-btn hover:bg-green-900/30"
                    handleFn={() => {
                      navigate('/staking-summary', { state: { cardId: 2, referralLink }})
                    }}
                  />
                )}

                {/* Card 3 */}
                {cardDetails.length > 2 && (
                  <StakingCard
                    data={cardDetails[2]}
                    background={card3}
                    btnClass="stacting-pag1-card3-btn hover:bg-orange-900/30"
                    handleFn={() => {
                      navigate('/staking-summary', { state: { cardId: 3, referralLink }})
                    }}
                  />
                )}
              </div>

              <div className="mt-16 flex justify-center">
                <div className="bg-[#00FFA01A] text-white max-w-3xl w-full rounded-3xl p-8  shadow-lg">
                  <div className="md:w-[28rem] mx-auto">
                    {/* Title */}
                    <h2 className="text-4xl font-bold text-cente sm:text-left mb-8">
                      <span className="bg-gradient-to-r from-[#C3D09D] via-[#31B65E] to-[#3381CD] text-transparent bg-clip-text sm:text-5xl md:text-6xl">
                        Refer and Earn
                      </span>
                    </h2>

                    {/* Reward Details */}
                    <div className="text-left text-sm w-full sm:pr-8 md:pr-16 text-white/95">
                      <span className="">Assured 30,000 TP in Rewards!</span>
                      <ul className="list-disc text-left">
                        <li>
                          €100 Referral Reward - upon your referral's Welcome
                          Bonus claim
                        </li>
                        <li>
                          Staking Hike - when your referral matches your staking
                          subscription
                        </li>
                        <li>iPhone - Chance to win</li>
                      </ul>
                    </div>

                    {/* Referral Link */}
                    <div className="mt-8 text-left">
                      <span className="text-lg block leading-none">
                        Referral Link
                      </span>
                      <span className="text-gray-300 text-sm leading-none">
                        {referralLink}
                      </span>
                    </div>

                    {/* Invite Button */}
                    <div className="mt-6">
                      <div className="bg-[#4BAF2A] text-sm text-white font-bold py-3 px-8 rounded-lg hover:bg-green-600 transition w-full cursor-pointer">
                        Invite Friends
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col md:flex-row justify-center gap-6 my-10">
                <div
                  className={`font-bold py-3 px-12 rounded-lg w-full md:w-64 text-center cursor-pointer transition-colors ${
                    activeButton === "allStaking"
                      ? "bg-[#39B54A] text-white"
                      : "bg-white text-black"
                  }`}
                  onClick={() => setActiveButton("allStaking")}
                >
                  All Staking
                </div>
                <div
                  className={`font-bold py-3 px-12 rounded-lg w-full md:w-64 text-center cursor-pointer transition-colors ${
                    activeButton === "stakingRewards"
                      ? "bg-[#39B54A] text-white"
                      : "bg-white text-black"
                  }`}
                  onClick={() => setActiveButton("stakingRewards")}
                >
                  Staking Rewards
                </div>
              </div>

              {activeButton === "allStaking" ? (
                <AllStacking />
              ) : (
                <StackingReward />
              )}
            </>
          )}
          {/* FAQ Section */}
          <FAQ code={'staking'}/>
        </main>
        <section className="flex ml-[4vw] md:ml-[16vw]">
          <Footer />
        </section>
      </div>
  );
};

export default Page1;
