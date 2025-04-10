import { useEffect, useState } from "react";
import { taskListSvg } from "../../assets/stacking";
import { getTaskList } from "../../services/reward/rewardAPI";
import Footer from "../../components/common/Footer";
import { useNavigate } from "react-router-dom";
import SocialMediaScreenshotUpload from "./SocialMediaScreenshotUpload";

const WelcomeBonus = () => {
  const [taskList, setTaskList] = useState([]);
  const [showSocialMediaProof, setShowSocialMediaProof] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const res = await getTaskList();
        if (res) {
          setTaskList(res);
        }
      } catch (error) {
        // console.log(error);
      }
    })();
  }, []);

  const handleCardClick = (taskId) => {
    // console.log(taskId);
    if (taskId === 12) {
      navigate("/staking-summary");
    } else if (taskId === 14) {
      setShowSocialMediaProof(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 px-4 mt-10">
      {showSocialMediaProof && (
        <div className="fixed top-0 h-[100vh] w-[100vw] flex justify-center items-center px-4 bg-black/20">
          {" "}
          <SocialMediaScreenshotUpload
            taskId={14}
            setShowSocialMediaProof={setShowSocialMediaProof}
            step1={'Step 1: Give a 5 Star rating along with a good review on Google PlayStore'}
            step2={'Step 2: Please upload a screenshot of Rating & Review'}
          />{" "}
        </div>
      )}
      <div className="w-full xl:px-[16rem] space-y-10">
        <div className="text-center space-y-10">
          <h1 className="text-white font-bold text-3xl sm:text-5xl md:text-7xl mb-4">
            Tasks List
          </h1>

          <div className="flex justify-center">
            <div className="w-fit h-24 sm:h-32 md:h-40 flex items-center justify-center">
              <img src={taskListSvg} alt="Calender svg" className="h-full" />
            </div>
          </div>

          <div>
            <span className="text-white font-semibold block leading-none">
              Participate now and earn rewards.
            </span>
            <span className="text-white mb-6 font-semibold leading-none">
              Your chance to win an iPhone or foreign trip.
            </span>
          </div>
        </div>

        <div className="space-y-4 w-full">
          {taskList &&
            taskList.map((task, index) => (
              <div
                key={task.id}
                onClick={() => handleCardClick(task.id)}
                className={`bg-[#FFFFFF1F] rounded-lg p-4 ${
                  task.id === 12 || task.id === 14 ? " cursor-pointer" : ""
                }`}
              >
                <h3 className="text-xl font-bold text-white mb-3">
                  Task {index + 1}
                </h3>
                <p className="text-white mt-2">{task.name}</p>
                <div className="flex justify-center mt-3">
                  {task.status.toLowerCase() === "completed" && (
                    <div className="bg-[#4BAF2A] text-white font-semibold px-3 py-[0.35rem] rounded-lg cursor-pointer">
                      {task.status}
                    </div>
                  )}
                  {task.status.toLowerCase() === "pending" && (
                    <div className="bg-[#e1bf26eb] text-white font-semibold px-3 py-[0.35rem] rounded-lg cursor-pointer">
                      {task.status}
                    </div>
                  )}
                  {task.status.toLowerCase() === "submitted" && (
                    <div className="bg-red-500 text-white font-semibold px-3 py-[0.35rem] rounded-lg cursor-pointer">
                      {task.status}
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

export default WelcomeBonus;
