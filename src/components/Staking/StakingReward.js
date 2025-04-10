import React, { useEffect, useState } from 'react'
import { getStackingReward } from '../../services/stacking/stackingAPI';

const StackingReward = () => {

    const [stackingData, setStackingData] = useState([])

    useEffect(() => {
        ;(async () => {
            try {
                const res = await getStackingReward()
                if(res && res.data){
                    setStackingData(res.data)
                }
            } catch (error) {   
                // console.log(error);
            }
        })();
    },[])

  return (
    <div className="feature-box text-white rounded-2xl shadow-lg max-w-4xl mx-auto w-full overflow-x-auto">
    {/* Table Header */}
    <div className="bg-neutral-900 grid md:grid-cols-4 grid-cols-6 md:gap-4 py-4 md:p-4 text-center text-sm md:text-base">
      <div className="font-medium text-left ml-2 md:ml-0 md:text-center col-span-2 md:col-span-1">Staking ID</div>
      <div className="font-medium col-span-2 md:col-span-1">Staking Type</div>
      <div className="font-medium">Amount</div>
      <div className="font-medium">Coin</div>
    </div>

    {/* Table Body (Scrollable) */}
    <div className="max-h-64 overflow-y-auto ">
      {stackingData && stackingData.map((item) => (
        <div
          key={item.id}
          className="grid md:grid-cols-4 grid-cols-6 md:gap-4 py-3 md:p-4 text-center text-xs md:text-base border-t border-gray-700"
        >
          <div className="text-green-400  font-medium col-span-2 md:col-span-1">
            {item.staking_number}
          </div>
          <div className="text-gray-200  col-span-2 md:col-span-1">{item.staking_type}</div>
          <div className="text-gray-200 ">{item.amount.toPrecision(3)}</div>
          <div className="text-gray-200 ">{item.coin}</div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default StackingReward