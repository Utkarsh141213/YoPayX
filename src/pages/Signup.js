import React, { useContext, useEffect, useState } from "react";
// import SocialLogin from "../components/SocialLogin";
import InputField from "../components/InputField";
import CryptoFloatingIcons from "../components/CryptoFloatingIcons";
import "../assets/styles/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../components/logo";
import {
  registerFirst,
  verifyEmail,
  secondRegister,
} from "../services/authService";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { GlobalContext } from "../context/GlobalContext";

const Signup = () => {
  const [step, setStep] = useState(1); // Steps: 1 -> Email, 2 -> OTP, 3 -> password
  const [email, setEmail] = useState("");
  const [first_name, setfirst_name] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setotp] = useState("");
  const [referral_id, setReferral_id] = useState("");

  const [query] = useSearchParams()

  useEffect(() => {
    if(query.get('ref')){
     setReferral_id(query.get('ref'))
    }
  }, [query])

  const navigate = useNavigate();
  const { setIsLoading } = useContext(GlobalContext);

  const handleEmailSubmit = async () => {
    setIsLoading(true);

    try {
      let response;
      if (referral_id) {
        response = await registerFirst({ email, first_name, referral_id });
      } else {
        response = await registerFirst({ email, first_name });
      }

      if (response.success) {
        setStep(2);
      } else if (!response.success && response.message === "Reset Email") {
        toast("User Already Register User");
      }
    } catch (error) {
      toast(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyEmail = async () => {
    try {
      setIsLoading(true);
      const response = await verifyEmail(email, otp);
      if (response && response.data) {
        localStorage.setItem("token", response.data.token);
        setStep(3);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePassword = async () => {
    try {
      setIsLoading(true);
      const response = await secondRegister(password, confirmPassword);
      if (response) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/onboarding");
      }
    } catch (error) {
      // console.log(error);
      toast.error(error.response?.data?.password || "Something went worng");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <Logo />
      <h2 className="sign-in-text">Sign up with us!</h2>

      {/* Social Login Buttons */}
      {/* <div className="social-login">
        <button className="social-btn facebook-btn">Facebook</button>
        <button className="social-btn google-btn">Google</button>
      </div>

      <div className="divider-signup-form">
        <div className="divider">–––––––––––––––––– or ––––––––––––––––––</div>
      </div> */}

      {/* Input Fields */}

      {/* <InputField type="text" className="form-control email-signin" placeholder="Email or username" />
            <InputField type="password" className="form-control password-signin" placeholder="Password" />
            <InputField type="password" className="form-control confirm-password-signin" placeholder="Confirm Password" /> */}
      {step === 1 && (
        <>
          <div className="form-group">
            <InputField
              type="email"
              placeholder="Email"
              className="form-control email-signin"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              type="text"
              placeholder="Full Name"
              className="form-control email-signin"
              value={first_name}
              onChange={(e) => setfirst_name(e.target.value)}
            />
            <InputField
              type="text"
              placeholder="Referral ID"
              className="form-control email-signin"
              value={referral_id}
              onChange={(e) => setReferral_id(e.target.value)}
            />
          </div>
          <button className="submit-btn" onClick={handleEmailSubmit}>
            SUBMIT
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <div className="form-group">
            <InputField
              type="password"
              placeholder="Password"
              className="form-control password-signin"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputField
              type="password"
              placeholder="Confirm Password"
              className="form-control password-signin"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button className="submit-btn" onClick={handlePassword}>
            SUBMIT
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <div className="form-group">
            <InputField
              type="text"
              placeholder="OTP"
              className="form-control password-signin"
              value={otp}
              onChange={(e) => setotp(e.target.value)}
            />
          </div>
          <button className="submit-btn" onClick={handleVerifyEmail}>
            SUBMIT
          </button>
        </>
      )}

      {/* Floating Crypto Icons */}
      <CryptoFloatingIcons />

      <p className="login-link">
        Already a member? <a href="/YoPayX#/login">Log in</a>
      </p>
      <p className="terms">
        By creating an account, you agree to YatriPay's{" "}
        <a href="/">Terms & Privacy</a>
      </p>
    </div>
  );
};

export default Signup;
