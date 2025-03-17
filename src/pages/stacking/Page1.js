import React, { useState } from "react";
import Background from "../../components/Background";
import logo from "../../assets/yatri-pay-logo-main.png";
import {
  card1,
  card2,
  card3,
  cardLock,
  cardPerson,
  cardSetting,
} from "../../assets/stacking/page1";

const Page1 = () => {
  const [activeTab, setActiveTab] = useState("locked");

  return (
    <Background>
      <div className="min-h-screen">
        <header>
          <div className="flex justify-start p-8">
            <img src={logo} alt="logo" className="h-12" />
          </div>
        </header>

        <main className="px-4 md:px-8 lg:px-16 xl:px-24 pb-16">
          <h1 className="text-white text-5xl font-bold text-center mb-10">
            Staking
          </h1>

          {/* Tabs */}
          <div className="flex justify-center mb-10">
            <div className="bg-[#FFFFFF14] rounded-lg flex gap-10">
              <div
                className={`py-3 px-10 rounded-lg text-xl font-semibold transition-colors ${
                  activeTab === "locked"
                    ? "bg-[#39B54A]"
                    : "bg-white text-black"
                } cursor-pointer`}
                onClick={() => setActiveTab("locked")}
              >
                LOCKED
              </div>
              <div
                className={`py-3 px-10 rounded-lg text-xl font-semibold transition-colors ${
                  activeTab === "portfolio"
                    ? "bg-[#39B54A] "
                    : "bg-white text-black"
                } cursor-pointer`}
                onClick={() => setActiveTab("portfolio")}
              >
                PORTFOLIO
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-24">
            <div className="feature-box bg-[#FFFFFF20] rounded-[2rem] p-6 text-center w-full md:w-5/12 lg:w-2/5">
              <div className="text-white text-2xl mb-2 font-semibold">
                Total Subscribers
              </div>
              <div className="text-gray-400/70 text-xl font-semibold">0000</div>
            </div>
            <div className="feature-box bg-[#FFFFFF20] rounded-[2rem] p-6 text-center w-full md:w-5/12 lg:w-2/5">
              <div className="text-white text-2xl mb-2 font-semibold">
                Total Locked YTP
              </div>
              <div className="text-gray-400/70 text-xl font-semibold">
                00.00
              </div>
            </div>
          </div>

          {activeTab === "locked" ?
           (
            <>
              {/* Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-fit mx-auto justify-items-center">
                {/* Card 1 - Blue */}
                <div
                  className="relative max-w-sm w-full"
                  style={{
                    backgroundImage: `url(${card1})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    height: "450px",
                  }}
                >
                  <div className="py-6 pt-12 px-8 h-full flex flex-col">
                    <div className="text-center ">
                      <div className="text-white text-4xl font-bold">
                        LEARNER
                      </div>
                      <div className="text-[#29ABE2] text-xs font-semibold">
                        Start your journey
                      </div>

                      <div className="text-white text-lg font-bold mt-6">
                        30% P.A.
                      </div>
                      <div className="text-[#29ABE2] text-sm font-semibold">
                        Minimum Stake: 500 INR
                      </div>
                    </div>

                    <div className="mt-5">
                      <div className="flex justify-between text-sm mb-3">
                        <div className="flex gap-2 items-center ">
                          <img
                            src={cardLock}
                            alt="lock"
                            className="h-[0.65rem]"
                          />
                          <div className="text-white font-semibold text-[0.65rem]">
                            Referral
                          </div>
                        </div>
                        <div className="text-white font-semibold">30% P.A.</div>
                      </div>
                      <div className="flex justify-between text-sm mb-3">
                        <div className="flex gap-2 items-center">
                          <img
                            src={cardSetting}
                            alt="lock"
                            className="h-[0.65rem]"
                          />
                          <div className="text-white font-semibold text-[0.65rem]">
                            Locking Period
                          </div>
                        </div>
                        <div className="text-white font-semibold">7 days</div>
                      </div>
                      <div className="flex justify-between text-sm mb-8">
                        <div className="flex gap-2 items-center">
                          <img
                            src={cardPerson}
                            alt="lock"
                            className="h-[0.65rem]"
                          />
                          <div className="text-white font-semibold text-[0.65rem]">
                            Subscription Cost
                          </div>
                        </div>
                        <div className="text-white font-semibold">$ 0</div>
                      </div>

                      <div className="flex justify-center">
                        <div className="stacting-pag1-card1-btn text-xl font-bold w-fit px-10 py-[0.35rem]  text-white rounded-xl hover:bg-blue-900/30 transition-colors cursor-pointer">
                          Start Now
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 2 - Green */}
                <div
                  className="relative w-full max-w-sm "
                  style={{
                    backgroundImage: `url(${card2})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    height: "450px",
                  }}
                >
                  <div className="py-6 pt-12 px-8 h-full flex flex-col ">
                    <div className="text-center ">
                      <div className="text-white text-4xl font-bold">
                        LEARNER
                      </div>
                      <div className="text-[#39B54A] text-xs font-semibold">
                        Start your journey
                      </div>

                      <div className="text-white text-lg font-bold mt-6">
                        30% P.A.
                      </div>
                      <div className="text-[#39B54A] text-sm font-semibold">
                        Minimum Stake: 500 INR
                      </div>
                    </div>

                    <div className="mt-5">
                      <div className="flex justify-between text-sm mb-3">
                        <div className="flex gap-2 items-center ">
                          <img
                            src={cardLock}
                            alt="lock"
                            className="h-[0.65rem]"
                          />
                          <div className="text-white font-semibold text-[0.65rem]">
                            Referral
                          </div>
                        </div>
                        <div className="text-white font-semibold">30% P.A.</div>
                      </div>
                      <div className="flex justify-between text-sm mb-3">
                        <div className="flex gap-2 items-center">
                          <img
                            src={cardSetting}
                            alt="lock"
                            className="h-[0.65rem]"
                          />
                          <div className="text-white font-semibold text-[0.65rem]">
                            Locking Period
                          </div>
                        </div>
                        <div className="text-white font-semibold">7 days</div>
                      </div>
                      <div className="flex justify-between text-sm mb-8">
                        <div className="flex gap-2 items-center">
                          <img
                            src={cardPerson}
                            alt="lock"
                            className="h-[0.65rem]"
                          />
                          <div className="text-white font-semibold text-[0.65rem]">
                            Subscription Cost
                          </div>
                        </div>
                        <div className="text-white font-semibold">$ 0</div>
                      </div>

                      <div className="flex justify-center">
                        <div className="stacting-pag1-card2-btn text-xl font-bold w-fit px-10 py-[0.35rem]  text-white rounded-xl hover:bg-green-900/30 transition-colors cursor-pointer">
                          Start Now
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 3 - Orange/Brown */}
                <div
                  className="relative w-full min-w-72 max-w-sm"
                  style={{
                    backgroundImage: `url(${card3})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    height: "450px",
                  }}
                >
                  <div className="py-6 pt-12 px-8 h-full flex flex-col ">
                    <div className="text-center ">
                      <div className="text-white text-4xl font-bold">
                        LEARNER
                      </div>
                      <div className="text-[#F78A1E] text-xs font-semibold">
                        Start your journey
                      </div>

                      <div className="text-white text-lg font-bold mt-6">
                        30% P.A.
                      </div>
                      <div className="text-[#F78A1E] text-sm font-semibold">
                        Minimum Stake: 500 INR
                      </div>
                    </div>

                    <div className="mt-5">
                      <div className="flex justify-between text-sm mb-3">
                        <div className="flex gap-2 items-center ">
                          <img
                            src={cardLock}
                            alt="lock"
                            className="h-[0.65rem]"
                          />
                          <div className="text-white font-semibold text-[0.65rem]">
                            Referral
                          </div>
                        </div>
                        <div className="text-white font-semibold">30% P.A.</div>
                      </div>
                      <div className="flex justify-between text-sm mb-3">
                        <div className="flex gap-2 items-center">
                          <img
                            src={cardSetting}
                            alt="lock"
                            className="h-[0.65rem]"
                          />
                          <div className="text-white font-semibold text-[0.65rem]">
                            Locking Period
                          </div>
                        </div>
                        <div className="text-white font-semibold">7 days</div>
                      </div>
                      <div className="flex justify-between text-sm mb-8">
                        <div className="flex gap-2 items-center">
                          <img
                            src={cardPerson}
                            alt="lock"
                            className="h-[0.65rem]"
                          />
                          <div className="text-white font-semibold text-[0.65rem]">
                            Subscription Cost
                          </div>
                        </div>
                        <div className="text-white font-semibold">$ 0</div>
                      </div>

                      <div className="flex justify-center">
                        <div className="stacting-pag1-card3-btn text-xl font-bold w-fit px-10 py-[0.35rem]  text-white rounded-xl hover:bg-green-900/30 transition-colors cursor-pointer">
                          Start Now
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-16 flex justify-center">
                <div className="bg-[#00FFA01A] text-white max-w-2xl w-full rounded-2xl p-8 shadow-lg">
                  <h2 className="text-4xl font-bold text-center mb-8">
                    <span className="bg-gradient-to-r from-[#C3D09D] via-[#31B65E] to-[#3381CD] text-transparent bg-clip-text text-6xl">
                      Refer and Earn
                    </span>
                  </h2>
                  <span className="text-left block">
                    Assured 30,000 TP in Rewards!
                  </span>
                  <ul className="">
                    <li>
                      €100 Referral Reward - upon your referral's Welcome Bonus
                      claim
                    </li>
                    <li>
                      Staking Hike - when your referral matches your staking
                      subscription
                    </li>
                    <li>iPhone - Chance to win</li>
                  </ul>

                  {/* Referral Link */}
                  <div className="mt-6 text-center">
                    <p className="text-lg font-semibold">Referral Link</p>
                    <p className="text-gray-300 text-sm">xxxxxxxxx</p>
                  </div>

                  {/* Invite Button */}
                  <div className="mt-6 flex justify-center">
                    <button className="bg-[#39B54A] text-white font-bold py-3 px-8 rounded-lg hover:bg-green-600 transition">
                      Invite Friends
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Action Buttons */}
              <div className="flex flex-col md:flex-row justify-center gap-6 mb-10">
                <button className="bg-[#39B54A] text-white font-bold py-3 px-12 rounded-lg w-full md:w-64">
                  All Staking
                </button>
                <button className="bg-white text-black font-bold py-3 px-12 rounded-lg w-full md:w-64">
                  Staking Rewards
                </button>
              </div>

              {/* Staking Stats Table */}
              <div className="bg-[#FFFFFF14] rounded-2xl p-6 mb-12 max-w-3xl mx-auto">
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div className="text-white text-lg font-semibold">
                    Staking
                  </div>
                  <div className="text-white text-lg font-semibold">Amount</div>
                  <div className="text-white text-lg font-semibold">Amount</div>
                  <div className="text-white text-lg font-semibold">Amount</div>

                  <div className="text-gray-400 text-lg">0000</div>
                  <div className="text-gray-400 text-lg">0000</div>
                  <div className="text-gray-400 text-lg">0000</div>
                  <div className="text-gray-400 text-lg">0000</div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="max-w-3xl mx-auto">
                <h2 className="text-white text-4xl font-bold text-center mb-8">
                  FAQ
                </h2>

                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 cursor-pointer">
                    <div className="flex justify-between items-center">
                      <span className="text-black font-medium">Q</span>
                      <span className="text-black font-medium">+</span>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 cursor-pointer">
                    <div className="flex justify-between items-center">
                      <span className="text-black font-medium">Q</span>
                      <span className="text-black font-medium">+</span>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 cursor-pointer">
                    <div className="flex justify-between items-center">
                      <span className="text-black font-medium">Q</span>
                      <span className="text-black font-medium">+</span>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 cursor-pointer">
                    <div className="flex justify-between items-center">
                      <span className="text-black font-medium">Q</span>
                      <span className="text-black font-medium">+</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </Background>
  );
};

export default Page1;
