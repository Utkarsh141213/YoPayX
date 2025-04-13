import React, { useContext, useState } from "react";
import InputField from "../components/InputField";
import "../assets/styles/styles.css";
import "../assets/styles/login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../components/logo";
import { API_ENDPOINTS } from "../apiConfig"; // Import API endpoints
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import { IoMdEye, IoMdEyeOff  } from "react-icons/io";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { setIsLoading } = useContext(GlobalContext);

  const isEmailValid = (text) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(text);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are required");
    }

    try {
      setIsLoading(true);

      const reqData = {
        password
      }

      if(isEmailValid(email)){
        reqData.email = email
      }else{
        reqData.phone_no = email
      }
      console.log(reqData);
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqData),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        navigate("/dashboard");
      } else {
        setError(data.message || "Invalid credentials. Try again.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Logo />
      <h2 className="sign-in-text">Sign in</h2>

      {/* <div className="social-login social-login-signin">
        <button className="social-btn facebook-btn">Facebook</button>
        <button className="social-btn google-btn">Google</button>
      </div>

      <div className="divider-signin-form">
        <div className="divider">–––––––––––––––––– or ––––––––––––––––––</div>
      </div> */}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <InputField
            type="text"
            placeholder="Email or Phone number"
            value={email} // Controlled state
            onChange={(e) => setEmail(e.target.value)} // Update email state
          />

          <div className="w-full h-fit relative">
            <InputField
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password} // Controlled state
              onChange={(e) => setPassword(e.target.value)} // Update password state
            />
            <span
            onClick={() => setShowPassword(prev => !prev)}
             className=" absolute right-4 top-0 bottom-0 flex items-center text-black cursor-pointer">
              {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
              </span>
          </div>
          {/* <a href="/forgotPassword"
         className="text-right no-underline text-white hover:underline cursor-pointer ">Forgot ?</a> */}
        </div>

        {/* <CryptoFloatingIcons /> */}

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="submit-btn">
          SUBMIT
        </button>
      </form>

      <p className="forgotpassword d-non mt-2">
        <a href="/#/forgotPassword" className="text-white">
          Forgot Password
        </a>
      </p>
      <p className="signup-link mt-2 login-link">
        Not signed in yet? <a href="/#/signup">Sign up</a>
      </p>
      <p className="terms">Terms of Service & Privacy Policy</p>
    </div>
  );
}

export default Login;
