import React from "react";
import SocialLogin from "../components/SocialLogin";
import InputField from "../components/InputField";
import CryptoFloatingIcons from "../components/CryptoFloatingIcons";
import "../assets/styles/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Signup() {
  return (
    <div className="signup-container">
      <h1 className="logo">Yatri<span>Pay</span> 🚀</h1>
      <h2 className="sign-in-text">Sign up with us!</h2>
      
      {/* Social Login Buttons */}
      <div className="social-login">
        <button className="social-btn facebook-btn">Facebook</button>
        <button className="social-btn google-btn">Google</button>
      </div>

        <div className="divider-signup-form">

        <div className="divider">–––––––––––––––––– or ––––––––––––––––––</div>
        </div>

        {/* Input Fields */}
        <div className="form-group">
            <InputField type="text" className="form-control email-signin" placeholder="Email or username" />
            <InputField type="password" className="form-control password-signin" placeholder="Password" />
            <InputField type="password" className="form-control confirm-password-signin" placeholder="Confirm Password" />
        </div>
        {/* Floating Crypto Icons */}
        <CryptoFloatingIcons />


      {/* Submit Button */}
      <button className="submit-btn">SUBMIT</button>

      <p className="login-link">
        Already a member? <a href="/login">Log in</a>
      </p>
      <p className="terms">
        By creating an account, you agree to YatriPay's <a href="#">Terms & Privacy</a>
      </p>

      
    </div>
  );
}

export default Signup;
