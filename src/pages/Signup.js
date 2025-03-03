import React,  { useState}  from "react";
// import SocialLogin from "../components/SocialLogin";
import InputField from "../components/InputField";
import CryptoFloatingIcons from "../components/CryptoFloatingIcons";
import "../assets/styles/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../components/logo"
import { registerFirst, verifyEmail, secondRegister } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Signup = ()=> {
      const [step, setStep] = useState(1);  // Steps: 1 -> Email, 2 -> OTP, 3 -> password
          const [email, setEmail] = useState("");
          const [fullname, setfullName] = useState("");
          const [password, setPassword] = useState("");
          const [confirmPassword, setConfirmPassword] = useState("");
          const [otp, setotp] = useState("");
          const navigate = useNavigate();

          const handleEmailSubmit = async () => {
                  const response = await registerFirst(email,fullname);
                  if (response.success){
                    setStep(2);
                  } 
                  else if(!response.success && response.message === "Reset Email") {
                    alert("User Already Register User");
                  }
              };
              const handleVerifyEmail = async () => {
                const response = await verifyEmail(email,otp);
                if (response){
                  localStorage.setItem("token", response.data.token);
                  setStep(3);
                } 
                else alert("Register First API error");
              };

              const handlePassword = async () => {
                const response = await secondRegister(password,confirmPassword);
                if (response){
                  localStorage.setItem("token", response.data.token);
                  localStorage.setItem("user", JSON.stringify(response.data.user));
                  console.log(localStorage.getItem("user"));
                  navigate("/dashboard");
                }
                else alert("Register First API error");
              };

  return (
    <div className="signup-container">
       <Logo />
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
        
            {/* <InputField type="text" className="form-control email-signin" placeholder="Email or username" />
            <InputField type="password" className="form-control password-signin" placeholder="Password" />
            <InputField type="password" className="form-control confirm-password-signin" placeholder="Confirm Password" /> */}
            {step === 1 && (
                <>
                <div className="form-group">
                    <InputField type="email" placeholder="Email" className="form-control email-signin" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <InputField type="text" placeholder="Full Name" className="form-control email-signin" value={fullname} onChange={(e) => setfullName(e.target.value)} />
                </div>
                    <button className="submit-btn" onClick={handleEmailSubmit}>SUBMIT</button>
                </>
            )}

            {step === 3 && (
                <>
                <div className="form-group">
                    <InputField type="password" placeholder="Password" className="form-control password-signin" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <InputField type="password" placeholder="Confirm Password" className="form-control password-signin" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                    <button className="submit-btn" onClick={handlePassword}>SUBMIT</button>
                </>
            )}

            {step === 2 && (
                <>
                <div className="form-group">
                    <InputField type="text" placeholder="OTP" className="form-control password-signin" value={otp} onChange={(e) => setotp(e.target.value)} />
                </div>
                    <button className="submit-btn" onClick={handleVerifyEmail}>SUBMIT</button>
                </>
            )}

        {/* Floating Crypto Icons */}
        <CryptoFloatingIcons />


      <p className="login-link">
        Already a member? <a href="/YoPayX#/login">Log in</a>
      </p>
      <p className="terms">
        By creating an account, you agree to YatriPay's <a href="#">Terms & Privacy</a>
      </p>

      
    </div>
  );
}

export default Signup;
