import React, { useContext } from "react";
import { phoneSvg } from "../../assets/stacking";
import { useNavigate } from "react-router-dom";
import { bigGift, taskListSmallGift } from "../../assets/reward";
import Footer from "../../components/common/Footer";
import yatripayLogo from "../../assets/yatripay_logo.svg";
import { claimReward } from "../../services/reward/rewardAPI";
import { toast } from "react-toastify";
import { GlobalContext } from "../../context/GlobalContext";

const RewardPage = () => {
  const navigate = useNavigate();

  const { setIsLoading } = useContext(GlobalContext)

  const handleCliamNow = async (id) => {
    try {
      setIsLoading(true)
      const res = await claimReward({ id });
      if (res) {
        toast.success(res.message);
      }
    } catch (error) {
      // console.log(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false)
      if (id === "1") {
        navigate("/welcome-bonus");
      } else {
        navigate("/phone-giveaway");
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full  overflow-hidden mb-10">
      <div
      onClick={() => navigate('/dashboard')}
      className="absolute top-4 md:top-8 left-6 md:left-10 cursor-pointer z-30">
          <img
            src={yatripayLogo}
            alt="yatripay logo"
            className="h-8 md:h-fit"
          />
      </div>

      {/* Background image - you'll provide this */}
      {/* <div className="absolute inset-0 z-0">
        <img 
          src={backgroundImage || "/api/placeholder/600/800"} 
          alt="Confetti background" 
          className="w-full h-full object-cover"
        />
      </div> */}

      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center justify-start pt-16 md:pt-24 px-4 min-h-screen">
        {/* Header */}
        <h1 className="text-4xl font-bold text-white mb-8">Offers</h1>

        {/* Gift icon - you'll provide this */}
        <div className="mb-6">
          <img
            src={bigGift || "/api/placeholder/100/100"}
            alt="Gift box"
            className="w-40 h-40 object-contain"
          />
        </div>

        {/* Subtitle */}
        <h2 className="text-2xl font-bold text-white mb-3 text-center">
          Join Exciting Offers and Activities!
        </h2>

        {/* Description */}
        <p className="text-white text-center text-sm mb-8 max-w-md">
          Participate now and earn rewards up to 30,000 YTP.
          <br />
          Your chance to win an iPhone or foreign trip.
        </p>

        {/* Offer card */}
        <div className="bg-[#FFFFFF1F] rounded-lg p-6 w-full max-w-md flex flex-col items-center">
          {/* iPhone icon - you'll provide this */}
          <div className="bg-white rounded-full p-3 mb-16 mt-10">
            <img
              src={phoneSvg || "/api/placeholder/40/40"}
              alt="iPhone"
              className="w-8 h-8 object-contain "
            />
          </div>

          {/* Card title */}
          <h3 className="text-white text-xl font-semibold mb-4">
            iPhone Giveaway
          </h3>

          {/* Card description */}
          <p className="text-gray-300 text-sm text-center mb-16 whitespace-break-spaces leading-7">
            Do all the tasks and claim rewards. After completing all the tasks
            get a chance to win iPhone.
          </p>

          {/* Claim button */}
          <div
            onClick={() => handleCliamNow("2")}
            className="bg-[#4BAF2A] hover:bg-green-600 cursor-pointer text-white font-medium py-2 px-6 rounded-lg text-sm"
          >
            Claim Now
          </div>
        </div>

        {/* Offer card */}
        <div className="bg-[#FFFFFF1F] mt-10 rounded-lg p-6 w-full max-w-md flex flex-col items-center">
          {/* Gift icon */}
          <div
            className="bg-white rounded-full flex justify-center items-center p-1 mb-8 mt-10"
            style={{
              backgroundImage: `url(${taskListSmallGift})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "-5px 12px",
              backgroundSize: "contain",
              width: "4.1rem", // Adjust size as needed
              height: "4.1rem", // Adjust size as needed
            }}
          >
            {/* You might not need the img tag anymore in this case */}
          </div>

          {/* Card title */}
          <h3 className="text-white text-xl font-semibold mb-4">
            Welcome Bonus
          </h3>

          {/* Card description */}
          <span className="text-gray-100 text-left mb-8 whitespace-break-spaces leading-6">
            Get 7 USD worth of YTP
          </span>

          <p className="text-gray-100  text-center mb-4 whitespace-break-spaces leading-5">
            Just follow few steps to claim your reward!
          </p>

          <ul className="text-gray-100  text-left mb-8 leading-5">
            <li className="mb-2 list-none">Download Yatripay App.</li>
            <li className="mb-2 list-none">
              Perform the given social media activities:
            </li>
            <ul className="ml-4">
              <li className="mb-1 list-disc">
                {" "}
                Follow, like, share and retweet
              </li>
              <li className="mb-1 list-disc"> Tag two friends</li>
            </ul>
            <li className="list-none">One running staking</li>
          </ul>

          {/* Claim button */}
          <div
            onClick={() => handleCliamNow("1")}
            className="bg-[#4BAF2A] cursor-pointer hover:bg-green-600 text-white font-medium py-2 px-6 rounded-lg text-sm"
          >
            Claim Now
          </div>
        </div>
      </div>
      <section className="flex mt-16 mx-[4vw] md:ml-[24vw]">
        <Footer />
      </section>
    </div>
  );
};

export default RewardPage;
