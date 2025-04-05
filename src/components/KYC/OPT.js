// BasicDetials.js
import React, { useState } from "react";
import InputField from "./InputField";
import { useKycContext } from "../../context/KycContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OTP = () => {
  const { submitKyc } = useKycContext();

  const navigate = useNavigate();

  const [OTP, setOTP ] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        await submitKyc(OTP);
        toast.success("KYC submitted successfully");
        navigate('/kyc/basic-details')
      } catch (error) {
        toast.error(error.response?.data?.message || "Wrong OTP");
      }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="p-8 rounded-md w-full max-w-2xl shadow-md"
      >
        <h2 className="text-3xl font-bold text-center mb-10">Provide OTP</h2>

        <InputField
          name="otp"
          type="number"
          placeholder="OTP"
          value={OTP}
          onChange={e => setOTP(e.target.value)}
          required
        />
        <input
          type="submit"
          placeholder=""
          className="w-fit px-12 mt-4 bg-[#4BAF2A] text-white font-semibold
          py-3 rounded hover:bg-green-600 transition-colors "
        />
      </form>
    </div>
  );
};

export default OTP;
