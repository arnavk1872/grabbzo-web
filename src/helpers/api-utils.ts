"use server"
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
    const response = await axios.post(
      `${IP}/menu/restaurant/menu-item/in-stock`,
      { id, inStock: status },
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
