import React, { useEffect, useState } from "react";
import { phoneSvg } from "../../assets/stacking";
import { cardLock } from "../../assets/stacking/page1";
import { FaArrowLeft } from "react-icons/fa";
import Footer from "../../components/common/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import SocialMediaScreenshotUpload from "./SocialMediaScreenshotUpload";
import { quitTask } from "../../services/reward/rewardAPI";
import { toast } from "react-toastify";

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

const TaskCard = ({ task, setSelectedTaskId, setShowSocialMediaProof }) => {
  const effectiveReward = getTaskReward(task);

  const navigate = useNavigate();

  const handleCardClick = () => {
    if (task.id === 5) {
      navigate("/welcome-bonus");
    } else if (task.is_social_media && task.status.toLowerCase() !== "start") {
      setSelectedTaskId(task.id);
      setShowSocialMediaProof(true);
    }
  };

  return (
    <div
      key={task.id}
      onClick={handleCardClick}
      className={`feature-box bg-[#FFFFFF26] rounded-xl mb-4 p-8 px-10 ${
        task.status.toLowerCase() !== "start" ? "cursor-pointer" : ""
      }`}
    >
      <h2 className="font-semibold text-lg md:text-xl mb-8">{task.name}</h2>

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
                <span className="font-medium">&#8377; {effectiveReward}</span>
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
            Pending
          </div>
        )}
        {task.status.toLowerCase() === "completed" && (
          <div className="bg-[#4BAF2A] text-white font-medium px-3 py-[0.35rem] rounded-lg cursor-pointer">
            {task.status}
          </div>
        )}
        {task.status.toLowerCase() === "start" && (
          <div className="bg-[#4BAF2A] text-white font-medium px-3 py-[0.35rem] rounded-lg cursor-pointer">
            {task.status}
          </div>
        )}
        {task.status.toLowerCase() === "submitted" && (
          <div className="bg-[#df3434] text-white font-medium px-3 py-[0.35rem] rounded-lg cursor-pointer">
            {task.status}
          </div>
        )}
      </div>
    </div>
  );
};

