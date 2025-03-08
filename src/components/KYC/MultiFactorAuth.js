import React from "react";
import InputField from "./InputField";

const MultiFactorAuth = () => {
  return (
    <div className="min-h-screen  ">
        <div className="flex flex-col items-center justify-center w-[80vw] sm:w-[40vw] mx-auto min-h-screen">
      <div className="space-y-8 mb-4">
        <h1 className="text-3xl font-bold">2FA</h1>

          <div className="h-32 w-32 bg-white/70"></div>
          <p className="text-center text-sm text-white/50">QR Code</p>

      </div>

      <div className="text-left w-full">
        <label htmlFor="securityKey" className="text-white/50 text-sm mb-2">Security Key</label>
        <InputField name={"securityKey"} placeholder={"Security Key"} />
        <label htmlFor="securityKey" className="text-white/50 text-sm mb-2">2FA Code</label>
        <InputField name={"2FACode"} placeholder={"2FA Code"} />
      </div>

      <div>
        <button
        className="bg-[#4BAF2A] text-white my-3 w-fit px-12 py-4 text-lg font-bold flex items-center "
        >Submit</button>
      </div>

      <div className="text-white/50 text-[10px] text-left  w-full flex flex-col">
        <span className="">We recommend enabling Two-Factor</span>
        <span>Authentication to provide an extra layer of security to your account.</span>
        <span>1. Install a two-factor authentication app. We recommend using Google Authenticator for iPhone OR Android.</span>
        <span> 2. Configure the app: Add your DualPaymentSystem account to your two-factor authentication app by doing one of the following:        </span>
        <span>3. Enter the 6-digit code that the app generates.</span>
      </div>

    </div>
    </div>
  );
};

export default MultiFactorAuth;


