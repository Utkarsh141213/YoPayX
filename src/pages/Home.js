import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/styles/global.css";
import withdrawalIcon from "../assets/withdrawal-icon.webp";
import { useNavigate } from "react-router-dom"
import Logo from "../components/logo"

function Home() {
  const navigate = useNavigate();
  return (
    <div className="main-container">
      <div className="content">
        <div className="yopayx-logo">
        <Logo />
        </div>
        <h1 className="main-heading">
          365 Days <br /> Withdrawal
        </h1>

        <div className="image-container">
          <img src={withdrawalIcon} alt="Withdrawal Icon" className="withdrawal-icon" />
        </div>

        <button className="btn btn-success get-started" onClick={() => navigate("/signup")}>Get Started</button>

        {/* Floating Crypto Icons */}
        <span className="crypto-icon BTC">₿</span>
        <span className="crypto-icon DOGE">Ð</span>
        <span className="crypto-icon BNB">⧫</span>
        <span className="crypto-icon ETH">♦</span>
      </div>
    </div>
  );
}

export default Home;
