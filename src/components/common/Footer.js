import React from "react";

const Footer = () => {

    let date = new Date()
    date = date.getFullYear()

  return (
    <div className="text-left text-[#808080] flex-col justify-center items-center mb-8">
      <div className="">
        <span className="text-2xl md:text-4xl font-bold  ">YatriPay is</span>
        <span className="text-4xl md:text-7xl font-extrabold ml-1">100%</span>
        <div className=" text-2xl md:text-4xl font-bold w-fit">Safe and Decentralized!</div>
      </div>
      <div className="md:text-lg mt-2 md:mt-4 mb-4 md:mb-8 ">
        <span>
          Your Assets and Transactions are secured with out YVM Blockchain.
        </span>
        <span className="block  w-fit">You can check entire yatripay transactions on explorer.</span>
      </div>
      <div className="w-fit">
        <span className="text-lg ">Copyright © {date} YatriPay. All Rights Reserved</span>
      </div>
    </div>
  );
};

export default Footer;
