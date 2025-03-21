import { useEffect, useState } from "react";
import { taskListSvg } from "../../assets/stacking";
import { getTaskList } from "../../services/reward/rewardAPI";
import Footer from "../../components/common/Footer";

const TaskList = () => {

  const [taskList, setTaskList] = useState([])

  useEffect(() => {
    ;(async () => {
      try {
        const res = await getTaskList()
        if(res){
          setTaskList(res)
        }
      } catch (error) {
        console.log(error);
      }
    })()
  }, [])
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 px-4 mt-10">
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
          {taskList && taskList.map((task, index) => (
            <div
              key={task.id}
              className="bg-[#FFFFFF1F] rounded-lg p-4"
            >
              <h3 className="text-xl font-bold text-white mb-3">
                Task {index+1}
              </h3>
              <p className="text-white mt-2">{task.name}</p>
              <div className="flex justify-center mt-3">
                <div
                  className={`px-4 py-1 rounded-lg font-bold ${
                    task.status.toLowerCase() === "completed"
                      ? "bg-[#4BAF2A] text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {task.status}
                </div>
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

export default TaskList;
