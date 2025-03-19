import React, { useEffect, useState } from "react";
import { phoneSvg } from "../../assets/stacking";
import { cardLock } from "../../assets/stacking/page1";
import { getIphoneTaskList } from "../../services/promotion/promotionAPI";
import Footer from "../../components/common/Footer";

const PhoneGiveaway = () => {

  const [taskList, setTaskList] = useState([])

  useEffect(() => {
    ;(async () => {
      try {
        const res = await getIphoneTaskList()
        console.log(res);
        if(res){
          setTaskList(res)
        }
      } catch (error) {
        console.log(error);
      }
    })()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 px-4 text-white">
      <div className="w-full space-y-10">
        {/* Header */}
        <div className="text-center mb-6 space-y-10  md:mt-12">
          <h1 className="text-4xl md:text-7xl font-bold mb-4">iPhone Giveaway</h1>

          {/* Phone Image Placeholder */}
          <div className="flex justify-center mb-4">
            <img src={phoneSvg} alt="iPhone" className="h-[12rem]" />
          </div>

          <p className="text-3xl font-semibold mb-4">
            WIN an iPhone or Foreign Trip.
          </p>
          <div className="max-w-lg mx-auto font-semibold space-y-4">
            <p className=" mb-2">
              Claim rewards up to 30,000 ₹ with 7 Easy Tasks.
            </p>
            <p className=" mb-2">
              Each tasks has few sub tasks and you instantly Earn Assured
              Rewards with each Completed Task.
            </p>
            <p className=" mb-6">
              Users like you who complete all 7 Tasks will stand a chance to WIN
              an iPhone or Foreign Trip. Don't forget to verifiy this your
              rewards which you earned
            </p>
          </div>
        </div>

        <div className="xl:px-[16rem]">
          {taskList && taskList.map((task) => (
            <div
              key={task.id}
              className="bg-[#FFFFFF1F] rounded-xl mb-4 p-8 px-10"
            >
              <h2 className="font-semibold text-xl md:text-2xl mb-8">{task.name}</h2>

              <div className="md:flex w-full items-center">
                <div className="md:px-16 flex-1 mb-4">
                  <div className="flex items-center justify-between flex-1 ">
                    <div>
                      <img src={cardLock} alt="Lock" className="h-4 w-4 md:mr-2" />
                      <span className="text-xs md:text-sm md:mr-3">Max Reward</span>
                    </div>
                    <div>
                      <span className="font-medium">{task.reward_amount}</span>
                      {task.additionalReward && (
                        <span className="md:ml-3 font-medium">
                          + {task.additionalReward}
                        </span>
                      )}
                    </div>
                  </div>

                  {task.stackingReferral && (
                    <div className="flex items-center mt-2 ">
                      <img src={cardLock} alt="Lock" className="h-4 w-4 mr-2" />
                      <span className="text-xs md:text-sm md:mr-3 pr-2 text-left whitespace-break-spaces">
                        Staking Referral Reward
                      </span>
                      <span className="font-medium ">
                        {task.additionalReward}
                      </span>
                    </div>
                  )}
                </div>
                {task.status === "start" ? (
                  <div className="bg-[#4BAF2A] text-white font-semibold px-8 py-1 rounded-lg cursor-pointer">
                    Start
                  </div>
                ) : (
                  <div className="bg-white text-black font-semibold px-3 py-[0.35rem] rounded-lg cursor-pointer">
                    Pending
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <section className="flex mt-16 md:-ml-[12vw]">
        <Footer />
      </section>
    </div>
  );
};

export default PhoneGiveaway;
