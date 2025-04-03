import { API_ENDPOINTS } from "../apiConfig";
import axiosInstance from "./axios";


export const login = async (data) => {
    const response = await axiosInstance.post("/users/auth/login/", data)
    return response.data
}

export const sendOtp = async (email) => {
  const resposne = await axiosInstance.post("/users/auth/resend-email-otp/", { email: email });
  return resposne.data
};

export const verifyOtp = async (email, email_otp) => {
  await axiosInstance.post("/users/auth/verify-email/", { email, email_otp });
};

export const resetPassword = async (password1, password2) => {
  await axiosInstance.post("/users/auth/forgot-password/", {
    password1,
    password2,
  });
};

export const registerFirst = async (data) => {
  try {
    const response = await fetch(API_ENDPOINTS.REGISTER_FIRST, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    throw error
  }
};

export const verifyEmail = async (email, email_otp) => {
  try {
    const response = await fetch(API_ENDPOINTS.VERIFY_EMAIL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, email_otp }),
    });
    return await response.json();
  } catch (error) {
    throw error
  }
};

export const secondRegister = async (password, password2) => {

    const response = await axiosInstance.post(API_ENDPOINTS.REGISTER_SECOND, { password, password2 } )
    return response.data
     
};

export const logout = async () => {
  try{
    await axiosInstance.get("users/trigger_logout/");
  }catch{
    return
  }
};
