import React, { useEffect, useState } from 'react';
import { FaRegCopy } from "react-icons/fa";
import { getUserReferralLink } from '../../services/promotion/promotionAPI';
import { useNavigate } from 'react-router-dom';
import { WEB_REFERRAL_LINK } from '../../pages/Referral';

const ReferralLink = () => {
  const [referralLink, setReferralLink] = useState('');
  const [copied, setCopied] = useState(false);

  const navigate = useNavigate()

  const handleCopy = () => {
    if (!referralLink) return;
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  useEffect(() => {
    const fetchReferral = async () => {
      try {
        const resReferral = await getUserReferralLink();
        if (resReferral && resReferral.data)
          setReferralLink(`${WEB_REFERRAL_LINK}${resReferral.data.code}`);
      } catch (error) {
        // console.log(error);
      }
    };
    fetchReferral();
  }, []);

  return (
    <div className="mb-6 px-10">
      <div className="flex gap-3 items-center mb-2">
        <span className="text-xl">Referral link</span>
        <div
          onClick={handleCopy}
          className="text-sm rounded-3xl cursor-pointer flex items-center gap-1"
        >
          <FaRegCopy />
          {copied && <span className="text-green-400">Copied!</span>}
        </div>
      </div>
      <p className="text-left mb-4 leading-none break-all">{referralLink}</p>
      <div
        onClick={() => navigate('/referral')}
        className="bg-[#4BAF2A] hover:bg-green-600 text-white py-2 rounded-md text-center cursor-pointer mt-4"
      >
        Invite Friends
      </div>
    </div>
  );
};

export default ReferralLink;
