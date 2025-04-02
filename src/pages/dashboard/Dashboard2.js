import React, { useState, useEffect,createContext, useContext } from "react";
import {
  circle1Svg,
  BTCRectangle,
  star1,
  star2,
} from "../../assets/home_page_assets";
import {
  buyYTP,
  flight,
  hotel,
  referral,
  reward,
  sellYTP,
  transaction,
  wallet,
  withdraw,
} from "../../assets/dashboard_assets";
import Logo from "../../components/logo";
import { useLocation, useNavigate } from "react-router-dom";
import FeatureSection from "../../components/dashboard/FeatureSection";
import Footer from "../../components/common/Footer";

import TravelCard from "../../components/dashboard/TravelCard";
import { toast } from "react-toastify";
import VideoSection from "../../components/dashboard/VideoSection";
import {  getAvailableFunds } from "../../services/fundsAPI/tradingScreenAPI";
import './dashboard.css';
const Dashboard2 = () => {
    const [availableBalance, setAvailableBalance] = useState("0.00");
  

  const location = useLocation();
  const [user, setUser] = useState({
    name: "Profile",
    avatar: null,
  });

  const [showAll, setShowAll] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0); // State to manage carousel index

  useEffect(() => {
    if (location.state?.userName || location.state?.userImage) {
      setUser({
        name: location.state.userName,
        avatar: location.state.userImage,
      });
    } else {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser({
          name: parsedUser.first_name || "Profile",
          avatar: parsedUser.avatar
            ? parsedUser.avatar.startsWith("http")
              ? parsedUser.avatar
              : `https://wallet.yatripay.com${parsedUser.avatar}`
            : null,
        });
      }
    }
  }, [location.state]);
  useEffect(() => {
    (async () => {
      try {
        const balance = await getAvailableFunds();
        if (balance) {
          setAvailableBalance(balance.inr_balance);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const handleComminSoon = () => {
    toast.success("Comming soon");
  };
  const carouselItems = [
    (
      <div
        className="relative rounded-3xl py-[26px] px-[10vw] shadow-lg"
        style={{
          backgroundImage: `url(${BTCRectangle})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* STARS */}
        <img
          src={star1}
          alt="star"
          className=" absolute -left-[1.8rem] h-14 bottom-10"
        />
        <img
          src={star1}
          alt="star"
          className=" absolute -right-[1.8rem] h-14 top-10"
        />
        <img
          src={star2}
          alt="star"
          className="hidden md:block absolute left-[3rem] h-7 top-[11rem]"
        />

        <div className="text-center">
          <div>
            <h2 className="text-white text-lg md:font-semibold text-left ml-[4vw] md:ml-[3vw]">
              Start your
            </h2>
            <div className=" text-[3.7rem] md:text-[7.5rem] font-bold leading-none">
              <span className="bg-gradient-to-r from-[#C3D09D] via-[#31B65E] to-[#3381CD] text-transparent bg-clip-text leading-none">
                Bitcoin
              </span>
              <br />
              <span className="bg-gradient-to-r from-[#C3D09D] via-[#31B65E] to-[#3381CD] text-transparent bg-clip-text leading-none">
                Journey
              </span>
            </div>
            <div className="text-white text-lg md:font-semibold text-right mr-[8vw] md:mr-[6vw]">
              with just ₹100
            </div>
          </div>
          <div className="mt-8 ">
            <span
              onClick={(e) => {
                e.stopPropagation();
                navigate("/add-fund");
              }}
              className=" add-fund-home text-xl md:text-2xl rounded-full px-8 py-2  text-green-600 bg-green-900/45 hover:bg-green-900/55 cursor-pointer"
            >
              Add Funds
            </span>
          </div>
        </div>
      </div>
    ),
    (
      <div
        onClick={() => navigate("/staking")}
        className="relative rounded-3xl py-5 px-[11.7vw] shadow-lg" // Match padding
        style={{
          backgroundImage: `url(${BTCRectangle})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* STARS */}
        <img
          src={star1}
          alt="star"
          className="absolute -left-[1.8rem] h-14 bottom-10"
        />
        <img
          src={star1}
          alt="star"
          className="absolute -right-[1.8rem] h-14 top-10"
        />
        <img
          src={star2}
          alt="star"
          className="hidden md:block absolute left-[3rem] h-7 top-[11rem]"
        />
        <span className="text-white font-thin text-sm md:leading-none block">
          Highest return on
        </span>
        <span className="text-xl md:text-3xl font-bold leading-none">
          STAKING
        </span>
        <div className="text-6xl mt-3 mb-6 md:mt-0 md:text-[6rem] font-bold">
          30%
        </div>
        <span className="text-sm leading-none">
          Annual return with{" "}
          <span className="text-yellow-400">yatripay</span>
        </span>
    
        <div className="mt-8 mb-8">
          <span
            onClick={(e) => {
              e.stopPropagation();
              navigate("/add-fund");
            }}
            className="add-fund-home text-xl md:text-2xl rounded-full px-8 py-2 text-green-600 bg-green-900/45 hover:bg-green-900/55 cursor-pointer"
          >
            Add Funds
          </span>
        </div>
    
        <div className="flex flex-col md:flex-row justify-center gap-1 text-sm mt-4 text-green-600">
          <span className="">*Minimum 7 days locking period</span>
          <span className="md:ml-9">*Start with minimum 100 Rs.</span>
        </div>
      </div>
    ),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  const navigate = useNavigate();

  return (

    <div className="flex min-h-screen relative">
      <div className="w-full ">
         
        <header className="flex justify-between items-center py-2 px-4 md:px-12">
          <Logo />
          <div className="flex gap-4 pt-4">
            <div
              onClick={() => navigate("/category")}
              className="dashboard-username hidden md:flex justify-center items-center w-fit px-6  rounded-full cursor-pointer"
            >
              {user.name.split(" ")[0]}
            </div>
            {/* {user.avatar ? ( */}
            {false ? (
              <img
                onClick={() => navigate("/category")}
                src={user.avatar}
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer"
              />
            ) : (
              <div
                onClick={() => navigate("/category")}
                className="profile-placeholder w-10 h-10 rounded-full bg-[#4BAF2A] cursor-pointer"
              />
            )}
          </div>
        </header>

        {/* Background circular elements */}
        <div className="absolute   left-0 top-0">
          <div className="absolute left-0 top-0">
            {/* Circle3: outermost (lowest z-index) */}
            <img
              src={circle1Svg}
              alt="elips"
              className="absolute top-[20vh] md:top-[12vh] md:left-[8vw]  h-[12.9rem] md:h-[42vw]"
            />
            {/* Circle2: middle */}
            <img
              src={circle1Svg}
              alt="elips"
              className="absolute top-[21vh] md:top-[20vh] left-[4vw] md:left-[17vw] h-[11rem] md:h-[30vw]"
            />
            {/* Circle1: innermost (highest z-index) */}
            <img
              src={circle1Svg}
              alt="elips"
              className="absolute top-[23vh] md:top-[29vh] left-[13vw] md:left-[27vw] h-[9rem]  md:h-[21vw]"
            />
          </div>
        </div>

        {/* Content container */}
        <section id="page-1" className="mb-5">
          <div className="w-fit px-8 py-6 mx-auto ">
            {/* <div className="text-white text-sm text-center mb-6">
              Hi User! Let's start earning.
            </div> */}
<div 
  className="text-white text-sm text-center text-base sm:text-lg md:text-2xl mb-6 font-bold flex flex-col sm:flex-row items-center sm:gap-2"
  style={{ position: 'relative', left: '85vh' }}>
     <div className="text-white text-xl md:text-xl font-semibold">
            Available Balance:
          </div>
          <div className="text-white/50 md:text-white text-xl ">
            {availableBalance} INR
          </div>
        </div>

            {/* Main card with BTCRectangle as background */}
            {/* <div className="relative"> */}
             <div className="carousel-container">
      <div
        className="carousel"
        style={{
          transform: `translateX(-${carouselIndex * 100}%)`, // Move forward only
        }}      >
        {carouselItems.map((item, i) => (
          <div key={i} className="carousel-slide">
            {item}
          </div>
        ))}
      </div>
    </div>
            </div>
          {/* </div> */}
        </section>

        <section id="page-2">
          <div className="w-full h-full text-white flex flex-col items-center justify-center p-6 pb-0">
            {/* Top section */}
            

            {/* Middle cards section */}
            <FeatureSection />
            {/* <div className="w-[70vw] mx-auto overflow-x-scroll flex gap-12 mb-8 py-[8vh] px-[14vw]">
                <FeatureCard
                  text1="Zero Transaction"
                  text2="Fees"
                  img={fire}
                  className="bg-gradient-to-r from-[#C5882D] to-[#B72346]"
                />
                <FeatureCard
                  text1="Daily"
                  text2="Rewards"
                  img={road}
                  className="bg-gradient-to-r from-[#979DD8] to-[#4431BA]"
                />
                <FeatureCard
                  text1="XX"
                  // text2="X"
                  img={fire}
                  className="bg-gradient-to-r py-4 from-[#C5882D] to-[#B72346]"
                />
                <FeatureCard
                  text1="XX"
                  // text2="X"
                  img={road}
                  className="bg-gradient-to-r py-4 from-[#979DD8] to-[#4431BA]"
                />
              </div> */}

            {/* Bottom featured section */}
            {/* <div className="w-full">
                <p className="text-center mb-4">Featured in</p>
                <div className="flex gap-10 justify-around w-fit mx-auto">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="feature-box bg-[#FFFFFF14] rounded-2xl h-24 w-24 flex items-center justify-center"
                    > */}
            {/* <img
                        src="/api/placeholder/40/40"
                        alt={`partner logo ${i + 1}`}
                        className="w-10 h-10"
                      /> */}
            {/* </div>
                  ))}
                </div>
              </div> */}
          </div>
        </section>

        <section id="page-3" >
          <div className="w-full text-white flex flex-col items-center justify-center px-6 pb-8">
            {/* CARD COMPONENT */}
            {/* Card display with corner glows */}
            <TravelCard />

            {/* Action buttons */}
            <div className="flex gap-4 mb-8">
              <div
                onClick={() =>
                  navigate("/sell-withdraw", { state: { tab: "withdraw" } })
                }
                className="act-btn bg-[#0B2A00] text-white px-8 md:px-10 py-2 rounded-full hover:bg-green-900/60 transition-colors "
              >
                Withdraw
              </div>
              <div
                onClick={() => navigate("/buy-assets")}
                className="act-btn bg-[#0B2A00] text-white px-8 md:px-10 py-2 rounded-full whitespace-nowrap hover:bg-green-900/60 transition-colors"
              >
                Buy Assets
              </div>
            </div>

            {/* Explore section */}
            <div className="w-full my-2">
              <h2 className="text-left md:ml-[14vw] text-white text-2xl font-semibold mb-8">
                Explore YatriPay
              </h2>

              {/* <div className="grid md:grid-cols-2 gap-12"> */}
              <div>
                <div className="grid md:grid-cols-2 gap-12 md:px-[14vw]">
                  {/* Flights */}
                  <ExploreYatripayCards
                    text1="Flights"
                    text2="Budget-friendly travel"
                    image={flight}
                    onClick={handleComminSoon}
                    classNameMain="md:justify-self-end py-20"
                    classNameTex1="bg-gradient-to-r from-[#C5882D] to-[#B72346]"
                    classNameImgDiv="mb-10"
                    classNameImg={"md:w-[20rem]"}
                  />

                  {/* Staking */}
                  <div
                    onClick={() => {
                      navigate("/staking");
                    }}
                    className="feature-box h-fit pt-4 pb-2 bg-[#FFFFFF14]  rounded-3xl  w-full relative justify-self-center md:justify-self-start cursor-pointer"
                  >
                    <div className=" text-7xl md:text-8xl font-bold text-white mb-[33px]">
                      30%
                    </div>
                    <span className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-[#979DD8] to-[#4431BA] text-transparent bg-clip-text leading-none">
                      Staking
                    </span>
                    <p className="text-white text-center md:font-semibold">
                      Minimum 30% p.a.
                    </p>
                  </div>

                  {/* Hotel */}
                  <ExploreYatripayCards
                    text1="Hotel"
                    text2="Book affordable stays"
                    image={hotel}
                    onClick={handleComminSoon}
                    classNameMain="md:justify-self-end"
                    classNameTex1="bg-gradient-to-r from-[#C5882D] to-[#B72346]"
                    classNameImg="h-[6rem] md:h-[8rem] origin-center"
                  />

                  {/* Rewards */}
                  <ExploreYatripayCards
                    text1="Rewards"
                    text2="Win a foreign trip"
                    image={reward}
                    onClick={() => {
                      navigate("/reward");
                    }}
                    classNameMain="md:justify-self-start"
                    classNameTex1="bg-gradient-to-r from-[#979DD8] to-[#4431BA]"
                    classNameImgDiv={"mb-[11px]"}
                  />

                  {showAll && (
                    <>
                      {/* Buy YTP */}
                      <ExploreYatripayCards
                        text1="Buy Assets"
                        text2="Purchase YTP coins"
                        image={buyYTP}
                        onClick={() => {
                          navigate("/buy-assets");
                        }}
                        classNameMain="md:justify-self-end"
                        classNameTex1="bg-gradient-to-r from-[#C5882D] to-[#B72346]"
                      />

                      {/* Referrals */}
                      <ExploreYatripayCards
                        text1="Referrals"
                        text2="Invite friends, earn YTP"
                        image={referral}
                        onClick={() => {
                          navigate("/referral");
                        }}
                        classNameMain="md:justify-self-start"
                        classNameTex1="bg-gradient-to-r from-[#979DD8] to-[#4431BA]"
                      />

                      {/* Sell YTP */}
                      <ExploreYatripayCards
                        text1="Sell YTP"
                        text2="Convert YTP to fiat"
                        image={sellYTP}
                        onClick={() => {
                          navigate("/sell-withdraw");
                        }}
                        classNameMain="md:justify-self-end"
                        classNameTex1="bg-gradient-to-r from-[#C5882D] to-[#B72346]"
                      />

                      {/* Withdraw */}
                      <ExploreYatripayCards
                        text1="Withdraw"
                        text2="Transfer to your bank"
                        image={withdraw}
                        onClick={() => {
                          navigate("/fund", { state: { tab: "withdraw" } });
                        }}
                        classNameMain="md:justify-self-start"
                        classNameTex1="bg-gradient-to-r from-[#979DD8] to-[#4431BA]"
                      />

                      {/* Wallet */}
                      <ExploreYatripayCards
                        text1="Wallet"
                        text2="Receive and Send YTP"
                        image={wallet}
                        onClick={() => {
                          navigate("/wallet");
                        }}
                        classNameMain="md:justify-self-end"
                        classNameTex1="bg-gradient-to-r from-[#C5882D] to-[#B72346]"
                      />

                      {/* Transactions */}
                      <ExploreYatripayCards
                        text1="Transactions"
                        text2="Track your transactions"
                        image={transaction}
                        onClick={() => navigate("/transaction-history")}
                        classNameMain="md:justify-self-start"
                        classNameTex1="bg-gradient-to-r from-[#979DD8] to-[#4431BA]"
                      />
                    </>
                  )}
                </div>
                <div className="flex justify-center">
                  <div
                    onClick={() => setShowAll(!showAll)}
                    className="dashboard-show-more-btn mt-8 text-sm text-center text-white rounded-2xl py-1 px-6 cursor-pointer w-fit"
                  >
                    {showAll ? "Show Less" : "Show More"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <VideoSection />
        </section>

        <section className="flex md:my-10 ml-[4vw] md:ml-[16vw]">
          <Footer />
        </section>
      </div>
    </div>

  );
};

const ExploreYatripayCards = ({
  text1 = "",
  text2 = "",
  image = "",
  classNameMain = "",
  classNameTex1 = "",
  classNameImg = null,
  classNameImgDiv = null,
  onClick = () => {},
}) => {
  return (
    // <div
    //   onClick={onClick}
    //   className={`feature-box min-w-[20rem] h-fit pt-6 pb-2 bg-[#FFFFFF14]  rounded-xl  w-fit relative justify-self-center cursor-pointer ${classNameMain}`}
    // >
    <div
      onClick={onClick}
      className={`feature-box h-fit pt-3 pb-1 bg-[#FFFFFF14]  rounded-3xl  w-full relative justify-self-center cursor-pointer ${classNameMain}`}
    >
      <div className={`${classNameImgDiv ? classNameImgDiv : "mb-4"}`}>
        {/* <div className={` mb-4`}> */}
        <img
          src={image}
          alt="Flights icon"
          className={`${
            classNameImg ? classNameImg : "scale-125 h-[9rem] origin-center"
          }`}
          // className="scale-125 h-[9rem] origin-center"
        />
      </div>
      <span
        className={`text-3xl md:text-4xl font-bold text-center text-transparent bg-clip-text leading-none ${classNameTex1}`}
      >
        {text1}
      </span>
      <p className=" md:font-semibold text-white text-center ">{text2}</p>
    </div>
  );
};

// const ExploreYatripayCards = ({
//   text1 = "",
//   text2 = "",
//   image = "",
//   classNameMain = "",
//   classNameTex1 = "",
//   classNameImg = null,
//   classNameImgDiv = null,
//   onClick = () => {},
// }) => {
//   return (
//     // <div
//     //   onClick={onClick}
//     //   className={`feature-box min-w-[20rem] h-fit pt-6 pb-2 bg-[#FFFFFF14]  rounded-xl  w-fit relative justify-self-center cursor-pointer ${classNameMain}`}
//     // >
//     <div
//       onClick={onClick}
//       className={`feature-box min-w h-fit pt-6 pb-2 bg-[#FFFFFF14]  rounded-xl  w-full relative justify-self-center cursor-pointer ${classNameMain}`}
//     >
//       <div className={`${classNameImgDiv ? classNameImgDiv : "mb-4"}`}>
//         <img
//           src={image}
//           alt="Flights icon"
//           className={`${classNameImg ? classNameImg : "w-[10rem]"}`}
//         />
//       </div>
//       <span
//         className={`text-2xl font-bold text-center text-transparent bg-clip-text leading-none ${classNameTex1}`}
//       >
//         {text1}
//       </span>
//       <p className="text-sm text-white text-center leading-none">{text2}</p>
//     </div>
//   );
// };

export default Dashboard2;
