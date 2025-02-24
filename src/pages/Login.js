import React from "react";
// import SocialLogin from "../components/SocialLogin";
import InputField from "../components/InputField";
import CryptoFloatingIcons from "../components/CryptoFloatingIcons";
import "../assets/styles/styles.css";
import "../assets/styles/login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../components/logo"
function Login() {
  return (
    <div className="login-container">
      <Logo />
      <h2 className="sign-in-text">Sign in</h2>
      
      {/* Social Login Buttons */}
      <div className="social-login social-login-signin">
        <button className="social-btn facebook-btn">Facebook</button>
        <button className="social-btn google-btn">Google</button>
      </div>

      <div className="divider-signin-form">
      <div className="divider">–––––––––––––––––– or ––––––––––––––––––</div>
      </div>

      {/* Input Fields */}
      <div className="form-group">
        <InputField type="text" className="form-control" placeholder="Username" />
        <InputField type="password" className="form-control" placeholder="Password" />
      </div>

      {/* Floating Crypto Icons */}
      <CryptoFloatingIcons />

      {/* Submit Button */}
      <button className="submit-btn">SUBMIT</button>
      <p className="forgotpassword">
        <a href="/YoPayX#/forgotPassword">Forgot Password</a>
      </p>
      <p className="signup-link mt-2 login-link">
        Not signed in yet? <a href="/YoPayX#/signup">Sign up</a>
      </p>
      <p className="terms">
        Terms of Service & Privacy Policy
      </p>
    </div>
  );
}

export default Login;
