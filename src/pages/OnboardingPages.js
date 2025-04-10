import React, { useState } from "react";
import logo from "../assets/yatri-pay-logo-main.png";
import {
  page1SVG,
  page3SVG,
} from "../assets/onboardingAssets";
import { useNavigate } from "react-router-dom";

const PAGE_DATA = [
  {
    id: 1,
    headingLine1: "365 Days",
    headingLine2: "Withdrawal",
    headingStyle: "",
    buttonText: "Get Started",
    svg: page1SVG,
    svgSize: "h-36 md:h-44",
    handleClick: (fn) => {
      fn();
    },
  },
  {
    id: 2,
    headingLine1: "Book Hotel",
    headingLine2: "& Flights",
    buttonText: "Next",
    svg: '/assets/page-2.svg',
    svgSize: "h-36 md:h-44",
    handleClick: (fn) => {
      fn();
    },
  },
  {
    id: 3,
    headingLine1: "Performance",
    headingLine2: "Overview",
    buttonText: "Next",
    svg: page3SVG,
    svgSize: "h-40 md:h-60",
    handleClick: (fn) => {
      fn();
    },
  },
  {
    id: 4,
    headingLine1: "Chance to win an iPhone",
    headingLine2: "& a trip",
    buttonText: "Next",
    svg: '/assets/page-4.svg',
    svgSize: "h-44",
    handleClick: (fn) => {
      fn();
    },
  },
  {
    id: 5,
    headingLine1: "Unmatched Returns",
    headingLine2: "with Staking",
    subText: "30% p.a.",
    buttonText: "Next",
    handleClick: (fn) => {
      fn();
    },
  },
  {
    id: 6,
    headingLine1: "Zero Fees & Cashback Reward",
    headingLine2: "on YatriPay Transactions",
    buttonText: "Next",
    svg: '/assets/page-6.svg',
    svgSize: "h-44",
    handleClick: (fn) => {
      fn();
    },
  },
];

//Mid Sections
//Common
const CommonMid = ({ currPage, setCurrPage }) => {
  const data = PAGE_DATA[currPage];

  const navigate = useNavigate()

  if (currPage + 1 === 3) {
    return <Page3Mid setCurrPage={setCurrPage} data={data} />;
  }

  if (currPage + 1 === 5) {
    return <Page4Mid setCurrPage={setCurrPage} data={data} />;
  }

  return (
    <div className="flex flex-col items-center ">
      <h1 className=" text-2xl md:text-5xl font-bold ">{data.headingLine1}</h1>
      {data.headingLine2 && (
        <h2 className=" text-2xl md:text-5xl font-bold mb-12 leading-none">
          {data.headingLine2}
        </h2>
      )}
      <div className="mb-12">
        <img src={data.svg} alt="asset" className={`${data.svgSize}`} />
      </div>
      <div
        onClick={() => { currPage === 5 ? navigate('/dashboard') : setCurrPage(++currPage) }}
        className="bg-[#4BAF2A] hover:bg-green-600 text-white font-bold w-fit py-2 px-10 rounded-lg text-xl  cursor-pointer"
      >
        {data.buttonText}
      </div>
    </div>
  );
};

const Page3Mid = ({ data, setCurrPage }) => {
  return (
    <div className="flex flex-col items-center space-y-10">
      <h1 className=" text-2xl md:text-5xl font-bold ">
        {data.headingLine1} {data.headingLine2}
      </h1>
      <div className="relative">
        <img src={data.svg} alt="asset" className={`${data.svgSize}`} />

        {/* Floating Text */}
        <div className="absolute top-8 -left-14 md:top-16 md:-left-24 flex flex-col md:gap-1 ">
          <span className="md:text-lg font-bold">+261%</span>
          <span className="text-[0.7rem]">Yearly</span>
        </div>

        <div className="absolute top-32 -left-16 md:bottom-[0.00rem] md:-left-24 flex flex-col md:gap-1 ">
          <span className="md:text-lg font-bold">&minus;3.84%</span>
          <span className="text-[0.7rem]">Monthly</span>
        </div>

        <div className="absolute top-8 -right-14 md:top-16 md:-right-20 flex flex-col md:gap-1 ">
          <span className="md:text-lg font-bold">+281%</span>
          <span className="text-[0.7rem]">Quaterly</span>
        </div>

        <div className="absolute bottom-[0.01rem] -right-16 md:bottom-[0.00rem] md:-right-20 flex flex-col md:gap-1 ">
          <span className="md:text-lg font-bold">&minus;3.84%</span>
          <span className="text-[0.7rem]">Weekly</span>
        </div>
      </div>
      <div
        onClick={() => setCurrPage((prev) => ++prev)}
        className="bg-[#4BAF2A] hover:bg-green-600 text-white font-bold w-fit py-2 px-10 rounded-lg text-xl  cursor-pointer"
      >
        {data.buttonText}
      </div>
    </div>
  );
};

const Page4Mid = ({ data, setCurrPage }) => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl md:text-5xl font-bold ">{data.headingLine1}</h1>
      {data.headingLine2 && (
        <h2 className="text-2xl md:text-5xl font-bold mb-12 leading-none">
          {data.headingLine2}
        </h2>
      )}
      <div className="mb-12">
        <h1 className="text-9xl font-bold">30%</h1>
        <span className="text-white/95">Annual return with </span><span className="text-yellow-300">YatriPay</span>
      </div>
      <div
        onClick={() => setCurrPage((prev) => ++prev)}
        className="bg-[#4BAF2A] hover:bg-green-600 text-white font-bold w-fit py-2 px-10 rounded-lg text-xl mt-3  cursor-pointer"
      >
        {data.buttonText}
      </div>
    </div>
  );
};

const OnboardingPages = () => {
  const [currPage, setCurrPage] = useState(0);

  return (
    <div className="flex flex-col items-center  min-h-screen text-white">
      {/* Logo */}
      <div className="my-10">
        <img src={logo} alt="YatriPay" className="h-10" />
      </div>

      <CommonMid currPage={currPage} setCurrPage={setCurrPage} />
    </div>
  );
};

export default OnboardingPages;
