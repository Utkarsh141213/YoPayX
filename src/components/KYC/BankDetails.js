import React, { useState } from "react";
import InputField from "./InputField";
import { createBankDetials } from "../../services/kycService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BankDetails = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    accountHolderName: "",
    bankName: "",
    accountNumber: "",
    IFSCCode: "",
    UPIId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await createBankDetials({
        "account_holder_name": formData.accountHolderName,
        "bank_name": formData.bankName,
        "account_number": parseInt(formData.accountNumber),
        "ifsc_code": formData.IFSCCode,
        "upi_id": formData.UPIId
      });
      toast.success('Bank details created successfully')
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.status === 500) {
        toast.error("Bank details already exist.");
      } else {
        toast.error(error.response?.data?.message || error.message);
      }
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className=" p-8 rounded-md w-full max-w-2xl shadow-md"
      >
        <h2 className="text-3xl font-bold text-center mb-10">Bank Detials</h2>

        <InputField
          name="accountHolderName"
          placeholder="Account holder name"
          value={formData.accountHolderName}
          onChange={handleChange}
        />
        <InputField
          name="bankName"
          placeholder="Bank name"
          value={formData.bankName}
          onChange={handleChange}
        />
        <InputField
          name="accountNumber"
          type="number"
          placeholder="Account number"
          value={formData.accountNumber}
          onChange={handleChange}
        />
        <InputField
          name="IFSCCode"
          placeholder="IFSC code"
          value={formData.IFSCCode}
          onChange={handleChange}
        />
        <InputField
          name="UPIId"
          placeholder="UPI Id"
          value={formData.UPIId}
          onChange={handleChange}
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

export default BankDetails;
