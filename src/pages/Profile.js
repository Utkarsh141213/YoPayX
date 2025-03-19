import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";
import {
  mfaSvg,
  bankSvg,
  kycSvg,
  pinSvg,
  changePassSvg,
  authSvg,
} from "../assets/profile_assets";
import { changePIN } from "../services/kycService";
import TransactionPin from "../components/KYC/TransactionPin";
import { toast } from "react-toastify";
import logo from "../assets/yatri-pay-logo-main.png";


const Profile = () => {
  const navigate = useNavigate();
  const [avatarUrl, setAvatarUrl] = useState("");
  const [name, setName] = useState("name");
  const [email, setEmail] = useState("email");
  const [registeredOn, setRegisteredOn] = useState(null);
  const [referredBy, setReferredBy] = useState("");
  const [showTransactionPin, setShowTransactionPin] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
      return;
    }

    setAvatarUrl(user.avatar);
    setName(user.first_name);
    setEmail(user.email);
    setRegisteredOn(user.email_verified_at);
    setReferredBy(user.referral_id);
  }, [navigate]);

  const handlePinSubmit = async (pin) => {
    try {
      const response = await changePIN({ pin });
      if (response.data?.success) {
        toast.success(response.data.message || "Transaction successful!");
        setShowTransactionPin(false);
        navigate("/dashboard2");
      } else {
        toast.error(response.data?.message || "Transaction failed!");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || err.message);
    }
  };

  const handleLogout = () => {
    logout();
    window.localStorage.clear();
    navigate("/");
  };

  if (showTransactionPin) {
    return (
      <TransactionPin
        onSubmitPin={handlePinSubmit}
        onCancel={() => setShowTransactionPin(false)}
      />
    );
  }

  return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center  px-6">
         <header>
          <div className="flex flex-col justify-center items-center py-6 mt-16">
            <img src={logo} alt="logo" className="h-8 md:h-12" />
            <h1 className='text-3xl'>Profile</h1>
          </div>
        </header>

        <div
          onClick={handleLogout}
          className="absolute top-8 right-10 text-lg cursor-pointer"
        >
          Logout
        </div>

        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 rounded-full mb-4 bg-gray-600 overflow-hidden">
            {avatarUrl && (
              <img
                src={avatarUrl}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="text-center">
            <div className="font-semibold">{name || "Name"}</div>
            <div className="text-sm text-white">{email || "Email"}</div>
            <div className="text-sm text-white">
              {registeredOn ? `Registered on ${registeredOn}` : "Registered on"}
            </div>
            <div className="text-sm text-white">
              {referredBy ? `Referred by ${referredBy}` : "Referred by"}
            </div>
          </div>
        </div>

        {/* Grid of icons */}
        <div className="grid md:flex grid-cols-3 gap-6 md:gap-12 max-w-xl cursor-pointer">
          <div
            onClick={() => navigate("/kyc/basic-details")}
            className="flex flex-col items-center"
          >
            <div className="w-10 h-10 mb-2">
              <img
                src={kycSvg}
                alt="KYC Icon"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-sm">KYC</span>
          </div>
          <div
            onClick={() => navigate("/kyc/bank-details")}
            className="flex flex-col items-center"
          >
            <div className="w-10 h-10 mb-2">
              <img
                src={bankSvg}
                alt="Bank Details Icon"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-sm">Bank Details</span>
          </div>
          <div
            onClick={() => navigate("/kyc/mfa")}
            className="flex flex-col items-center"
          >
            <div className="w-10 h-10 mb-2">
              <img
                src={mfaSvg}
                alt="2FA Icon"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-sm">2FA</span>
          </div>
          <div
            onClick={() => setShowTransactionPin(true)}
            className="flex flex-col items-center"
          >
            <div className="w-10 h-10 mb-2">
              <img
                src={pinSvg}
                alt="Pin Icon"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-sm">Pin</span>
          </div>
          <div
            onClick={() =>
              navigate("/forgotPassword", { state: { requiredStep: 3 } })
            }
            className="flex flex-col items-center"
          >
            <div className="w-10 h-10 mb-2">
              <img
                src={changePassSvg}
                alt="Change Password Icon"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-sm">Change Password</span>
          </div>

          <div
            // onClick={() => navigate("/")}
            className="flex flex-col items-center"
          >
            <div className="w-10 h-10 mb-2">
              <img
                src={authSvg}
                alt="Disable Authentication Icon"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-sm">Disable Authentication</span>
          </div>
        </div>
      </div>
  );
};

export default Profile;
