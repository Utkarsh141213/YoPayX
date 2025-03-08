import React, { useEffect, useState } from "react";
import Background from "../components/Background";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate()
    const [avatarUrl, setAvatarUrl] = useState("");
    const [name, setName] = useState("name");
    const [email, setEmail] = useState("email");
    const [registeredOn, setRegisteredOn] = useState(null);
    const [referredBy, setReferredBy] = useState("");
    

    
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'))
      if(!user){
        navigate('/login')
        return
      }

      setAvatarUrl(user.avatar)
      setName(user.first_name)
      setEmail(user.email)
      setRegisteredOn(user.email_verified_at)
      setReferredBy(user.referral_id)
    },[navigate])






  return (

    <Background>
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">

      <h1 className="text-3xl font-bold mb-1">YatriPay</h1>
      <h2 className="text-xl font-semibold mb-8">Profile</h2>


      <div className="flex flex-col items-center mb-10">

        <div className="w-24 h-24 rounded-full mb-4 bg-gray-600 overflow-hidden">
          {avatarUrl && (
            <img
              src={avatarUrl}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          )}
        </div>
        {/* Dynamic user details */}
        <div className="text-center">
          <div className="font-semibold">{name || "Name"}</div>
          <div className="text-sm text-gray-400">{email || "Email"}</div>
          <div className="text-sm text-gray-400">
            {registeredOn ? `Registered on ${registeredOn}` : "Registered on"}
          </div>
          <div className="text-sm text-gray-400">
            {referredBy ? `Referred by ${referredBy}` : "Referred by"}
          </div>
        </div>
      </div>

      {/* Grid of 6 icons + labels */}
      <div

      className="grid grid-cols-3 gap-6 max-w-xl cursor-pointer">
        <div 
        onClick={() => navigate('/kyc/basic-details')}
        className="flex flex-col items-center">
          <div className="w-10 h-10 bg-gray-800 rounded-full mb-2" />
          <span className="text-sm">KYC</span>
        </div>
        <div
        onClick={() => navigate('/kyc/bank-details')} 
        className="flex flex-col items-center">
          <div className="w-10 h-10 bg-gray-800 rounded-full mb-2 cursor-pointer" />
          <span className="text-sm">Bank Details</span>
        </div>
        <div onClick={() => navigate('/kyc/mfa')}
         className="flex flex-col items-center">
          <div className="w-10 h-10 bg-gray-800 rounded-full mb-2 cursor-pointer" />
          <span className="text-sm">2FA</span>
        </div>
        <div onClick={() => navigate('/kyc/transaction-pin')}
         className="flex flex-col items-center">
          <div className="w-10 h-10 bg-gray-800 rounded-full mb-2 cursor-pointer" />
          <span className="text-sm">Pin</span>
        </div>
        <div onClick={() => navigate('/')}
         className="flex flex-col items-center">
          <div className="w-10 h-10 bg-gray-800 rounded-full mb-2 cursor-pointer" />
          <span className="text-sm">Change Password</span>
        </div>
        <div onClick={() => navigate('/')}
         className="flex flex-col items-center">
          <div className="w-10 h-10 bg-gray-800 rounded-full mb-2 cursor-pointer" />
          <span className="text-sm">Disable Authentication</span>
        </div>
      </div>
    </div>
    </Background>
  );
};

export default Profile;
