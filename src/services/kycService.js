import axiosInstance from "./axios";

export const createKYC = async (formData) => {
  try {
    const response = await axiosInstance.post("/finance/kyc/create/", formData, {
      headers: {
        // "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};

// export const createBankDetials = async (data) => {
//   // Convert FormData to a plain object
  

//   try {
//     const response = await fetch('https://chiru-stage.yatripay.com/api/v1/finance/bank-account-details/create', {
//       method: "POST",
//       headers: { 
//         "Authorization": "Token " + localStorage.getItem("token"),
//         // "Content-Type": "application/json"
//       },
//       body: data,
//     });

//     console.log(response);

//     if (!response.ok) {
//       // Log and throw error if server response is not OK
//       const errorText = await response.text();
//       console.error("Server error:", errorText);
//       throw new Error("Server responded with an error");
//     }

//     const result = await response.json();
//     console.log(result);
//     return result;
//   } catch (error) {
//     console.error("Fetch error:", error);
//     return { success: false, message: error.message };
//   }
// };


export const createBankDetials = async (data) => {
  try {
    const response = await axiosInstance.post("/finance/bank-account-details/create/", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const generateOPT = async (phoneData) => {
  // if(!Number.isInteger(phoneData.phone_no)){
  //   throw new Error('invalid phone number format') 
  // }
  await axiosInstance.post('/auth/genrate_mobile_otp/', phoneData, {
    headers: {
      "Content-Type": "application/json"
    }
  })
  return 
} 
