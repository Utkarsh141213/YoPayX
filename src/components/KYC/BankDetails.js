import React, { useState, useEffect } from "react";
import InputField from "./InputField";
import { createBankDetials, getBankDetails } from "../../services/kycService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BankDetails = () => {
  const navigate = useNavigate();

  const [bankDetails, setBankDetails] = useState(null);

  const [formData, setFormData] = useState({
    accountHolderName: "",
    bankName: "",
    accountNumber: "",
    IFSCCode: "",
    UPIId: "",
  });

  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        const response = await getBankDetails();
        console.log(response);
        if (response && response.length > 0) {
          setBankDetails(response[0]);
        }
      } catch (error) {
        console.error("Error fetching bank details:", error);
      }
    };

    fetchBankDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createBankDetials({
        account_holder_name: formData.accountHolderName,
        bank_name: formData.bankName,
        account_number: parseInt(formData.accountNumber, 10),
        ifsc_code: formData.IFSCCode,
        upi_id: formData.UPIId,
      });
      toast.success("Bank details created successfully");
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.status === 500) {
        toast.error("Bank details already exist.");
      } else {
        toast.error(error.response?.data?.message || error.message);
      }
      console.error(error);
    }
  };

  if (bankDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-8 rounded-md w-full max-w-2xl shadow-md">
          <h2 className="text-3xl font-bold text-center mb-10">Bank Details</h2>
          <div className="mb-4 space-y-2">
            <div className="flex gap-4">
              <span className="flex-1 font-semibold text-right">
                Account Holder Name:
              </span>
              <span className="flex-1 text-xl font-semibold text-left">
                {bankDetails.account_holder_name}
              </span>
            </div>
            <div className="flex gap-4">
              <span className="flex-1 font-semibold text-right ">
                Bank Name:
              </span>
              <span className="flex-1 text-xl font-semibold text-left">
                {bankDetails.bank_name}
              </span>
            </div>
            <div className="flex gap-4">
              <span className="flex-1 font-semibold text-right">
                Account Number:
              </span>
              <span className="flex-1 text-xl font-semibold text-left">
                {bankDetails.account_number}
              </span>
            </div>
            <div className="flex gap-4">
              <span className="flex-1 font-semibold text-right">
                IFSC Code:
              </span>
              <span className="flex-1 text-xl font-semibold text-left">
                {bankDetails.ifsc_code}
              </span>
            </div>
            <div className="flex gap-4">
              <span className="flex-1 font-semibold text-right">UPI ID:</span>
              <span className="flex-1 text-xl font-semibold text-left">
                {bankDetails.upi_id}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="p-8 rounded-md w-full max-w-2xl shadow-md"
      >
        <h2 className="text-3xl font-bold text-center mb-10">Bank Details</h2>

        <InputField
          name="accountHolderName"
          placeholder="Account holder name"
          value={formData.accountHolderName}
          onChange={handleChange}
          pattern="^[A-Za-z ]+$"
          title="Name should contain only letters and spaces"
        />
        <InputField
          name="bankName"
          placeholder="Bank name"
          value={formData.bankName}
          onChange={handleChange}
          pattern="^[A-Za-z ]+$"
          title="Bank name should contain only letters and spaces"
        />
        <InputField
          name="accountNumber"
          type="text"
          placeholder="Account number"
          value={formData.accountNumber}
          onChange={handleChange}
          pattern="^[0-9]{9,18}$"
          title="Account number should be between 9 and 18 digits"
        />
        <InputField
          name="IFSCCode"
          placeholder="IFSC code"
          value={formData.IFSCCode}
          onChange={handleChange}
          pattern="^[A-Z]{4}0[A-Z0-9]{6}$"
          title="IFSC code should be 11 characters: 4 letters, followed by 0, then 6 alphanumeric characters"
        />
        <InputField
          name="UPIId"
          placeholder="UPI Id"
          value={formData.UPIId}
          onChange={handleChange}
          pattern="^[a-zA-Z0-9._-]+@[a-zA-Z]+$"
          title="Enter a valid UPI id (e.g. username@bank)"
        />

        <input
          type="submit"
          className="w-fit px-12 mt-4 bg-[#4BAF2A] text-white font-semibold py-3 rounded hover:bg-green-600 transition-colors"
        />
      </form>
    </div>
  );
};

export default BankDetails;
