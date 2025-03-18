import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaRegCopy } from "react-icons/fa";
import dayjs from "dayjs";
import { card } from "../../assets/home_page_assets";
import { getAvailableBalace } from "../../services/fundsAPI/tradingScreenAPI";
import { getWalletDetails } from "../../services/fundsAPI/walletAPI";

const TravelCard = () => {
  const [showBalance, setShowBalance] = useState(false);
  const [availableBalance, setAvailableBalace] = useState("0");
  const [cardNumber, setCardNumber] = useState("");
  const [username, setUsername] = useState("name");
  const [copied, setCopied] = useState(false);


  const formatCardNumber = (fullNumber) => {
    if (!fullNumber) return "xxxx xxxx xxxx xxxx";

    let i = 0;
    const chunks = [];
    while (i < fullNumber.length && i<20) {
      const group = fullNumber.slice(i, i + 4);
      chunks.push(group);
      i += 5;
    }
    return chunks.join(" ");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(cardNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 700);
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await getAvailableBalace();
        if (res && res.data) {
          setAvailableBalace(res.data.balance);
        }
      } catch (error) {
        console.log(error);
      }
    })();

    (async () => {
      try {
        const res = await getWalletDetails('YTP');
        if (res && res.data) {
          setCardNumber(res.data.address);
        }
      } catch (error) {
        console.log(error);
      }
    })();

    const user = window.localStorage.getItem("user");
    if (user) {
      const { first_name } = JSON.parse(user);
      setUsername(first_name);
    }
  }, []);

  const formattedDate = dayjs().format("YY/M");

  return (
    <div className="relative w-full max-w-md mb-8">
      <div className="absolute w-64 h-60 left-0 top-0 bg-green-500 opacity-20 blur-2xl rounded-full transform -translate-x-1/4 -translate-y-1/4"></div>
      <div className="absolute w-64 h-60 right-0 top-0 bg-green-500 opacity-20 blur-3xl rounded-full transform translate-x-1/4 -translate-y-1/4"></div>

      <div className="relative rounded-[1.7rem] overflow-hidden shadow-lg ">
        <img
          src={card || "/api/placeholder/400/240"}
          alt="card background"
          className="w-full"
        />

        <div className="absolute inset-0 p-6 ">
          <h1 className="absolute left-8 top-2 md:top-3 text-white text-xl font-bold">
            Yatripay Travel Card
          </h1>

          {/* Balance + Eye */}
          <div className="absolute top-20 right-6 flex items-center">
            <span className="text-white text-xl mr-2">
              {showBalance
                ? `${Number(availableBalance).toPrecision(6)} YTP`
                : "***** YTP"}
            </span>
            {showBalance ? (
              <FaEye
                className="text-white cursor-pointer"
                onClick={() => setShowBalance(false)}
              />
            ) : (
              <FaEyeSlash
                className="text-white cursor-pointer"
                onClick={() => setShowBalance(true)}
              />
            )}
          </div>

          {/* Card number + Copy */}
          <div className="absolute top-[62%] left-6 transform -translate-y-1/2 flex items-center gap-3">
            <span className="text-white md:text-xl font-semibold tracking-wider ">
              {formatCardNumber(cardNumber)}
            </span>
            <FaRegCopy
              className="text-white cursor-pointer text-lg"
              onClick={handleCopy}
            />
            {copied && (
              <span className="text-green-300 text-sm ">Copied!</span>
            )}
          </div>

          {/* Name + Expiry */}
          <div className="absolute bottom-6 left-0 right-0 px-6">
            <div className="flex justify-between">
              <p className="text-white text-xl md:text-3xl font-semibold md:font-bold max-w-[75%] truncate">
                {username}
              </p>
              <p className="text-white text-xl md:text-3xl font-semibold md:font-bold">
                {formattedDate}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelCard;
