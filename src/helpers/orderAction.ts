// src/helpers/blogcontent/orderActions.ts
"use server";

import { getOrders } from "./api-utils";

export const fetchCompletedOrders = async () => {
  try {
    const result = await getOrders("completed", 0, 10);
    return result.orders.content;
  } catch (error) {
    console.error("Failed to fetch completed orders:", error);
    return [];
  }
};
