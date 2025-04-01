import { getFlag, getFranchiseDetails } from "@/helpers/api-utils";
import { create } from "zustand";

interface RestaurantMenuState {
  menuDetailsData: {
    image: string;
    foodType: boolean;
    deliveryToCars: boolean;
    serviceType: string;
  };
  setMenuDetailsData: (
    field: string,
    value: string | File | null | boolean
  ) => void;
  initializeIsVeg: () => Promise<void>;
}

const useRestaurantMenuStore = create<RestaurantMenuState>((set, get) => ({
  menuDetailsData: {
    foodType: false,
    deliveryToCars: false,
    serviceType: "",
    image: "",
  },
  setMenuDetailsData: (field, value) => {
    set((state) => ({
      menuDetailsData: {
        ...state.menuDetailsData,
        [field]: value,
      },
    }));
  },
  initializeIsVeg: async () => {
    try {
      const { franchise } = await getFlag();
      if (franchise) {
        const franchiseDetails = await getFranchiseDetails();
        set({
          menuDetailsData: {
            ...get().menuDetailsData,
            foodType: franchiseDetails.isVeg,
          },
        });
      }
    } catch (error) {
      console.error("Error initializing restaurant name:", error);
    }
  },
}));

export default useRestaurantMenuStore;
