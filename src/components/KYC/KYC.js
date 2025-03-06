
import React from "react";
import { Outlet } from "react-router-dom";
import Background from "../Background";



import { KycProvider } from "../../context/KycContext";

const KYC = () => {
  return (
    <KycProvider>
      <Background>
        <Outlet />
      </Background>
    </KycProvider>
  );
};

export default KYC;
