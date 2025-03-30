const API_BASE_URL = "https://app.yatripay.com/api/v1"; // Replace with the actual base URL
// const API_BASE_URL = "https://chiru-stage.yatripay.com/api/v1"; // Replace with the actual base URL

const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/users/auth/login/`,
  REGISTER_FIRST: `${API_BASE_URL}/users/auth/first-register/`,
  REGISTER_SECOND: `${API_BASE_URL}/users/auth/second-register/`,
  VERIFY_EMAIL: `${API_BASE_URL}/users/auth/verify-email/`,
  USER_AUTH_STATUS: `${API_BASE_URL}/users/auth/user-auth/`,
  GENERATE_MOBILE_OTP: `${API_BASE_URL}/users/auth/genrate_mobile_otp/`,

  FUND: {
    TRANSACTION_HISTORY_FILTER: "/finance/transaction/list/by_trans_type/",
    GET_VALUE_OF_COIN_BY_TYPE: '/finance/coin/',
    GET_WALLET_DETAILS: '/finance/wallet/', 
    BUY_ASSETS: '/finance/sell/fiat_to_ytp/',
    GET_ASSET_LIST: '/finance/currency/crypto/list',
  },

  STACKING: {
    GET_OVERVIEW: "/stakes/staking/overview/details/",
    STACKING_CARD_DETAILS: "/stakes/staking/types/list/",
    GET_ALL_STACKNIG: "/stakes/staking/list/",
    GET_STACKING_REWARDS: "/stakes/staking-rois/list/",
    STACKING_CARD_DETAILS_BY_ID: '/stakes/staking/type/',
    CREATE_STACKING: '/stakes/staking/create/'
  },

  PROMOTION: {
    USER_REFERRAL_LINK: "/promotion/user-referral/",
    CREATE_CUSTOM_REFERRAL_LINK: "/promotion/referral/link/customize/",
    GET_REFERRED_USER_LIST: "/promotion/referral/relationships/list/",
    VIDEO_LIST: '/core/fast_video/',
    BANNER_LIST: '/core/banners/list/',
    CREATE_TASK: '/promotion/task/social_media/create/',
    CREATE_SUB_TASK: '/promotion/sub_task/social_media/create/',
    QUIT_TASK: '/promotion/exit_task/',
  },

  REWARDS: {
    GET_TASK_LIST: "/promotion/user-welcome-task/list/",
    GET_IPHONE_TASK_LIST: "/promotion/user-task/list/",
    CLAIM_REWARD: '/promotion/offers/claim-offer/',
  },

  GENERAL: {
    FAQ: "/core/faq/list/",
    NOTIFICATION: "/core/notifications/list/",
  },

  TICKET: {
    CREATE_TICKET: '/support/create-ticket/',
    GET_TICKETS: '/support/user-tickets/',
  },
};

export { API_BASE_URL, API_ENDPOINTS };
