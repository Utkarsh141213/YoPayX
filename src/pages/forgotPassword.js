import React, { useState } from "react";
import "../assets/styles/forgotPassword.css";
import InputField from "../components/InputField";
import { sendOtp, verifyOtp, resetPassword } from "../services/authService";
import Logo from "../components/logo";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // Steps: 1 -> Email, 2 -> OTP, 3 -> Reset Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate()

  const handleEmailSubmit = async () => {
    if (email === "") {
      return;
    }

    try {
      await sendOtp(email);
      setStep(2);
    } catch (error) {
      toast.error(error.response.data.message || "Error sending OTP");
    }
  };

  const handleOtpSubmit = async () => {
    try {
      await verifyOtp(email, otp);
      setStep(3);
    } catch (error) {
      toast.error(error.response.data.message || "Invalid OTP");
    }
  };

  const handlePasswordReset = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await resetPassword(password, confirmPassword);
        navigate('/login')
    } catch (error) {
        toast.error(error.response.data.message || "Error in changing password, please try again");
    }
  };

  return (
    <div className=" forgotpassword-whole mt-5">
      <div className="logo-forget-password">
        <Logo />
      </div>

      <div className="forgot-password-container">
        <h2 className="forget-password-text mb-5">Forgot Password?</h2>

        {step === 1 && (
          <>
            <InputField
              type="email"
              placeholder="Email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleEmailSubmit}>SUBMIT</button>
          </>
        )}

        {step === 2 && (
          <>
            <p>OTP</p>
            <InputField
              type="text"
              placeholder="OTP"
              className="form-control"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button onClick={handleOtpSubmit}>SUBMIT</button>
          </>
        )}

        {step === 3 && (
          <>
            <InputField
              type="password"
              placeholder="New Password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputField
              type="password"
              placeholder="Confirm Password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={handlePasswordReset}>SUBMIT</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
