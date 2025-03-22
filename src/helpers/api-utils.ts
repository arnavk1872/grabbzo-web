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

export const getOrders = async (type: string) => {
  const token = await getToken();
  if (!token) return;

  try {
    const response = await axios.get(`${IP}/orders?state=${type}`, {
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
    const response = await axios.get(
      `${IP}/restaurant-admins/status`,
      {
        headers: {
          Authorization: ` ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
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

// ------------------------------------------------------------  MENU API's START ------------------------------------//
export const getCategories = async () => {
  const token = await getToken();

  if (!token) return;

  try {
    const response = await axios.get(
      `${IP}/api/menu/restaurant/categories/?restaurantId=1`,
      {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const inStock = async (id: number, status: boolean) => {
  const token = await getToken();
  if (!token) return;

  try {
    const response = await axios.put(
      `${IP}/api/menu/restaurant/categories/item/update-stock?menuItemId=${id}`,
      status,
      {
        headers: {
          Authorization: ` ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error updating stock status:", error);
    throw error;
  }
};

export const addNewCategory = async (value: string) => {
  const token = await getToken();

  if (!token) return;

  try {
    const response = await axios.post(
      `${IP}/api/menu/category-with-items?restaurantId=1`,
      { name: value }, // Dynamically set key-value pair
      {
        headers: {
          Authorization: ` ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    console.error("Error updating stock status:", error);
    throw error;
  }
};

export const addNewItem = async (formData: any) => {
  const token = await getToken();

  if (!token) return;
  const CategoryId = formData?.restaurantCategory.id;
  try {
    // Wrap the formData in an array before sending
    const payload = Array.isArray(formData) ? formData : [formData];

    const response = await axios.post(
      `${IP}/api/menu/restaurant/categories/${CategoryId}/add-items`,
      payload, // Use the array as the payload
      {
        headers: {
          Authorization: ` ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.data[0];
  } catch (error) {
    console.error("Error updating stock status:", error);
    throw error;
  }
};

export const changeCategoryStatus = async (status: any, id: number) => {
  const token = await getToken();

  const payload = {
    isDisabled: status,
  };

  if (!token) return;

  try {
    const response = await axios.put(
      `${IP}/api/menu/restaurant/categories/update-disable-status?categoryId=${id}`,
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
    console.error("Error updating stock status:", error);
    throw error;
  }
};

export const deleteCategory = async (id: number) => {
  const token = await getToken();
  if (!token) return;

  try {
    const response = await axios.delete(
      `${IP}/api/menu/restaurant/categories/delete?categoryId=${id}`,
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

export const deleteItem = async (id: number) => {
  const token = await getToken();
  if (!token) return;

  try {
    const response = await axios.delete(
      `${IP}/api/menu/restaurant/item/delete/${id}`,
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

export const editCategory = async (
  categoryId: number,
  categoryName: string
) => {
  const token = await getToken();
  if (!token) return;
  const payload = {
    name: categoryName,
  };

  try {
    const response = await axios.put(
      `${IP}/api/menu/restaurant/categories/update-name?categoryId=${categoryId}`,
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
    console.error("Error updating stock status:", error);
    throw error;
  }
};

export const getItemDetails = async (ItemId: number) => {
  const token = await getToken();
  if (!token) return;

  try {
    const response = await axios.get(
      `${IP}/api/menu/restaurant/item/${ItemId}`,
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

export const updateItemDetails = async (
  ItemId: number,
  categoryId: number,
  updatedItem: any
) => {
  const token = await getToken();
  if (!token) return;

  try {
    const response = await axios.put(
      `${IP}/api/menu/restaurant/categories/${categoryId}/update-item/${ItemId}`,
      updatedItem,
      {
        headers: {
          Authorization: ` ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error updating stock status:", error);
    throw error;
  }
};

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

export const addItemImage = async (id: number, image: any) => {
  const token = await getToken();

  if (!token) return;
  try {
    const response = await axios.post(
      `${IP}/api/menu/restaurant/item/${id}/upload-Menuimage`,
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

// --------------------------------------------------- MENU API's END --------------------------------------------------

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
      },
    });
    console.log(response.data);
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
    console.log(response, "CHECK");
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
    const response = await axios.get(
      `${IP}/discounts/restaurant`,
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
    const response = await axios.post(
      `${IP}/discounts/restaurant`,
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

export const LinkFranchise = async (franchiseName: string) => {
  const token = await getToken();
  if (!token) return;

  const payload = {
    "name": franchiseName, 
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
    const response = await axios.get(`${IP}/reviews/getRestaurantReviews?restaurantId=${restaurantId}`, {
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
