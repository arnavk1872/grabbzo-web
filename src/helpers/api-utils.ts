"use server";
import axios from "axios";
import { cookies } from "next/headers";

const IP = "https://api.grabbzo.com";

export const getToken = async (): Promise<string | undefined> => {
  const cookieStore = cookies();
  const token = (await cookieStore).get("AuthToken")?.value;

  if (!token) {
    console.error("Authorization token is missing!");
    return undefined;
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
      },
    });

    return response.data.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const changeStatus = async (status: boolean) => {
  const token = await getToken();
  if (!token) return;

  const value = status ? "offline" : "online";
  try {
    const response = await axios.post(
      `${IP}/restaurant-admins/status?restaurantId=3`,
      { value }, // Data sent in the body
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
  console.log(token, value);

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
    console.log(response.data, "cKJHSBDK");

    return response.data;
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

    const response = await axios.put(
      `${IP}/api/menu/restaurant/categories/${CategoryId}/add-items`,
      payload, // Use the array as the payload
      {
        headers: {
          Authorization: ` ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data, "Response data");
    return response.data;
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
    console.log(response.data, "RESPOSNE DELETE");
    return response.data;
  } catch (error) {
    console.error("Error updating stock status:", error);
    throw error;
  }
};

// --------------------------------------------------- MENU API's END --------------------------------------------------
