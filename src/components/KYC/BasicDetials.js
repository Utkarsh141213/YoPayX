import React, { useState, useEffect, useRef } from "react";
import InputField from "./InputField";
import { useKycContext } from "../../context/KycContext";
import { useNavigate } from "react-router-dom";

// const InputField = ({ type = "text", name, placeholder, value, onChange, ...rest }) => {
//   return (
//     <div className="KYC-input mb-3">
//       <input
//         type={type}
//         name={name}
//         placeholder={placeholder}
//         value={value}
//         onChange={onChange}
//         className="w-full border border-gray-300 rounded py-3 px-3 focus:outline-none focus:border-green-500 text-black"
//         required
//         {...rest}
//       />
//     </div>
//   );
// };

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
        className={`bg-white text-left w-full border border-gray-300 rounded  px-3 focus:outline-none focus:border-green-500  cursor-pointer ${
          value === "" ? "text-gray-500 text-[0.8rem] py-3" : "text-black py-[14px]"
        }`}
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
        style={{ pointerEvents: 'auto' }}
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
  const { updateBasicDetails } = useKycContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    country: "",
  });
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        const countryNames = data
          .map((country) => country.name.common)
          .sort((a, b) => a.localeCompare(b));
        setCountries(countryNames);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

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

  const genderOptions = ["Male", "Female", "Other"];

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
          pattern="(0[1-9]|[12]\\d|3[01])-(0[1-9]|1[0-2])-(19|20)\\d{2}"
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
          className="w-fit px-12 mt-4 bg-[#4BAF2A] text-white font-semibold py-3 rounded hover:bg-green-600 transition-colors"
        />
      </form>
    </div>
  );
};

export default BasicDetials;