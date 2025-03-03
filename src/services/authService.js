import { API_ENDPOINTS } from "../apiConfig";

export const sendOtp = async (email) => {
    try {
        const response = await fetch("/api/send-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });
        return await response.json();
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const verifyOtp = async (email, otp) => {
    try {
        const response = await fetch("/api/verify-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, otp }),
        });
        return await response.json();
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const resetPassword = async (email, password) => {
    try {
        const response = await fetch("/api/reset-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        return await response.json();
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const registerFirst = async (email, first_name) => {
    try {
        const response = await fetch(API_ENDPOINTS.REGISTER_FIRST, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, first_name }),
        });
        return await response.json();
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const verifyEmail = async (email,email_otp) => {
    try {
        const response = await fetch(API_ENDPOINTS.VERIFY_EMAIL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email,email_otp }),
        });
        return await response.json();
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const secondRegister = async (password,password2) => {
    try {
        const response = await fetch(API_ENDPOINTS.REGISTER_SECOND, {
            method: "POST",
            headers: { "Content-Type": "application/json","Authorization": "Token " + localStorage.getItem("token")},
            body: JSON.stringify({ password,password2 }),
        });
        return await response.json();
    } catch (error) {
        return { success: false, message: error.message };
    }
};
