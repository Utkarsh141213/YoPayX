import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../assets/styles/dashboard.css";
import Logo from "../components/logo";
import StakingCard from "../components/StakingCard";

const Dashboard = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const [user, setUser] = useState({
    name: "Profile",
    avatar: null,
  });

  useEffect(() => {
    if (location.state?.userName || location.state?.userImage) {
      setUser({
        name: location.state.userName,
        avatar: location.state.userImage,
      });
    } else {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser({
          name: parsedUser.first_name || "Profile",
          avatar: parsedUser.avatar
            ? parsedUser.avatar.startsWith("http")
              ? parsedUser.avatar
              : `https://wallet.yatripay.com${parsedUser.avatar}`
            : null,
        });
      }
    }
  }, [location.state]);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <Logo />
        <div className="profile-section">
          <button onClick={() => navigate("/profile")} className="profile-btn">
            {user.name}
          </button>
          {user.avatar ? (
            <img src={user.avatar} alt="Profile" className="profile-img" />
          ) : (
            <div className="profile-placeholder"></div>
          )}
        </div>
      </header>

      <section className="staking-card">
        <StakingCard />
      </section>

      <section className="features">
        <div className="feature-card">Zero Transaction Fees</div>
        <div className="feature-card">Daily Rewards</div>
      </section>

      <section className="card-section">
        <div className="crypto-card"></div>
        <div className="card-buttons">
          <button onClick={() => navigate("/add-fund")} className="buy-ytp-btn">
            Add Fund
          </button>
          <button
            onClick={() => navigate("/buy-assets")}
            className="buy-ytp-btn"
          >
            Buy YTP
          </button>
          
          <button
            onClick={() => navigate("/fund", { state: { tab: "sell" } })}
            className="buy-ytp-btn"
          >
            Sell YTP
          </button>
          <button
            onClick={() => navigate("/fund", { state: { tab: "withdraw" } })}
            className="withdraw-btn"
          >
            Withdraw
          </button>

        </div>
      </section>

      <section className="services">
        <div className="service-card">Flights</div>
        <div className="service-card">Staking</div>
        <div className="service-card">Hotel</div>
        <div className="service-card">Rewards</div>
        <div className="service-card">Buy YTP</div>
        <div className="service-card">Referrals</div>
        <div className="service-card">Wallet</div>
        <div className="service-card">Transactions</div>
      </section>

      <section className="banner">Banner</section>
      <section className="invite">
        <p>Invite a friend and get ₹100 worth YTP</p>
        <button className="invite-btn">Invite Now</button>
      </section>

      <section className="videos">
        <div className="video-card">Vid</div>
        <div className="video-card">Vid</div>
        <div className="video-card">Vid</div>
        <div className="video-card">Vid</div>
      </section>

      <section className="chart">Chart</section>

      <footer className="dashboard-footer">
        <p>
          YatriPay is <strong>100% Safe and Decentralized!</strong>
        </p>
        <p>Your assets and transactions are secured with our VM Blockchain.</p>
        <p>Copyright © 2025 YatriPay. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
