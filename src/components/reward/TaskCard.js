import React from "react";
import { cardLock } from "../../assets/stacking/page1";
import { taskConfigurations } from "../../pages/Reward/taskConfig";

const getTaskReward = (task) => {
  if (task.reward_amount > 0) return task.reward_amount;
  if (task.sub_tasks && task.sub_tasks.length > 0) {
    const sub = task.sub_tasks.find((st) => st.reward_amount > 0);
    return sub ? sub.reward_amount : null;
  }
  return null;
};

const getStatusBadge = (status) => {
  const statusLower = status.toLowerCase();
  const styles = {
    pending: "bg-[#e1bf26eb] px-8 py-1",
    completed: "bg-[#4BAF2A] px-3 py-[0.35rem]",
    start: "bg-[#4BAF2A] min-w-32 px-3 py-[0.35rem]",
    missed: "bg-red-500 px-3 py-[0.35rem]",
    submitted: "bg-[#df3434] px-3 py-[0.35rem]",
  };
  return (
    <div className={`${styles[statusLower]} text-white font-medium rounded-lg cursor-pointer`}>
      {status}
    </div>
  );
};

const TaskCard = ({ task, onClick }) => {
  const effectiveReward = getTaskReward(task);
  const config = taskConfigurations[task.id] || taskConfigurations.default;

  return (
    <div
      onClick={() => onClick(task, config)}
      className="feature-box bg-[#FFFFFF26] rounded-xl mb-4 p-8 px-10 cursor-pointer"
    >
      <h2 className="font-semibold text-lg md:text-xl mb-8">{task.name}</h2>

      <div className="md:flex w-full items-center">
        <div className="md:px-16 flex-1 mb-4">
          {effectiveReward && (
            <div className="flex items-center justify-between flex-1">
              <div className="flex items-center gap-1">
                <img src={cardLock} alt="Lock" className="h-4 w-4" />
                <span className="text-xs md:text-sm">Max Reward</span>
              </div>
              <span className="font-medium">₹ {effectiveReward}</span>
            </div>
          )}
        </div>
        <div
          className={`flex ${config.showQuitButton ? "justify-between px-10" : "justify-end"} items-center`}
        >
          {config.showQuitButton && (
            <div className="bg-red-500 py-[0.35rem] px-10 rounded-lg">Quit</div>
          )}
          {getStatusBadge(task.status)}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;