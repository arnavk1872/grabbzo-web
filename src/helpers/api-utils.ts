"use server";
import axios from "axios";
import { cookies } from "next/headers";

const IP = "https://api.grabbzo.com";

export async function decodeJWT(token: string) {
  if (!token) {
    throw new Error("Token is required.");
  }
  const tokenParts = token.startsWith("Bearer ") ? token.slice(7) : token;

  const parts = tokenParts.split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid JWT format. A valid JWT must have three parts.");
  }

  try {
    const base64UrlDecode = (str: string) =>
      decodeURIComponent(
        atob(str.replace(/-/g, "+").replace(/_/g, "/"))
          .split("")
          .map((c) => `%${c.charCodeAt(0).toString(16).padStart(2, "0")}`)
          .join("")
      );

    const header = JSON.parse(base64UrlDecode(parts[0]));
    const payload = JSON.parse(base64UrlDecode(parts[1]));

    return payload;
  } catch (error) {
    console.error("Error decoding JWT:", error);
    throw new Error("Failed to decode JWT");
  }
}

export async function getRestaurantId() {
  const token = await getToken();
  const decodedToken = await decodeJWT(token);

  return decodedToken?.userId;
}

export const getToken = async (): Promise<string> => {
  const cookieStore = cookies();
  const token = (await cookieStore).get("AuthToken")?.value;

  if (!token) {
    console.error("Authorization token is missing!");
    throw new Error("Authorization token is missing!");
  }

  return token;
};

