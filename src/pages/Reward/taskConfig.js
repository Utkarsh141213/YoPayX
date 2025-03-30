export const taskConfigurations = {
    
    default: {
      component: "TaskCard",
      action: null,
      navigation: null,
      showQuitButton: false,
    },

    10: {
      component: "TaskCard",
      action: "showSocialMediaProof",
      socialLink: "https://www.instagram.com/yatripay/",
    },
    14: {
      component: "TaskCard",
      action: "showSocialMediaProof",
      socialLink: "https://play.google.com/store/apps/details?id=com.wallet.yatripay",
    },
 
    12: {
      component: "TaskCard",
      navigation: "/staking-summary",
    },

    9: {
      component: "TaskCard",
      showQuitButton: true,
    },

    19: {
      component: "TaskCard",
      showQuitButton: true,
    },

    6: {
      component: "TaskCard",
      action: "showSocialMediaProof",
    },
    7: {
      component: "TaskCard",
      action: "showSocialMediaProof",
    },
    8: {
      component: "TaskCard",
      action: "showSocialMediaProof",
    },
  };