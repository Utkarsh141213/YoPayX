import React from "react";
import "../assets/styles/staking.css";

const StakingCard = () => {
  return (
    <div className="staking-container">
      <div className="staking-card">
        <h5 className="subheading">Highest return on</h5>
        <h2 className="main-heading">STAKING</h2>
        <h1 className="return-rate">30% p.a.</h1>
        <p className="annual-return">
          Annual return with <span className="highlight">yatripay</span>
        </p>
        <button className="add-funds"> <span className="add-funds-text">Add Funds</span></button>
        <div className="note-container">
        <p className="note">*Minimum 7 days locking period</p>
        <p className="note">*Start with minimum 500 Rs.</p>
        </div>
      </div>
    </div>
  );
};

export default StakingCard;
