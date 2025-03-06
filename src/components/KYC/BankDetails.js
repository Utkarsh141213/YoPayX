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

    const bankData = new FormData();

    bankData.append("account_holder_name", formData.accountHolderName);
    bankData.append("bank_name", formData.bankName);
    bankData.append("account_number", formData.accountNumber);
    bankData.append("ifsc_code", formData.IFSCCode);
    bankData.append("upi_id", formData.UPIId);

    try {
      await createBankDetials(bankData);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error);
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
