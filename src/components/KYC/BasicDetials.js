import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getKYC } from "../../services/kycService";

import InputField from "./InputField";

const CustomSelectField = ({ name, placeholder, value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const handleDivClick = () => {
    setIsOpen(!isOpen);
    selectRef.current.focus();
  };

  const handleSelectBlur = () => {
    setIsOpen(false);
  };

  return (
    <div className="mb-3 relative">
      <div
        className={`
  
          rounded
          px-3
          py-[17px]
          cursor-pointer
          ${value === "" ? "text-black/60 text-sm" : "text-black"}
          bg-white
          text-left
        `}
        onClick={handleDivClick}
      >
        {value || placeholder}
      </div>
      <select
        ref={selectRef}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
        onBlur={handleSelectBlur}
        style={{ pointerEvents: "auto" }}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};




const BasicDetials = () => {
  const navigate = useNavigate();
  const [kycData, setKycData] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    country: "",
  });

  const [countries, setCountries] = useState([]);

  // Fetch KYC data & countries on mount
  useEffect(() => {
    const fetchCountriesAndKYC = async () => {
      // 1. Fetch countries
      try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json();
        const countryNames = data
          .map((c) => c.name.common)
          .sort((a, b) => a.localeCompare(b));
        setCountries(countryNames);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }

      // 2. Fetch existing KYC
      try {
        const response = await getKYC();
        if (response.success && response.data?.length > 0) {
          setKycData(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching KYC:", error);
        toast.error("Error fetching KYC data");
      }
    };

    fetchCountriesAndKYC();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Basic details:", formData);
    navigate("/kyc/documents");
  };

  const genderOptions = ["Male", "Female", "Other"];

  // If KYC data exists, display read-only
  if (kycData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-8 rounded-md w-full max-w-2xl shadow-md ">
          <h2 className="text-3xl font-bold text-center mb-10">KYC Details</h2>

          <div className="mb-4 space-y-2 ">
            <div className="flex gap-4">
              <span className="flex-1 font-semibold text-right">
                First Name:
              </span>
              <span className="flex-1 text-xl font-semibold text-left">
                {kycData.first_name}
              </span>
            </div>
            <div className="flex gap-4">
              <span className="flex-1 font-semibold text-right">
                Last Name:
              </span>
              <span className="flex-1 text-xl font-semibold text-left">
                {kycData.last_name}
              </span>
            </div>
            <div className="flex gap-4">
              <span className="flex-1 font-semibold text-right">DOB:</span>
              <span className="flex-1 text-xl font-semibold text-left">
                {kycData.dob}
              </span>
            </div>
            <div className="flex gap-4">
              <span className="flex-1 font-semibold text-right">Gender:</span>
              <span className="flex-1 text-xl font-semibold text-left">
                {kycData.gender}
              </span>
            </div>
            <div className="flex gap-4">
              <span className="flex-1 font-semibold text-right">Country:</span>
              <span className="flex-1 text-xl font-semibold text-left">
                {kycData.country}
              </span>
            </div>
            <div className="flex gap-4">
              <span className="flex-1 font-semibold text-right">
                PAN Number:
              </span>
              <span className="flex-1 text-xl font-semibold text-left">
                {kycData.pan_number}
              </span>
            </div>
            <div className="flex gap-4">
              <span className="flex-1 font-semibold text-right">
                ID Number:
              </span>
              <span className="flex-1 text-xl font-semibold text-left">
                {kycData.id_number}
              </span>
            </div>
            <div className="flex gap-4">
              <span className="flex-1 font-semibold text-right">Status:</span>
              <span className="flex-1 text-xl font-semibold text-left">
                {kycData.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If no KYC data, show the form
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
            pattern="^[A-Za-z\s]+$"
            title="First name should contain only letters and spaces"
            required
          />
          <InputField
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            pattern="^[A-Za-z\s]+$"
            title="Last name should contain only letters and spaces"
            required
          />
          <InputField
            name="dateOfBirth"
            placeholder="Date of Birth"
            type="text"
            value={formData.dateOfBirth}
            onChange={handleChange}
            pattern="^(0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])-(19|20)\d{2}$"
            title="Must follow DD-MM-YYYY pattern"
          />
  
          <CustomSelectField
            name="gender"
            placeholder="Select Gender"
            value={formData.gender}
            onChange={handleChange}
            options={genderOptions}
          />
  
          <CustomSelectField
            name="country"
            placeholder="Select Country"
            value={formData.country}
            onChange={handleChange}
            options={countries}
          />
  
          <input
            type="submit"
            value="Next"
            className="w-fit text-xl px-12 mt-4 bg-[#4BAF2A] text-white font-semibold py-3 rounded hover:bg-green-600 transition-colors"
          />
        </form>
      </div>
  );
};


export default BasicDetials;
