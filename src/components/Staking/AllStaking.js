import React, { useEffect, useState } from "react";
import { getAllStacking } from "../../services/stacking/stackingAPI";
import dayjs from "dayjs";
import Loader from "../common/Loader";

const AllStaking = () => {
  const [stackingList, setStackingList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true)
        const res = await getAllStacking();
        if (res && res.data) {
          const newData = updateDateFormat(res.data);
          setStackingList(newData);
        }
      } catch (error) {
        // console.log(error);
      }finally{
        setIsLoading(false)
      }
    })();
  }, []);

  if (!stackingList) {
    return <Loader />
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
            <span className="text-white text-lg font-semibold">Staking %</span>
            <span className="text-white text-lg font-semibold">Status</span>
          </div>

          {stackingList && stackingList.map((stack, index) => (
            <div
              key={index}
              className="col-span-7 grid grid-cols-7 items-center text-gray-300"
            >
              <span className="text-sm text-green-500">
                {stack.staking_number}
              </span>
              <span>{stack.lock_amount.toFixed(2)}</span>
              <span className="text-sm">{stack.created_at}</span>
              <span className="text-sm">{stack.updated_at}</span>
              <span className="text-sm">{stack.end_at}</span>
              <span>{stack.per_annum + stack.per_annum_hike}%</span>
              <span>{stack.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllStaking;
