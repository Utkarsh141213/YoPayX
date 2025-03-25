import React, { useContext, useEffect, useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import logo from "../assets/yatri-pay-logo-main.png";
import { createCustomReferralLink, getUserReferralLink } from "../services/promotion/promotionAPI";
import FAQ from "../components/common/FAQ";
import Footer from "../components/common/Footer";
import { toast } from "react-toastify";
import { GlobalContext } from "../context/GlobalContext";

const Referral = () => {
  const [referralCode, setReferralCode] = useState();
  const [referralLink, setReferralLink] = useState();
  const [copiedField, setCopiedField] = useState(null);
  const [showCustomLinkModal, setShowCustomLinkModal] = useState(false);
  const [customLink, setCustomLink] = useState("");
  const [referralId, setReferralId] = useState()
  const referredUsers = [
    // { user: "UserA", joiningDate: "2025-03-10" },
    // { user: "UserB", joiningDate: "2025-03-11" },
  ];

  const { setIsLoading } = useContext(GlobalContext)

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
      setIsLoading(true)
      try {
        const res = await getUserReferralLink();
        if (res && res.data) {
          setReferralId(res.data.id)
          setReferralCode(res.data.code);
          setReferralLink(res.data.url);
        }
      } catch (error) {
        console.log(error);
      }
      finally{
        setIsLoading(false)
      }
    })();
  }, []);

  const handleCreateCustomLink = async () => {
    try {
      setIsLoading(true)
      const res = await createCustomReferralLink({
        referral_link_id: referralId,
        new_referral_code: customLink,
      });
      if (res && res.data) {
        toast.success("Custom referral link created successfully!");
        setShowCustomLinkModal(false);
        setCustomLink("");
      }
      const newData = await getUserReferralLink();
        if (newData && newData.data) {
          setReferralId(newData.data.id)
          setReferralCode(newData.data.code);
          setReferralLink(newData.data.url);
        }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }finally{
      setIsLoading(false)
    }
  };

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
            className="bg-[#4BAF2A] hover:bg-[#4BAF2A]/90 w-full text-center py-2 rounded cursor-pointer"
          >
            Invite Friends
          </div>

          {/* Create custom link */}
          <div
            onClick={() => setShowCustomLinkModal(true)}
            className="bg-[#4BAF2A] hover:bg-[#4BAF2A]/90  w-full text-center py-2 rounded cursor-pointer"
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

      {/* Custom Link Modal */}
      {showCustomLinkModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 max-w-md">
            <h2 className="text-xl font-bold mb-4 text-black">Create Custom Link</h2>
            <input 
              type="text" 
              value={customLink}
              onChange={(e) => setCustomLink(e.target.value)}
              placeholder="Enter custom link"
              className="w-full p-2 border rounded mb-4 text-black"
            />
            <div className="flex justify-between">
              <button 
                onClick={() => setShowCustomLinkModal(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreateCustomLink}
                className="bg-[#4BAF2A] text-white px-4 py-2 rounded"
              >
                Create Link
              </button>
            </div>
          </div>
        </div>
      )}

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