import React, { useEffect, useState } from 'react'
import { getUserReferralLink } from '../../services/promotion/promotionAPI';

const ReferralLink = () => {

    const [referralLink, setReferralLink] = useState('');

    

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
        const fetchReferral = async () => {
            try {
              const resReferral = await getUserReferralLink();
              if (resReferral && resReferral.data) setReferralLink(resReferral.data.url);
            } catch (error) {
              console.log(error);
            }
          };
          fetchReferral();
    },[])

  return (
    <div className="mb-6 px-10">
          <p className="text-left text-xl leading-none mb-1">Referral Link</p>
          <p className="text-left mb-4 leading-none">{referralLink}</p>
          <div
          onClick={handleInviteFriends}
          className="bg-[#4BAF2A] text-white py-2 rounded-md text-center cursor-pointer">
            Invite Friends
          </div>
        </div>
  )
}

export default ReferralLink