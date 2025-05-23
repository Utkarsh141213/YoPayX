import React, { useEffect, useState } from "react";
import { phoneSvg } from "../../assets/stacking";
import { cardLock } from "../../assets/stacking/page1";
import { getIphoneTaskList } from "../../services/reward/rewardAPI";
import Footer from "../../components/common/Footer";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/common/Loader";
import { FaArrowLeft } from "react-icons/fa";


// Helper function: find the first nonzero reward in either the task or its sub_tasks
function getTaskReward(task) {
  if (task.reward_amount > 0) {
    return task.reward_amount;
  }
  // Otherwise, check subtasks
  if (task.sub_tasks && task.sub_tasks.length > 0) {
    const sub = task.sub_tasks.find((st) => st.reward_amount > 0);
    if (sub) {
      return sub.reward_amount;
    }
  }
  return null; // no valid reward found
}

const TaskCard = ({ task }) => {
  const effectiveReward = getTaskReward(task);
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (task.status.toLowerCase() !== "start") {
      navigate("/iphone-sub-task", { state: { task } });
    }
  };

  return (
    <div
      onClick={handleClick}
      key={task.id}
      className={`feature-box bg-[#FFFFFF26] rounded-xl mb-4 p-8 px-10 ${
        task.status.toLowerCase() !== "start" ? "cursor-pointer" : ""
      }`}
    >
      <h2 className="font-semibold text-xl md:text-2xl mb-8">{`Task ${task.id}: ${task.name}`}</h2>

      <div className="md:flex w-full items-center">
        <div className="md:px-16 flex-1 mb-4">
          {/* Only show "Max Reward" row if we have a nonzero reward */}
          {effectiveReward && (
            <div className="flex items-center justify-between flex-1">
              <div className="flex items-center gap-1">
                <img src={cardLock} alt="Lock" className="h-4 w-4" />
                <span className="text-xs md:text-sm">Max Reward</span>
              </div>
              <div>
                <span className="font-medium">
                  &#8377; {effectiveReward}{" "}
                  {task.id === 5 && (
                    <span className="text-sm">+ 10,000 YTP</span>
                  )}
                </span>
                {task.additionalReward && (
                  <span className="md:ml-3 font-medium">
                    + {task.additionalReward}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* If there's a stackingReferral field, show it */}
          {task.stackingReferral && (
            <div className="flex items-center mt-2">
              <img src={cardLock} alt="Lock" className="h-4 w-4 mr-2" />
              <span className="text-xs md:text-sm md:mr-3 pr-2 text-left whitespace-break-spaces">
                Staking Referral Reward
              </span>
              <span className="font-medium">{task.additionalReward}</span>
            </div>
          )}
        </div>

        {task.status.toLowerCase() === "pending" && (
          <div className="bg-[#e1bf26eb] text-white font-medium px-8 py-1 rounded-lg cursor-pointer">
            {task.status}
          </div>
        )}
        {task.status.toLowerCase() === "completed" && (
          <div className="bg-[#4BAF2A] text-white font-medium px-3 py-[0.35rem] rounded-lg cursor-pointer">
            {task.status}
          </div>
        )}
        {task.status.toLowerCase() === "start" && (
          <div className="bg-[#4BAF2A] min-w-32 text-white font-medium px-3 py-[0.35rem] rounded-lg cursor-pointer">
            {task.status}
          </div>
        )}
        {task.status.toLowerCase() === "missed" && (
          <div className="bg-red-500 min-w-32 text-white font-medium px-3 py-[0.35rem] rounded-lg cursor-pointer">
            {task.status}
          </div>
        )}
      </div>
    </div>
  );
};

const PhoneGiveaway = () => {
  const [taskList, setTaskList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const res = await getIphoneTaskList();
        if (res) {
          setTaskList(res);
        }
      } catch (error) {
        // console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <div className="reletive flex flex-col items-center justify-center min-h-screen py-8 px-4 text-white">
            <div
        onClick={() => window.history.back()}
        className="feature-box absolute top-4 left-4 md:top-8 md:left-8 bg-[#FFFFFF14] px-3 py-2 rounded-lg cursor-pointer"
      >
        <FaArrowLeft />
      </div>
      <div className="w-full space-y-10 mt-10 md:mt-auto">
        {/* Header */}
        <div className="text-center mb-6 space-y-10 md:mt-12">
          <h1 className="text-4xl md:text-7xl font-bold mb-4">
            iPhone Giveaway
          </h1>

          {/* Phone Image Placeholder */}
          <div className="flex justify-center mb-4">
            <img src={phoneSvg} alt="iPhone" className="h-[12rem]" />
          </div>

          <p className="text-3xl font-semibold mb-4">
            WIN an iPhone or Foreign Trip.
          </p>
          <div className="max-w-lg mx-auto font-semibold space-y-4">
            <p className="mb-2">
              Claim rewards up to 30,000 ₹ with 7 Easy Tasks.
            </p>
            <p className="mb-2">
              Each tasks has few sub tasks and you instantly Earn Assured
              Rewards with each Completed Task.
            </p>
            <p className="mb-6">
              Users like you who complete all 7 Tasks will stand a chance to WIN
              an iPhone or Foreign Trip. Don't forget to verify the rewards you
              earned
            </p>
          </div>
        </div>

        {/* Task List */}
        {isLoading ? (
          <Loader />
        ) : (
          <div className="xl:px-[16rem]">
            {taskList && taskList.map((task) => <TaskCard task={task} />)}
          </div>
        )}
      </div>

      <section className="flex mt-16 md:-ml-[12vw]">
        <Footer />
      </section>
    </div>
  );
};

export default PhoneGiveaway;
