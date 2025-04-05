// BasicDetials.js
import React, { useState } from "react";
import InputField from "./InputField";
import { useKycContext } from "../../context/KycContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OTP = () => {
  const { submitKyc, update } = useKycContext();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    otp: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        await submitKyc(formData.otp);
        toast.success("KYC submitted successfully");
        navigate('/dashboard')
      } catch (error) {
        toast.error(`${error}`);
      }

    // navigate("/dashboard");
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
          value={formData.otp}
          onChange={handleChange}
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