export const getOrders = async (type: string, page = 0, size = 10) => {
  const token = await getToken();
  if (!token) return;

  try {
    const response = await axios.get(`${IP}/orders?state=${type}&page=${page}&size=${size}`, {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const getStatus = async () => {
  const token = await getToken();
  if (!token) return;

  try {
    const response = await axios.get(`${IP}/restaurant-admins/status`, {
      headers: {
        Authorization: ` ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error changing status:", error);
    throw error;
  }
};

export const changeStatus = async (status: boolean) => {
  const token = await getToken();
  if (!token) return;

  const value = status ? "offline" : "online";

  const payload = { status: value };

  try {
    const response = await axios.post(
      `${IP}/restaurant-admins/status`,
      payload,
      {
        headers: {
          Authorization: ` ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.status;
  } catch (error) {
    console.error("Error changing status:", error);
    throw error;
  }
};

export const acceptOrder = async (payload:any) => {
  const token = await getToken();
  if (!token) return;

  try {
    const response = await axios.post(
      `${IP}/orders/accept`,
      payload,
      {
        headers: {
          Authorization: ` ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data, "RESPONSE ACCEPT ORDER");
    return response.data;
  } catch (error) {
    console.error("Error changing status:", error);
    throw error;
  }
};

export const rejectOrder = async (orderId:string,reason:string) => {
  const token = await getToken();
  if (!token) return;

  const payload = {
    orderId: orderId,
    rejectionReason: reason,
  };

  try {
    const response = await axios.post(
      `${IP}/orders/reject`,
      payload,
      {
        headers: {
          Authorization: ` ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data, "RESPONSE REJECT ORDER");
    return response.data;
  } catch (error) {
    console.error("Error changing status:", error);
    throw error;
  }
};

// export const changeStatus = async (status: boolean) => {
//   const token = await getToken();
//   if (!token) return;

//   const restaurantId = await getRestaurantId();
//   const value = status ? "offline" : "online";

//   const payload = { status: value, restaurantId: restaurantId };
//   console.log(payload, "PAYLOAD CHECK");

//   try {
//     const response = await fetch(`${IP}/restaurant-admins/status`, {
//       method: "POST",
//       headers: {
//         Authorization: ` ${token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(payload),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log(data, "RESPONSE");
//     return data.status;
//   } catch (error) {
//     console.error("Error changing status:", error);
//     throw error;
//   }
// };



export const getOrderbyId = async (id: string) => {
  const token = await getToken();
  if (!token) return;

  try {
    const response = await axios.get(`${IP}/orders/getOrderDetails/${id}`, {
      headers: {
        Authorization: ` ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating stock status:", error);
    throw error;
  }
};


// ----------------------------------------------------RESTAURANT PROFILE GET ------------------------------------------

export const getRestaurantDetails = async () => {
  const token = await getToken();
  if (!token) return;
  try {
    const response = await axios.get(`${IP}/restaurant-admins/details`, {
      headers: {
        Authorization: ` ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching the Restaurant Details: ", error);
    throw error;
  }
};

export const getRestaurantPlans = async () => {
  const token = await getToken();
  if (!token) return;

  try {
    const response = await axios.get(`${IP}/plan/restaurant`, {
      headers: {
        Authorization: ` ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching the Restaurant Details: ", error);
    throw error;
  }
};

export const updateRestaurantDetails = async (RestaurantData: any) => {
  const token = await getToken();

  if (!token) return;

  try {
    const response = await axios.post(
      `${IP}/restaurant-admins/update`,
      RestaurantData,
      {
        headers: {
          Authorization: ` ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating stock status:", error);
    throw error;
  }
};

// ---------------------------------------------- LOGIN / SIGNUP API ---------------------------------------------------

export const sendOtp = async (mobileNumber: string) => {
  try {
    const response = await axios.get(
      `${IP}/restaurant/auth/send-otp?mobile=${mobileNumber}`
    );

    return response.data;
  } catch (error) {
    console.error("Error while trying to send otp :", error);
    throw error;
  }
};

export const postLogin = async (data: any) => {
  try {
    const response = await axios.post(`${IP}/restaurant/auth/login`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error while trying to login :", error);
    throw error;
  }
};

export const postSignup = async (data: any) => {
  try {
    const response = await axios.post(`${IP}/restaurant/auth/signup`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error while signup :", error);
    throw error;
  }
};

export const getFlag = async () => {
  try {
    const token = await getToken();
    if (!token) return;
    const response = await axios.get(`${IP}/restaurant-admins/flag`, {
      headers: {
        Authorization: ` ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error while retriving flag :", error);
    throw error;
  }
};

export const getFranchiseDetails = async () => {
  try {
    const token = await getToken();
    if (!token) return;
    const response = await axios.get(`${IP}/franchise/details`, {
      headers: {
        Authorization: ` ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error while retriving Franchise Details :", error);
    throw error;
  }
};

export const postRestaurantDetails = async (payload: any) => {
  const cookieStore = cookies();
  const token = (await cookieStore).get("AuthToken")?.value;
  if (!token) return;

  try {
    const response = await axios.post(
      `${IP}/restaurant-admins/update`,
      payload,
      {
        headers: {
          Authorization: ` ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error while payment Request :", error);
    throw error;
  }
};

export const paymentRequest = async (data: any) => {
  const cookieStore = cookies();
  const token = (await cookieStore).get("AuthToken")?.value;
  if (!token) {
    return {
      status: 401,
      message: "Authentication token is missing or invalid.",
    };
  }
  try {
    const response = await axios.post(`${IP}/pg/createOrder`, data, {
      headers: {
        Authorization: ` ${token}`,
        "Content-Type": "application/json",
        'access-control-expose-headers': 'Content-Encoding, X-Parse-Job-Status-Id, X-Parse-Push-Status-Id',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error while payment Request :", error);
    throw error;
  }
};

export const uploadDocuments = async (image: any) => {
  const token = await getToken();

  if (!token) return;
  try {
    const response = await axios.post(
      `${IP}/restaurant-admins/upload-document`,
      image,
      {
        headers: {
          Authorization: ` ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating stock status:", error);
    throw error;
  }
};

//------------------------------------------------------- ORDERS API's ----------------------------------------------//

export const changeOrderStatus = async (orderStatus: string, orderId: any) => {
  // const payload = {
  //   restaurant: {
  //     id: orderId,
  //   },
  //   status: orderStatus,
  // };
  const token = await getToken();

  if (!token) return;
  try {
    const response = await axios.post(
      `${IP}/orders/status?orderId=${orderId}&status=${orderStatus}`,
      {
        headers: {
          Authorization: ` ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error :", error);
    throw error;
  }
};

//------------------------------------------------------- ORDERS API's END ----------------------------------------------//

export const buyAdCredits = async (amount: number) => {
  const token = await getToken();

  if (!token) return;
  try {
    const response = await axios.post(
      `${IP}/plan/adcredit`,
      {
        amount: amount,
      },
      {
        headers: {
          Authorization: ` ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error :", error);
    throw error;
  }
};

// ---------------------------------------------------------- DISCOUNTS API's ----------------------------------------------------------

export const getAllDiscounts = async () => {
  const token = await getToken();

  if (!token) return;
  try {
    const response = await axios.get(`${IP}/discounts/restaurant`, {
      headers: {
        Authorization: ` ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error :", error);
    throw error;
  }
};

export const deleteDiscount = async (discountId: number) => {
  const token = await getToken();

  if (!token) return;
  try {
    const response = await axios.delete(`${IP}/discounts/${discountId}`, {
      headers: {
        Authorization: ` ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error :", error);
    throw error;
  }
};

export const updateDiscountStatus = async (discountId: number) => {
  const token = await getToken();

  if (!token) return;
  try {
    const response = await axios.put(
      `${IP}/discounts/${discountId}`,
      {},
      {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error :", error);
    throw error;
  }
};

export const addNewDiscount = async (payload: any) => {
  const token = await getToken();

  if (!token) return;
  try {
    const response = await axios.post(`${IP}/discounts/restaurant`, payload, {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong!";

      throw new Error(errorMessage);
    }

    throw new Error("Something went wrong!");
  }
};
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const getFranchises = async (words: any) => {
  const token = await getToken();

  if (!token) return;
  try {
    const response = await axios.get(`${IP}/franchise/search?words=${words}`, {
      headers: {
        Authorization: ` ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error :", error);
    throw error;
  }
};

export const LinkFranchise = async (franchiseName: string | null,isFranchise:boolean) => {
  const token = await getToken();
  if (!token) return;

  const payload = {
    NEW: franchiseName,
    franchise:isFranchise
  };

  try {
    const response = await axios.post(
      `${IP}/franchise/add-restaurant`,
      payload,
      {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    console.error("Error :", error);
    throw error;
  }
};

export const getReviews = async () => {
  const token = await getToken();
  const restaurantId = await getRestaurantId();

  if (!token) return;
  try {
    const response = await axios.get(
      `${IP}/reviews/getRestaurantReviews?restaurantId=${restaurantId}`,
      {
        headers: {
          Authorization: ` ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error :", error);
    throw error;
  }
};

export const getBasicDetails = async () => {
  const token = await getToken();

  if (!token) return;
  try {
    const response = await axios.get(
      `${IP}/restaurant-admins/basic-details`,
      {
        headers: {
          Authorization: ` ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error :", error);
    throw error;
  }
};

export const getCuisines = async () => {
  const token = await getToken();

  if (!token) return;
  try {
    const response = await axios.get(
      `${IP}/restaurant-admins/cuisine`,
      {
        headers: {
          Authorization: ` ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.data;
    
  } catch (error) {
    console.error("Error :", error);
    throw error;
  }
};

export const numberCheck = async (number:string) => {
 
  try {
    const response = await axios.get(
      `${IP}/restaurant/auth/check?mobile=${number}`,
     
    );
    return response;
    
  } catch (error) {
    console.error("Error :", error);
    throw error;
  }
};

