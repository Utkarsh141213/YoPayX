import React, { useEffect, useState } from "react";
import { getFAQ } from "../../services/generalAPI";
import { FaAngleUp, FaAngleDown } from "react-icons/fa6";
import Loader from "./Loader";

const FAQ = ({ code }) => {
  const [FAQList, setFAQList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const respone = await getFAQ({ code });
        if (respone && respone.data) {
          setFAQList(respone.data);
        }
      } catch (error) {
        // console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [code]);

  if (isLoading) {
    <Loader />;
  }

  if (!FAQList || FAQList.length === 0) {
    return <div></div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-16">
      <h2 className="text-white text-2xl md:text-4xl font-bold text-center mb-8">FAQ</h2>

      <div className="space-y-4 text-left">
        {FAQList &&
          FAQList.map((faq) => (
            <div
              key={faq.id}
              className="bg-white text-black rounded-lg p-4"
            >
              <FAQDetails key={faq.id} faq={faq} />
            </div>
          ))}
      </div>
    </div>
  );
};

const FAQDetails = ({ faq }) => {
  const [showAns, setShowAns] = useState(false);
  return (
    <div className="">
      <div
        onClick={() => setShowAns((prev) => !prev)}
        className="flex justify-between items-center md:text-lg cursor-pointer"
      >
        <div className="space-x-2">
          <span className="text-black font-medium">Q</span>
          <span className="text-black font-medium"> {faq.name}</span>
        </div>
        <span
          onClick={(e) => {
            e.stopPropagation()
            setShowAns((prev) => !prev)
          }}
          className="text-black font-medium"
        >
          {showAns ? <FaAngleUp /> : <FaAngleDown />}
        </span>
      </div>
      {showAns && (
        <span className="block text-black text-sm text-left mt-2">
          {faq.description}
        </span>
      )}
    </div>
  );
};

export default FAQ;
