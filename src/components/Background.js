import React from "react";

const Background = ({ children }) => {
  return (
    <div className=" min-h-screen  bg-black relative overflow-x-hidden">
      <div className="absolute top-36 -left-40 w-52 lg:w-56 xl:w-96 h-72 bg-green-600 rounded-full opacity-45 blur-[80px]"></div>
      <div className="absolute top-56 -right-40 w-52 lg:56 xl:w-96 h-72 bg-green-600 rounded-full opacity-45 blur-[80px]"></div>
      {children}
    </div>
  );
};

export default Background;
