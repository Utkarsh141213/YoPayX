import React, { useState } from "react";
import InputField from "../components/InputField";
import CryptoFloatingIcons from "../components/CryptoFloatingIcons";
import "../assets/styles/styles.css";
import "../assets/styles/login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../components/logo";
import { API_ENDPOINTS } from "../apiConfig"; // Import API endpoints
import { useNavigate } from "react-router-dom";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        // alert("Login Successful!");
        console.log(data.data.token);
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user)); 
        navigate("/dashboard");
      } else {
        setError(data.message || "Invalid credentials. Try again.");
        console.log('error');
      }
    } catch (error) {
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <Logo />
      <h2 className="sign-in-text">Sign in</h2>

      <div className="social-login social-login-signin">
        <button className="social-btn facebook-btn">Facebook</button>
        <button className="social-btn google-btn">Google</button>
      </div>

      <div className="divider-signin-form">
        <div className="divider">–––––––––––––––––– or ––––––––––––––––––</div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
        <InputField
          type="text"
          placeholder="Email"
          value={email} // Controlled state
          onChange={(e) => setEmail(e.target.value)} // Update email state
        />

        <InputField
          type="password"
          placeholder="Password"
          value={password} // Controlled state
          onChange={(e) => setPassword(e.target.value)} // Update password state
        />
        {/* <a href="/forgotPassword"
         className="text-right no-underline text-white hover:underline cursor-pointer ">Forgot ?</a> */}
        </div>

        <CryptoFloatingIcons />

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="submit-btn">SUBMIT</button>
      </form>

      <p className="forgotpassword d-non">
        <a href="/YoPayX#/forgotPassword"
        className="text-white">Forgot Password</a>
      </p>
      <p className="signup-link mt-2 login-link">
        Not signed in yet? <a href="/YoPayX#/signup">Sign up</a>
      </p>
      <p className="terms">Terms of Service & Privacy Policy</p>
    </div>
  );
}

export default Login;
