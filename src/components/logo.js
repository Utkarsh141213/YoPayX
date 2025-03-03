import React from "react";
import yatripay_green from "../assets/yatri-pay-logo-main.png";

function logo() {
  return (
    <>
            {/* <h1 className="logo">Yatri<span>Pay</span> 🚀</h1> */}
            <div className="logo-container">
          <img src={yatripay_green} alt="yatripay_greenIcon" className="logo-img" />
        </div>
            
    </>
  );
}

export default logo;
