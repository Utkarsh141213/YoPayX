const API_BASE_URL = "https://app.yatripay.com/api/v1"; // Replace with the actual base URL

const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/users/auth/login/`,
  REGISTER_FIRST: `${API_BASE_URL}/users/auth/first-register/`,
  REGISTER_SECOND: `${API_BASE_URL}/users/auth/second-register/`,
  VERIFY_EMAIL: `${API_BASE_URL}/users/auth/verify-email/`,
  USER_AUTH_STATUS: `${API_BASE_URL}/users/auth/user-auth/`,
  GENERATE_MOBILE_OTP: `${API_BASE_URL}/auth/genrate_mobile_otp/`,
};

export { API_BASE_URL, API_ENDPOINTS };
