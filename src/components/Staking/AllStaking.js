import React, { useEffect, useState } from "react";
import { getAllStacking } from "../../services/stacking/stackingAPI";
import dayjs from "dayjs";

const AllStaking = () => {
  const [stackingList, setStackingList] = useState(null);

  function formatWithDayjs(dateString) {
    const parsed = dayjs(dateString);
    return parsed.format("YYYY-MM-DD hh:mm a");
  }

  const updateDateFormat = (list) => {
    const newList = list.map((item) => {
      item.created_at = formatWithDayjs(item.created_at);
      item.updated_at = formatWithDayjs(item.updated_at);
      item.end_at = formatWithDayjs(item.end_at);

      return item;
    });
    return newList;
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await getAllStacking();
        console.log(res);
        if (res && res.data) {
          const newData = updateDateFormat(res.data);
          // console.log(newData);
          setStackingList(newData);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  if (!stackingList) {
    return <div>loading...</div>;
  }
  return (
    <div className="overflow-x-auto mb-12">
      <div className="bg-[#FFFFFF14] rounded-2xl p-6 min-w-[800px] mx-auto">
        <div className="grid grid-cols-7 gap-4 text-center">
          <div className="col-span-7 grid grid-cols-7">
            <span className="text-white text-lg font-semibold">Staking</span>
            <span className="text-white text-lg font-semibold">Amount</span>
            <span className="text-white text-lg font-semibold">Start Date</span>
            <span className="text-white text-lg font-semibold">
              Last Update
            </span>
            <span className="text-white text-lg font-semibold">
              Unlock Date
            </span>
            <span className="text-white text-lg font-semibold">Stacking %</span>
            <span className="text-white text-lg font-semibold">Status</span>
          </div>

          {stackingList.map((stack, index) => (
            <div
              key={index}
              className="col-span-7 grid grid-cols-7 items-center text-gray-300"
            >
              <span className="text-sm text-green-500">
                {stack.staking_number}
              </span>
              <span>{stack.lock_amount}</span>
              <span className="text-sm">{stack.created_at}</span>
              <span className="text-sm">{stack.updated_at}</span>
              <span className="text-sm">{stack.end_at}</span>
              <span>{stack.per_annum}%</span>
              <span>{stack.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllStaking;
