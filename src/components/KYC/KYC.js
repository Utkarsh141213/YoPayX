
import React from "react";
import { Outlet } from "react-router-dom";

import { KycProvider } from "../../context/KycContext";
import Footer from "../common/Footer";

const KYC = () => {
  return (
    <KycProvider>
        <Outlet />
        <section className="flex my-10 ml-[4vw] md:ml-[16vw]">
          <Footer />
        </section>
    </KycProvider>
  );
};

export default KYC;
