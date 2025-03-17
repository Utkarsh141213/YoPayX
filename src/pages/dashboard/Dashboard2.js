import React, { useState, useEffect } from "react";
import Background from "../../components/Background";
import road from "../../assets/home_page_assets/features/road.svg";
import {
  circle1Svg,
  BTCRectangle,
  star1,
  star2,
  fire,
  card,
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

const Dashboard2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState({
    name: "Profile",
    avatar: null,
  });

  const [showAll, setShowAll] = useState(false);

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

  return (
    <Background>
      <div className="flex min-h-screen relative">
        <div className="w-full ">
          <header className="flex justify-between items-center py-2 px-4 md:px-12">
            <Logo />
            <div className="flex gap-4 pt-4">
              <div
                onClick={() => navigate("/profile")}
                className="dashboard-username hidden md:flex justify-center items-center w-fit px-6  rounded-full "
              >
                {user.name.split(" ")[0]}
              </div>
              {user.avatar ? (
                <img
                  onClick={() => navigate("/profile")}
                  src={user.avatar}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className="profile-placeholder w-10 h-10 rounded-full bg-gray-700" />
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
              <div className="text-white text-sm text-center mb-6">
                Hi User! Let's start earning.
              </div>

              {/* Main card with BTCRectangle as background */}
              <div
                className="relative rounded-3xl py-10 px-[10vw] shadow-lg"
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
                    <div className=" text-[4rem] md:text-[7.5rem] font-bold leading-none">
                      <span className="bg-gradient-to-r from-[#C3D09D] via-[#31B65E] to-[#3381CD] text-transparent bg-clip-text leading-none">
                        Bitcoin
                      </span>
                      <br />
                      <span className="bg-gradient-to-r from-[#C3D09D] via-[#31B65E] to-[#3381CD] text-transparent bg-clip-text leading-none">
                        Journey
                      </span>
                    </div>
                    <div className="text-white text-lg md:font-semibold text-right mr-[8vw] md:mr-[6vw]">
                      with just ₹500
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="page-2">
            <div className="w-full h-full text-white flex flex-col items-center justify-center p-6">
              {/* Top section */}
              <div className="text-center mb-8">
                <span className="text-white font-thin text-sm md:leading-none block">
                  Highest return on
                </span>
                <span className="text-xl md:text-3xl font-bold leading-none">
                  STAKING
                </span>
                <div className="text-6xl mt-3 mb-6 md:mt-0 md:text-[6rem] font-bold ">
                  30% p.a.
                </div>
                <p className="text-sm mb-4 leading-none">
                  Annual return with{" "}
                  <span className="text-yellow-400">yatripay</span>
                </p>

                {/* <span className="border self-center text-green-500 rounded-full px-8 py-2 text-sm bg-green-900/70 transition-colors">
                  Add Funds
                </span> */}

                <span
                  onClick={() => navigate("/add-fund")}
                  className="add-fund-home rounded-full px-8 py-2  text-green-600 bg-green-900/45 hover:bg-green-900/55 cursor-pointer"
                >
                  Add Funds
                </span>

                <div className="flex flex-col md:flex-row justify-center gap-1 text-sm mt-4 text-green-600">
                  {/* <span className="text-green-500">*</span> */}
                  <span className="">*Minimum 7 days locking period</span>
                  {/* <span className="text-green-500 ml-8">*</span> */}
                  <span className="md:ml-9">*Start with minimum 500 Rs.</span>
                </div>
              </div>

              {/* Middle cards section */}
              <div className="w-[70vw] mx-auto overflow-x-scroll flex gap-12 mb-8 py-[8vh] px-[14vw]">
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
              </div>

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

          <section id="page-3">
            <div className="w-full text-white flex flex-col items-center justify-center px-6 py-8">
              {/* Card display with corner glows */}
              <div className="relative w-full max-w-md mb-8">
                {/* Left corner glow */}
                <div className="absolute w-64 h-60 left-0 top-0 bg-green-500 opacity-20 blur-2xl rounded-full transform -translate-x-1/4 -translate-y-1/4"></div>

                {/* Right corner glow */}
                <div className="absolute w-64 h-60 right-0 top-0 bg-green-500 opacity-20 blur-3xl rounded-full transform translate-x-1/4 -translate-y-1/4"></div>

                {/* Card container with gradient background */}
                <div className="relative bg-gradient-to-b from-green-900 to-green-950 rounded-[1.7rem] overflow-hidden shadow-lg">
                  <img src={card} alt="YatriPay Card" className="w-full " />
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-4 mb-8">
                <div
                  onClick={() =>
                    navigate("/fund", { state: { tab: "withdraw" } })
                  }
                  className="act-btn bg-[#0B2A00] text-white px-10 py-2 rounded-full hover:bg-green-900/60 transition-colors "
                >
                  Withdraw
                </div>
                <div
                  onClick={() => navigate("/buy-assets")}
                  className="act-btn bg-[#0B2A00] text-white px-12 py-2 rounded-full hover:bg-green-900/60 transition-colors"
                >
                  Buy YTP
                </div>
              </div>

              {/* Explore section */}
              <div className="w-full mb-4">
                <h2 className="text-center text-white text-lg mb-4">
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
                      classNameMain="md:justify-self-end py-20"
                      classNameTex1="bg-gradient-to-r from-[#C5882D] to-[#B72346]"
                      classNameImgDiv="mb-10"
                      classNameImg={"md:w-[20rem]"}
                    />

                    {/* Staking */}
                    <div
                      onClick={() => {
                        navigate("/page1");
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
                      classNameMain="md:justify-self-end"
                      classNameTex1="bg-gradient-to-r from-[#C5882D] to-[#B72346]"
                      classNameImg="h-[6rem] md:h-[8rem] origin-center"
                    />

                    {/* Rewards */}
                    <ExploreYatripayCards
                      text1="Rewards"
                      text2="Win a foreign trip"
                      image={reward}
                      classNameMain="md:justify-self-start"
                      classNameTex1="bg-gradient-to-r from-[#979DD8] to-[#4431BA]"
                      classNameImgDiv={"mb-[11px]"}
                    />

                    {showAll && (
                      <>
                        {/* Buy YTP */}
                        <ExploreYatripayCards
                          text1="Buy YTP"
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
                          classNameMain="md:justify-self-start"
                          classNameTex1="bg-gradient-to-r from-[#979DD8] to-[#4431BA]"
                        />

                        {/* Sell YTP */}
                        <ExploreYatripayCards
                          text1="Sell YTP"
                          text2="Convert YTP to fiat"
                          image={sellYTP}
                          onClick={() => {
                            navigate("/fund");
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
                    className="dashboard-show-more-btn mt-4 text-sm text-center text-white rounded-2xl py-1 px-6 cursor-pointer w-fit"
                  >
                    {showAll ? "Show Less" : "Show More"}
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Background>
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
