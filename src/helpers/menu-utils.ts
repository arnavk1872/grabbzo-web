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

// CATEGORY --------------------------------------------------------------------

export const addNewCategory = async (value: string) => {
    const token = await getToken();
  
    if (!token) return;
  
    try {
      const response = await axios.post(
        `${IP}/restaurant/menu/category/add`,
        { name: value }, 
        {
          headers: {
            Authorization: ` ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      return response.data.data;
    } catch (error) {
      console.error("Error updating stock status:", error);
      throw error;
    }
  };

  export const getAllCategories = async () => {
    const token = await getToken();
  
    if (!token) return;
  
    try {
      const response = await axios.get(
        `${IP}/restaurant/menu/category/getAll`,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.Categories;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  };

  export const deleteCategory = async (id: number) => {
    const token = await getToken();
    if (!token) return;
  
    try {
      const response = await axios.delete(
        `${IP}/restaurant/menu/category/delete/${id}`,
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
        `${IP}/restaurant/menu/category/modify/${categoryId}`,
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

  //ITEMS --------------------------------------------------------------------

  export const getItemDetails = async (ItemId: number) => {
    const token = await getToken();
    if (!token) return;
  
    try {
      const response = await axios.get(
        `${IP}/restaurant/menu/menuItem/${ItemId}`,
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

  export const addNewItem = async (formData: any) => {
    const token = await getToken();
  
    if (!token) return;
    const CategoryId = formData?.restaurantCategory.id;
    try {
      console.log(formData,"FORM DATA");
  
      const response = await axios.post(
        `${IP}/restaurant/menu/menuItem/add`,
        formData, 
        {
          headers: {
            Authorization: ` ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    console.log(response.data,"RESPONSE");
      return response.data;
    } catch (error) {
      console.error("Error updating stock status:", error);
      throw error;
    }
  };

  export const addBlankItem = async () => {
    const token = await getToken();
  
    if (!token) return;
  
    try {
  
      const response = await axios.post(
        `${IP}/restaurant/menu/menuItem/add-new`,{},
        {
          headers: {
            Authorization: ` ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    console.log(response.data,"RESPONSE ADD BLANK ITEM");
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


  //VARIANTS --------------------------------------------------------------------

  export const addNewVariant = async (formData: any) => {
    const token = await getToken();
  
    if (!token) return;

    try {
      console.log(formData,"FORM DATA");
  
      const response = await axios.post(
        `${IP}/restaurant/menu/menuItem/${formData.itemId}/variants`,
        formData, 
        {
          headers: {
            Authorization: ` ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    console.log(response.data,"RESPONSE");
      return response.data;
    } catch (error) {
      console.error("Error updating stock status:", error);
      throw error;
    }
  };

  export const getAllVariants = async (ItemId: number) => {
    const token = await getToken();
    if (!token) return;
  
    try {
      const response = await axios.get(
        `${IP}/restaurant/menu/menuItem/${ItemId}/variants`,
        {
          headers: {
            Authorization: ` ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data,"GET ALL VARIANTS RESPONSE");
      return response.data;
    } catch (error) {
      console.error("Error updating stock status:", error);
      throw error;
    }
  };

  export const deleteVariant = async (variantId: number) => {
    const token = await getToken();
    if (!token) return;
  
    try {
      const response = await axios.delete(
        `${IP}/restaurant/menu/variants/${variantId}`,
        {
          headers: {
            Authorization: ` ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data,"DELETE RESPONSE");
      return response.data;
    } catch (error) {
      console.error("Error updating stock status:", error);
      throw error;
    }
  };

  //Add-ons --------------------------------------------------------------------


  export const addNewAddOnGroup = async (formData: any) => {
    const token = await getToken();
  
    if (!token) return;

    try {
      console.log(formData,"FORM DATA");
  
      const response = await axios.post(
        `${IP}/restaurant/menu/addonGroup`,
        formData, 
        {
          headers: {
            Authorization: ` ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    console.log(response.data,"RESPONSE ADD ON GROUP");
      return response.data;
    } catch (error) {
      console.error("Error updating stock status:", error);
      throw error;
    }
  };

  export const addNewAddOnItem = async (formData: any, addonGroupId: number) => {
    const token = await getToken();
  
    if (!token) return;

    try {
      console.log(formData,"FORM DATA");
  
      const response = await axios.post(
        `${IP}/restaurant/menu/group/${addonGroupId}`,
        formData, 
        {
          headers: {
            Authorization: ` ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    console.log(response.data,"RESPONSE ADD ON ITEM");
      return response.data;
    } catch (error) {
      console.error("Error updating stock status:", error);
      throw error;
    }
  };


  export const getAllItemsInGroup = async (groupId: number) => {
    const token = await getToken();
    if (!token) return;
  
    try {
      const response = await axios.get(
        `${IP}/restaurant/menu/group/${groupId}`,
        {
          headers: {
            Authorization: ` ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data,"RESPONSE GET ALL ITEMS IN GROUP");
      return response.data;
    } catch (error) {
      console.error("Error updating stock status:", error);
      throw error;
    }
  };

  export const getAllLinkedToItem = async (ItemId: number) => {
    const token = await getToken();
    if (!token) return;
  
    try {
      const response = await axios.get(
        `${IP}/restaurant/menu/menuItem/${ItemId}/addonGroup`,
        {
          headers: {
            Authorization: ` ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data,"GET ALL LINKED TO ITEM RESPONSE");
      return response.data;
    } catch (error) {
      console.error("Error updating stock status:", error);
      throw error;
    }
  };

  export const LinkAddOnToItem = async (itemId: number, addonGroupId: number) => {
    const token = await getToken();
  
    if (!token) return;

    try {
      
      const response = await axios.post(
        `${IP}/restaurant/menu/menuItem/${itemId}/addonGroup/${addonGroupId}/link`,
        {}, 
        {
          headers: {
            Authorization: ` ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    console.log(response.data,"RESPONSE LINK ADD ON TO ITEM");
      return response.data;
    } catch (error) {
      console.error("Error updating stock status:", error);
      throw error;
    }
  };

  export const UnlinkAddOnToItem = async (itemId: number, addonGroupId: number) => {
    const token = await getToken();
  
    if (!token) return;

    try {
      
      const response = await axios.delete(
        `${IP}/restaurant/menu/menuItem/${itemId}/addonGroup/${addonGroupId}/unlink`,
        {
          headers: {
            Authorization: ` ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    console.log(response.data,"RESPONSE UNLINK ADD ON TO ITEM");
      return response.data;
    } catch (error) {
      console.error("Error updating stock status:", error);
      throw error;
    }
  };