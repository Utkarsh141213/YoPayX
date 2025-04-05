import React, { createContext, useState, useContext } from "react";
import { createKYC,  generateOPT } from "../services/kycService";

const KycContext = createContext();

export const KycProvider = ({ children }) => {
  const [kycData, setKycData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    country: "",

    // Document info
    govtIdFile: null,
    photoFile: null,
    panNumber: "",
    phoneNumber: "",
    otp: ""
  });

  const updateBasicDetails = (basicData) => {
    setKycData((prev) => ({ ...prev, ...basicData }));
  };

  const updateDocumentDetails = (docData) => {
    setKycData((prev) => ({ ...prev, ...docData }));
  };

  const initiateOTP = async (phoneNumber) => {
    await generateOPT({phone_no: `${phoneNumber}`, country_code: `${kycData.country.dial_code}`});
  }

  const submitKyc = async (otp) => {
    try {
      const formData = new FormData();

      formData.append("first_name", kycData.firstName);
      formData.append("last_name", kycData.lastName);
      formData.append("dob", kycData.dateOfBirth);
      formData.append("gender", kycData.gender);
      formData.append("country", kycData.country.name);

      if (kycData.govtIdFile) {
        formData.append("id_proof", kycData.govtIdFile);
      }
      if (kycData.photoFile) {
        formData.append("selfie", kycData.photoFile);
      }
      formData.append("id_number", kycData.panNumber);
      //   formData.append("mo", kycData.phoneNumber);
      formData.append("mobile_otp", otp)
      await createKYC(formData);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <KycContext.Provider
      value={{
        kycData,
        updateBasicDetails,
        updateDocumentDetails,
        submitKyc,
        initiateOTP
      }}
    >
      {children}
    </KycContext.Provider>
  );
};

// 3. Custom hook for easy context consumption
export const useKycContext = () => {
  return useContext(KycContext);
};
