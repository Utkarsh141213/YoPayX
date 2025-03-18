import React, { useEffect, useState } from "react";
import "../assets/styles/forgotPassword.css";
import { sendOtp, verifyOtp, resetPassword } from "../services/authService";
import Logo from "../components/logo";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // Steps: 1 -> Email, 2 -> OTP, 3 -> Reset Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { requiredStep } = location.state || {};

  useEffect(() => {
    if (requiredStep) {
      setStep(requiredStep);
    }
  }, [requiredStep]);

  const handleEmailSubmit = async () => {
    if (email === "") {
      toast.error("Email cannot be empty");
      return;
    } else if (!email.includes("@")) {
      toast.error("Please enter a valid email");
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
      toast.error("Passwords do not match");
      return;
    }

    try {
      await resetPassword(password, confirmPassword);

      if (requiredStep) {
        toast.success("Password changed successfully")
        navigate("/profile")
      } else {
        navigate("/login");
      }
    } catch (error) {
      toast.error(
        error.response.data.message ||
          "Error in changing password, please try again"
      );
    }
  };

  return (
      <div className=" mt-5">
        <div className="logo-forget-password">
          <Logo />
        </div>

        <div className="mt-5">
          <h2 className="forget-password-text mb-12">Forgot Password?</h2>

          {step === 1 && (
            <div className=" space-y-12 flex flex-col items-center px-10 sm:px-20">
              <input
                type="email"
                placeholder="Email"
                className="md:max-w-[48vw] xl:max-w-[40vw] py-3 px-4 text-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div
                className="bg-[#4BAF2A] text-xl font-bold w-fit px-10 py-3 rounded-xl cursor-pointer flex items-center"
                onClick={handleEmailSubmit}
              >
                SUBMIT
              </div>
            </div>
          )}

          {step === 2 && (
            <div className=" space-y-12 flex flex-col items-center px-10 sm:px-20">
              <input
                type="text"
                placeholder="OTP"
                className="md:max-w-[48vw] xl:max-w-[40vw] py-3 px-4 text-lg"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <div
                className="bg-[#4BAF2A] text-xl font-bold w-fit px-10 py-3 rounded-xl cursor-pointer flex items-center"
                onClick={handleOtpSubmit}
              >
                SUBMIT
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 flex flex-col items-center px-10 sm:px-20">
              <input
                type="password"
                placeholder="New Password"
                className="md:max-w-[48vw] xl:max-w-[40vw] py-3 px-4 text-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="md:max-w-[48vw] xl:max-w-[40vw] py-3 px-4 text-lg mb-4"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div
                className="bg-[#4BAF2A] text-xl font-bold w-fit px-10 py-3 rounded-xl cursor-pointer flex items-center"
                onClick={handlePasswordReset}
              >
                SUBMIT
              </div>
            </div>
          )}
        </div>
      </div>

  );
};

export default ForgotPassword;
