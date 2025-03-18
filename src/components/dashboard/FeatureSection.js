import React, { useState, useEffect } from "react";
import { fire, road } from '../../assets/home_page_assets'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const FeatureSection = () => {
  const featureCards = [
    {
      text1: "Zero Transaction",
      text2: "Fees",
      img: fire,
      className: "bg-gradient-to-r from-[#C5882D] to-[#B72346]",
    },
    {
      text1: "Daily",
      text2: "Rewards",
      img: road,
      className: "bg-gradient-to-r from-[#979DD8] to-[#4431BA]",
    },
    {
      text1: "Transparent Ledger",
      img: fire,
      className: "bg-gradient-to-r py-[20px] from-[#C5882D] to-[#B72346]",
    },
    {
      text1: "Cashback Reward",
      img: road,
      className: "bg-gradient-to-r py-[20px] from-[#979DD8] to-[#4431BA]",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % featureCards.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? featureCards.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    
    setInterval(() => {
      handleNext()
    }, 3000)
  
    return () => {
      
    }
  }, [])

  return (
    <div className="w-[70vw] mx-auto flex items-center justify-center gap-8 mb-8 py-[8vh] px-[14vw]">
      {/* Left Button */}
      <div
        onClick={handlePrev}
        className="feature-box  min-w-10 min-h-10 flex justify-center items-center  text-white rounded-full hover:bg-neutral-700/50 transition cursor-pointer"
      >
        <FaChevronLeft />
      </div>

      {/* FeatureCard (Only one visible at a time) */}
      <div className="w-full flex justify-center">
        <FeatureCard
          text1={featureCards[activeIndex].text1}
          text2={featureCards[activeIndex].text2}
          img={featureCards[activeIndex].img}
          className={featureCards[activeIndex].className}
        />
      </div>

      {/* Right Button */}
      <div
        onClick={handleNext}
        className="feature-box min-w-10 min-h-10 flex justify-center items-center  text-white rounded-full hover:bg-neutral-700/50 transition cursor-pointer"
      >
        <FaChevronRight />
      </div>
    </div>
  );
};

const FeatureCard = ({
  text1 = "XX",
  text2 = null,
  className = "",
  img = "",
}) => {
  return (
    <div className="feature-box md:min-h-48 min-w-[40vw] flex items-center justify-center  bg-[#FFFFFF14]  rounded-3xl pb-12 pt-16 w-full relative justify-self-center md:justify-self-end">
      <div className="absolute -top-3 -right-3 rounded-full flex items-center justify-center backdrop-blur-sm">
        <img src={img} alt="flame icon" className="w-10 h-10" />
      </div>
      <p
        className={`text-2xl md:text-4xl font-bold text-center text-transparent bg-clip-text leading-none ${className}`}
      >
        {text1}
        {text2 && (
          <>
            <br />
            {text2}
          </>
        )}
      </p>
    </div>
  );
};

export default FeatureSection;
