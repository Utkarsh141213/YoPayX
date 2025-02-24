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
