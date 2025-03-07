import axiosInstance from "../axios";

export const getAvailableBalace = async () => {
  try {
    const response = await axiosInstance.get("/finance/coin/YTP/balance");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addFundInINR = async (amount) => {
  try {
    if (typeof amount !== "number" && amount <= 0) {
      throw new Error("Amount must be a Number and greate than 0");
    }

    const response = await axiosInstance.create("", amount);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const buyAssets = async (data) => {
  console.log(data);
  const response = await axiosInstance.post(
    "/finance/buy/coin/request",
    JSON.stringify(data),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log('RESPONSE', response.data);
  return response.data;
};

// export const buyAssets = async (data) => {
//   const token = localStorage.getItem("token"); // Retrieve token from local storage
// console.log(token);
//   try {
//     const response = await fetch("/finance/buy/coin/request", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Token ${token}` // Include token in headers
//       },
//       body: JSON.stringify({
//         buy_amount: 203,
//         fiat: "INR"
//       })
//     });
    
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const responseData = await response.json();
//     console.log("RESPONSE", responseData);
//     return responseData;
//   } catch (error) {
//     console.error("Error in buyAssets:", error);
//     throw error;
//   }
// };

