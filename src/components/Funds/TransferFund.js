import React, { useState } from "react";
import Background from "../Background";

const TransferFund = () => {

  const [ isSend, setIsSend ] = useState(false)


  return (
    <Background>
      <div className="min-h-screen flex items-center justify-center ">
        <div className=" p-4 sm:min-w-[40vw]">
          {/* Header Section */}
          <div className="flex justify-center space-x-4 mb-4">
            <button 
            onClick={() => setIsSend(false)}
            className={`${isSend ? 'bg-white text-black' : 'bg-[#4BAF2A] text-white'}  w-32 px-4 py-3 rounded flex items-center justify-center font-semibold `}>
              Receive
            </button>
            <button 
            onClick={() => setIsSend(true)}
            className={`${isSend ? 'bg-[#4BAF2A] text-white' : 'bg-white text-black'}  w-32 px-4  py-3 rounded flex items-center justify-center font-semibold`}>
              Send
            </button>
          </div>
          <div className="text-white text-center mb-4">
            <p className="text-xl font-semibold">Available Balance : 0.00 INR</p>
          </div>

          {/* Middle Section */}
          <div className="flex flex-col items-center mb-4">
            <div className="w-40 h-40 bg-gray-300 border border-gray-400"></div>
            <p className="text-white text-sm mt-2">Scan QR</p>
          </div>

          {/* Form Section */}
          <div className="space-y-4 mb-4">
            <div>
              <select
               className="w-full bg-white text-black p-[11px] rounded border border-gray-300">
                
                <option disabled selected className="text-black/50">
                  Choose assets
                </option>
                <option>Asset 1</option>
                <option>Asset 2</option>
                <option>Asset 3</option>
              </select>
            </div>
            <div>
              <label className="text-white text-sm mb-1 block  text-left">
                YTP Address
              </label>
              <input
                type="text"
                placeholder="XXX"
                className="w-full bg-white text-black p-2 rounded border border-gray-300 px-3"
              />
            </div>
          </div>

          {/* Footer Section */}
          <div className="w-full bg-[#4BAF2A] text-white py-[10px] rounded font-bold">
            Transfer
          </div>
        </div>
      </div>
    </Background>
  );
};

export default TransferFund;
