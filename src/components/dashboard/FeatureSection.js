import React, { useState, useEffect, useRef } from "react";
import { fire, road } from "../../assets/home_page_assets"; // Ensure these paths are correct
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
      className:
        "bg-gradient-to-r min-h-[4.9vh] px-2 sm:py-[20px] from-[#C5882D] to-[#B72346]",
    },
    {
      text1: "Cashback Reward",
      img: road,
      className:
        "bg-gradient-to-r min-h-[4.9vh] sm:py-[20px] from-[#979DD8] to-[#4431BA]",
    },
  ];

  const displayedCards = [...featureCards, featureCards[0]];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [applyTransition, setApplyTransition] = useState(true);
  const trackRef = useRef(null);

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  // const handlePrev = () => {
  //   setCurrentIndex((prev) => (prev - 1 + displayedCards.length) % displayedCards.length);
  // };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const handleTransitionEnd = () => {
      if (currentIndex === displayedCards.length - 1) {
        setApplyTransition(false);
        setCurrentIndex(0);
      }
    };
    track.addEventListener("transitionend", handleTransitionEnd);
    return () =>
      track.removeEventListener("transitionend", handleTransitionEnd);
  }, [currentIndex]);

  useEffect(() => {
    if (currentIndex === 0 && !applyTransition) {
      requestAnimationFrame(() => {
        setApplyTransition(true);
      });
    }
  }, [currentIndex, applyTransition]);

  return (
    <div className="w-[85vw] md:w-[60vw] mx-auto flex items-center justify-center gap-4 md:gap-8 mb-8 py-[8vh]">
      {/* Left Button */}
      {/* <div
        onClick={handlePrev}
        className="feature-box min-w-10 min-h-10 flex justify-center items-center text-white rounded-full hover:bg-neutral-700/50 transition cursor-pointer"
      >
        <FaChevronLeft />
      </div> */}

      {/* Viewport */}
      <div className="w-[85vw] md:w-[70vw] overflow-hidden py-3">
        <div
          ref={trackRef}
          className={`flex gap-6 md:gap-14 ${
            applyTransition ? "transition-transform duration-300" : ""
          }`}
          style={{
            transform: `translateX(-${
              window.innerWidth < 768 ? currentIndex * 75 : currentIndex * 70
            }%)`,
          }}
        >
          {displayedCards.map((card, index) => (
            <div key={index} className="w-[75%] md:w-[65%] flex-shrink-0">
              <FeatureCard
                text1={card.text1}
                text2={card.text2}
                img={card.img}
                className={card.className}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right Button */}
      {/* <div
        onClick={handleNext}
        className="feature-box min-w-10 min-h-10 flex justify-center items-center text-white rounded-full hover:bg-neutral-700/50 transition cursor-pointer"
      >
        <FaChevronRight />
      </div> */}
    </div>
  );
};

// FeatureCard component (unchanged)
const FeatureCard = ({
  text1 = "XX",
  text2 = null,
  className = "",
  img = "",
}) => {
  return (
    <div className="feature-box md:min-h-48 min-w-[40vw] flex items-center justify-center bg-[#FFFFFF14] rounded-3xl pb-12 pt-16 w-full relative">
      <div className="absolute -top-3 -right-3 rounded-full flex items-center justify-center backdrop-blur-sm">
        <img src={img} alt="icon" className="w-10 h-10" />
      </div>
      <p
        className={`text-2xl md:text-4xl font-bold flex justify-center items-center text-transparent bg-clip-text leading-none ${className}`}
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
