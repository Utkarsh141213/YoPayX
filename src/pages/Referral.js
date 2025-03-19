import React, { useEffect, useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import logo from "../assets/yatri-pay-logo-main.png";
import { getUserReferralLink } from "../services/promotion/promotionAPI";
import FAQ from "../components/common/FAQ";
import Footer from "../components/common/Footer";

const Referral = () => {
  const [referralCode, setReferralCode] = useState();
  const [referralLink, setReferralLink] = useState();
  const [copiedField, setCopiedField] = useState(null); // 'code' or 'link' or null

  const referredUsers = [
    { user: "UserA", joiningDate: "2025-03-10" },
    { user: "UserB", joiningDate: "2025-03-11" },
  ];

  // Copy text to clipboard, then show "Copied!" for 1 second
  const handleCopy = (field, text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => {
      setCopiedField(null);
    }, 1000);
  };

  // Open share sheet
  const handleInviteFriends = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Join YatriPay",
          text: `Download the APP and Get $7. Get a chance to win an iPhone! ${referralLink}`,
          url: referralLink,
        })
        .catch((err) => console.log("Share canceled or failed: ", err));
    } else {
      alert("Sharing is not supported in this browser.");
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await getUserReferralLink();
        if (res && res.data) {
          setReferralCode(res.data.code);
          setReferralLink(res.data.url);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <div className="text-white w-full max-w-md mx-auto p-4 space-y-8">
        <header>
          <div className="flex flex-col justify-center items-center py-6">
            <img src={logo} alt="logo" className="h-8 md:h-12" />
          </div>
        </header>

        {/* Referral Code */}
        <div className="text-left">
          <span className="text-xl">Referral Code</span>
          <div className="flex gap-3 items-center">
            <div className="text-lg text-gray-300 ">{referralCode}</div>
            <div
              onClick={() => handleCopy("code", referralCode)}
              className="text-sm rounded-3xl cursor-pointer flex items-center gap-1"
            >
              <FaRegCopy />
              {copiedField === "code" && (
                <span className="text-green-400">Copied!</span>
              )}
            </div>
          </div>
        </div>

        {/* Referral Link */}
        <div className="text-left">
          <span className="text-xl">Referral Link</span>
          <div className="flex gap-3 items-center">
            <span className="text-lg text-gray-300 break-all">
              {referralLink}
            </span>
            <div
              onClick={() => handleCopy("link", referralLink)}
              className="text-sm rounded-3xl cursor-pointer flex items-center gap-1"
            >
              <FaRegCopy />
              {copiedField === "link" && (
                <span className="text-green-400">Copied!</span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center space-y-4">
          {/* Invite Friends */}
          <div
            onClick={handleInviteFriends}
            className="bg-[#4BAF2A] hover:bg-green-600 w-full text-center py-2 rounded cursor-pointer"
          >
            Invite Friends
          </div>

          {/* Create custom link */}
          <div
            onClick={() => alert("Create custom link clicked")}
            className="bg-[#4BAF2A] hover:bg-green-600 w-full text-center py-2 rounded cursor-pointer"
          >
            Create custom link
          </div>
        </div>

        {/* Referred Users */}
        <div className="space-y-4">
          <h2 className="font-semibold text-center text-lg">Referred Users</h2>
          {/* Table Header */}
          <div className="flex justify-between px-2">
            <span className="font-semibold">Users</span>
            <span className="font-semibold">Joining Date</span>
          </div>
          {/* Table Rows */}
          {referredUsers.map((item, index) => (
            <div key={index} className="flex justify-between px-2">
              <span>{item.user}</span>
              <span>{item.joiningDate}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-3 mb-10">
        <FAQ code={"referral"} />
      </div>

      <section className="flex ml-[4vw] md:ml-[20vw]">
        <Footer />
      </section>
    </>
  );
};

export default Referral;
