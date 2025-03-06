import React from "react";

const Background = ({ children }) => {
  return (
    <div className=" min-h-screen  bg-black relative overflow-x-hidden">
      <div className="absolute top-36 -left-40 w-52 lg:w-56 xl:w-96 h-72 bg-green-600 rounded-full opacity-45 blur-[80px]"></div>
      <div className="absolute top-56 -right-40 w-52 lg:56 xl:w-96 h-72 bg-green-600 rounded-full opacity-45 blur-[80px]"></div>
      {/* <div className="absolute top-48 -right-40 w-80 h-72 bg-green-500 rounded-full opacity-35 blur-[80px]"></div> */}
      {/* <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-green-500 rounded-full opacity-20 blur-3xl"></div> */}

      {/* <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-b from-[#00FF00] to-transparent opacity-30 blur-3xl"></div> */}
      {/* <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-b from-[#00FF00] to-transparent opacity-30 blur-3xl"></div> */}

      {/* <div className="p-6 flex items-center justify-center pt-20 z-10">
        <div className="flex items-center">
          <span className="text-yellow-400 text-2xl font-bold">YatriPay</span>
          <div className="ml-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
            <span className="text-black font-bold text-xs">jy</span>
          </div>
        </div>
      </div> */}



      {/* <div className=" min-h-[1400px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
        <h1 className="text-6xl font-bold text-white">Notification Center</h1>
      </div> */}

      {children}
    </div>
  );
};

export default Background;