const SpecialTaskCard = ({
  task,
  setSelectedTaskId,
  setShowSocialMediaProof,
}) => {
  const effectiveReward = getTaskReward(task);


  const handleCardClick = () => {
    if (task.is_social_media && task.status.toLowerCase() !== "start") {
      setSelectedTaskId(task.id);
      setShowSocialMediaProof(true);
    }
  };

  const handleQuitTask = async (id) => {
    try {
      await quitTask({ task_id: id, is_exit: 1 });
      toast.success("Requested Quit successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message)
    }
  };

  return (
    <div
      key={task.id}
      onClick={handleCardClick}
      className={`feature-box bg-[#FFFFFF26] rounded-xl mb-4 p-4 md:py-8 md:px-10 ${
        task.status.toLowerCase() !== "start" && task.is_social_media
          ? "cursor-pointer"
          : ""
      }`}
    >
      <h2 className="font-semibold text-lg md:text-xl mb-8">{task.name}</h2>

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
                <span className="font-medium">&#8377; {effectiveReward}</span>
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
      </div>
      <div
        className={`flex ${
          task.id === 9 ? "justify-between  md:px-10" : "justify-end"
        }  items-center`}
      >
        {task.id === 9 && (
          <div 
          onClick={(e) => {
            e.stopPropagation()
            handleQuitTask(task.id)}}
          className=" bg-red-500 py-[0.35rem] px-10 rounded-lg">Quit</div>
        )}
        {task.status.toLowerCase() === "pending" && (
          <div className="bg-[#e1bf26eb] text-white font-medium px-8 py-[0.35rem] rounded-lg cursor-pointer">
            Pending
          </div>
        )}
        {task.status.toLowerCase() === "completed" && (
          <div className="bg-[#4BAF2A] text-white font-medium px-8 py-[0.35rem] rounded-lg cursor-pointer">
            {task.status}
          </div>
        )}
        {task.status.toLowerCase() === "start" && (
          <div className="bg-[#4BAF2A] text-white font-medium px-8 py-[0.35rem] rounded-lg cursor-pointer">
            {task.status}
          </div>
        )}
        {task.status.toLowerCase() === "missed" && (
          <div className="bg-[#df3434] text-white font-medium px-8 py-[0.35rem] rounded-lg cursor-pointer">
            {task.status}
          </div>
        )}
      </div>
    </div>
  );
};

const IphoneSubTask = () => {
  const [task, setTask] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState();
  const [showSocialMediaProof, setShowSocialMediaProof] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const { task } = location.state;
    console.log(task);
    setTask(task);
  }, [location.state]);

  if (task.id === 6 || task.id === 7 || task.id === 8) {
    return (
      <div className="relative flex flex-col items-center justify-center min-h-screen py-8 px-4 text-white">
        {showSocialMediaProof && (
          <div className="fixed top-0 h-[100vh] w-[100vw] flex justify-center items-center px-4 bg-black/20">
            {" "}
            <SocialMediaScreenshotUpload
              taskId={selectedTaskId}
              setShowSocialMediaProof={setShowSocialMediaProof}
            />{" "}
          </div>
        )}
        <div
          onClick={() => window.history.back()}
          className="feature-box absolute top-4 left-4 md:top-8 md:left-8 bg-[#FFFFFF14] px-3 py-2 rounded-lg cursor-pointer"
        >
          <FaArrowLeft />
        </div>
        <div className="w-full space-y-10 mt-8 md:mt-auto">
          {/* Header */}
          <div className="text-center mb-6 space-y-10 md:mt-12">
            <h1 className="text-4xl md:text-7xl font-bold mb-4">
              iPhone Giveaway
            </h1>

            {/* Phone Image Placeholder */}
            <div className="flex justify-center mb-4">
              <img src={phoneSvg} alt="iPhone" className="h-[12rem]" />
            </div>

            <div className="max-w-lg mx-auto font-semibold space-y-4">
              <p className="mb-2">
                {`Complete following Sub-Tasks to mark your Task ${task.id} Completed and Earn Rewards`}
              </p>
            </div>
          </div>

          {/* Task List */}
          <div className="xl:px-[16rem]">
            {task?.sub_tasks &&
              // task.sub_tasks.reverse().map((task, idx) => { required in staging
              task.sub_tasks.map((task, idx) => {
                
                if (task.id === 9 || task.id === 19) {
                  return (
                    <SpecialTaskCard
                      task={task}
                      setSelectedTaskId={setSelectedTaskId}
                      setShowSocialMediaProof={setShowSocialMediaProof}
                    />
                  );
                }
                return (
                  <div className="max-w-lg mx-auto mb-2">
                    <p className="mb-2">
                      {idx + 1}. {task.name}
                    </p>
                  </div>
                );
              })}
            {/* {task.id === 7 && <SpecialTaskCard task={{id: 7, }}/>} */}
          </div>
        </div>

        <section className="flex mt-16 md:-ml-[12vw]">
          <Footer />
        </section>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen py-8 px-4 text-white">
      {showSocialMediaProof && (
        <div className="fixed top-0 h-[100vh] w-[100vw] flex justify-center items-center px-4 bg-black/20">
          {" "}
          <SocialMediaScreenshotUpload
            taskId={selectedTaskId}
            setShowSocialMediaProof={setShowSocialMediaProof}
            step1={'Step 1: Please like or follow any two of the following social media account (Tap on button to open)'}
            step2={'Step 2: Now upload both the screenshots'}
          />{" "}
        </div>
      )}
      <div
        onClick={() => window.history.back()}
        className="feature-box absolute top-4 left-4 md:top-8 md:left-8 bg-[#FFFFFF14] px-3 py-2 rounded-lg cursor-pointer"
      >
        <FaArrowLeft />
      </div>
      <div className="w-full space-y-10 mt-8 md:mt-auto">
        {/* Header */}
        <div className="text-center mb-6 space-y-10 md:mt-12">
          <h1 className="text-4xl md:text-7xl font-bold mb-4">
            iPhone Giveaway
          </h1>

          {/* Phone Image Placeholder */}
          <div className="flex justify-center mb-4">
            <img src={phoneSvg} alt="iPhone" className="h-[12rem]" />
          </div>

          <div className="max-w-lg mx-auto font-semibold space-y-4">
            <p className="mb-2">
              {`Complete following Sub-Tasks to mark your Task ${task.id} Completed and Earn Rewards`}
            </p>
          </div>
        </div>

        {/* Task List */}
        <div className="xl:px-[16rem]">
          {task?.sub_tasks &&
            task.sub_tasks.map((task) => (
              <TaskCard
                task={task}
                setSelectedTaskId={setSelectedTaskId}
                setShowSocialMediaProof={setShowSocialMediaProof}
              />
            ))}
        </div>
      </div>

      <section className="flex mt-16 md:-ml-[12vw]">
        <Footer />
      </section>
    </div>
  );
};

export default IphoneSubTask;
