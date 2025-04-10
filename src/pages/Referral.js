import React, { useContext, useEffect, useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import logo from "../assets/yatri-pay-logo-main.png";
import {
  createCustomReferralLink,
  getReferredUserList,
  getUserReferralLink,
} from "../services/promotion/promotionAPI";
import FAQ from "../components/common/FAQ";
import Footer from "../components/common/Footer";
import { toast } from "react-toastify";
import { GlobalContext } from "../context/GlobalContext";
import BackToHomeButton from "../components/common/BackToHomeButton";

export const WEB_REFERRAL_LINK = "https://webapp.yatripay.com/YoPayX#/signup?ref=";


export const CopyableText = ({ label, text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div className="text-left">
      <div className="flex gap-3 items-center">
        <span className="text-xl">{label}</span>
        <div
          onClick={handleCopy}
          className="text-sm rounded-3xl cursor-pointer flex items-center gap-1"
        >
          <FaRegCopy />
          {copied && <span className="text-green-400">Copied!</span>}
        </div>
      </div>
      <div className="text-lg text-gray-300 break-all">{text}</div>
    </div>
  );
};

const Referral = () => {
  const [referralCode, setReferralCode] = useState();
  const [referralLink, setReferralLink] = useState();
  const [showCustomLinkModal, setShowCustomLinkModal] = useState(false);
  const [customLink, setCustomLink] = useState("");
  const [referralId, setReferralId] = useState();
  const [referredUsers, setReferredUsers] = useState([]);
  const { setIsLoading } = useContext(GlobalContext);

  const handleInviteFriends = async () => {
    if (navigator.share && navigator.canShare()) {
      await navigator
        .share({
          title: "Join YatriPay",
          text: `Download the APP and Get $7. Get a chance to win an iPhone! ${referralLink}`,
          url: referralLink,
        })
        .catch((err) => {
          // console.log("Share canceled or failed: ", err);
          navigator.clipboard
            .writeText(referralLink)
            .then(() => {
              toast.success("Referral link copied to clipboard.");
            })
            .catch((err) => {
              // console.error("Failed to copy referral link: ", err);
            });
        });
    } else {
      navigator.clipboard
        .writeText(referralLink)
        .then(() => {
          toast.success("Link copied!");
        })
        .catch((err) => {
          console.error("Failed to copy referral link: ", err);
        });
    }
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const [referralResponse, referredUsersResponse] = await Promise.all([
          getUserReferralLink(),
          getReferredUserList(),
        ]);

        if (referralResponse && referralResponse.data) {
          setReferralId(referralResponse.data.id);
          setReferralCode(referralResponse.data.code);
          setReferralLink(`${WEB_REFERRAL_LINK}${referralResponse.data.code}`);
        }

        if (referredUsersResponse) {
          const formattedUsers = referredUsersResponse.map((user) => {
            if (user.referred_to.created_at) {
              return {
                ...user,
                referred_to: {
                  ...user.referred_to,
                  created_at: new Date(
                    user.referred_to.created_at
                  ).toLocaleDateString(),
                },
              };
            }
            return user;
          });
          setReferredUsers(formattedUsers);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [setIsLoading]);

  const handleCreateCustomLink = async () => {
    try {
      setIsLoading(true);
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
        setReferralId(newData.data.id);
        setReferralCode(newData.data.code);
        setReferralLink(`${WEB_REFERRAL_LINK}${newData.data.code}`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="text-white w-full max-w-md mx-auto p-4 space-y-8">
        <div className="absolute top-6 left-4 md:top-10 md:left-8">
          {/* <BackToHomeButton /> */}
        </div>
        <header>
          <div className="flex flex-col justify-center items-center py-6">
            <img src={logo} alt="logo" className="h-8 md:h-12" />
          </div>
        </header>

        {/* Referral Code */}
        <CopyableText label="Referral Code" text={referralCode} />

        {/* Referral Link */}
        <CopyableText label="Referral Link" text={referralLink} />

        {/* Action Buttons */}
        <div className="flex flex-col items-center space-y-4">
          <div
            onClick={handleInviteFriends}
            className="bg-[#4BAF2A] hover:bg-green-600 w-full text-center py-2 rounded cursor-pointer"
          >
            Invite Friends
          </div>
          <div
            onClick={() => setShowCustomLinkModal(true)}
            className="bg-[#4BAF2A] hover:bg-green-600 w-full text-center py-2 rounded cursor-pointer"
          >
            Create custom link
          </div>
        </div>

        {/* Referred Users */}
        <div className="space-y-4">
          <h2 className="font-semibold text-center text-lg">Referred Users</h2>
          <div className="flex justify-between px-2">
            <span className="font-semibold">Users</span>
            <span className="font-semibold">Joining Date</span>
          </div>
          {referredUsers.map((item, index) => (
            <div key={index} className="flex justify-between px-2">
              <span>{item.referred_to?.first_name}</span>
              <span>{item.referred_to?.created_at}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Link Modal */}
      {showCustomLinkModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 max-w-md">
            <h2 className="text-xl font-bold mb-4 text-black">
              Create Custom Link
            </h2>
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
