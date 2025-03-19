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
                console.log(error);
            }
        })();
    },[])

  return (
    <div className="feature-box text-white rounded-2xl shadow-lg max-w-4xl mx-auto w-full overflow-x-auto">
    {/* Table Header */}
    <div className="bg-neutral-900 grid grid-cols-4 gap-4 p-4 text-center">
      <div className="font-medium">Staking ID</div>
      <div className="font-medium">Staking Type</div>
      <div className="font-medium">Amount</div>
      <div className="font-medium">Coin</div>
    </div>

    {/* Table Body (Scrollable) */}
    <div className="max-h-64 overflow-y-auto ">
      {stackingData && stackingData.map((item) => (
        <div
          key={item.id}
          className="grid grid-cols-4 gap-4 p-4 text-center border-t border-gray-700"
        >
          <div className="text-green-400 font-medium">
            {item.staking_number}
          </div>
          <div className="text-gray-200">{item.staking_type}</div>
          <div className="text-gray-200">{item.amount.toPrecision(3)}</div>
          <div className="text-gray-200">{item.coin}</div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default StackingReward