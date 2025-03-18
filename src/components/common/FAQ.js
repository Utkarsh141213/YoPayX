import React, { useEffect, useState } from "react";
import { getFAQ } from "../../services/generalAPI";
import { FaAngleUp, FaAngleDown } from "react-icons/fa6";

const FAQ = ({code}) => {
  const [FAQList, setFAQList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const respone = await getFAQ({ code });
        if (respone && respone.data) {
          setFAQList(respone.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [code]);

  if (!FAQList || FAQList.length === 0) {
    return <div>loading FAQs...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-16">
      <h2 className="text-white text-4xl font-bold text-center mb-8">FAQ</h2>

      <div className="space-y-4 text-left">
        {FAQList &&
          FAQList.map((faq) => (
            <div className="bg-white text-black rounded-lg p-4 cursor-pointer">
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
      <div className="flex justify-between items-center text-lg">
        <div className="space-x-2">
          <span className="text-black font-medium">Q</span>
          <span className="text-black font-medium"> {faq.name}</span>
        </div>
        <span
          onClick={() => setShowAns((prev) => !prev)}
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
