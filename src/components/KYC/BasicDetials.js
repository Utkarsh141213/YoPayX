// BasicDetials.js
import React, { useState } from "react";
import InputField from "./InputField";
import { useKycContext } from "../../context/KycContext";
import { useNavigate } from "react-router-dom";

const BasicDetials = () => {
  const { updateBasicDetails } = useKycContext();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    country: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateBasicDetails(formData);
    console.log("Basic details:", formData);

    navigate("/kyc/documents");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="p-8 rounded-md w-full max-w-2xl shadow-md"
      >
        <h2 className="text-3xl font-bold text-center mb-10">
          Identity Verification
        </h2>

        <InputField
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <InputField
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <InputField
          name="dateOfBirth"
          placeholder="Date of birth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          required
        />
        <InputField
          name="gender"
          placeholder="Gender"
          value={formData.gender}
          onChange={handleChange}
          required
        />
        <InputField
          name="country"
          placeholder="Country"
          value={formData.country}
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

export default BasicDetials;
