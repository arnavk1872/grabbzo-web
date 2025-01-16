import { create } from "zustand";

interface RestaurantMenuState {
  menuDetailsData: {
    foodType: string;
    deliveryToCars: string;
    serviceType: string;
    restaurantImage: File | null;
    menuImage: File | null;
  };
  setMenuDetailsData: (field: string, value: string | File | null) => void;
}

const useRestaurantMenuStore = create<RestaurantMenuState>((set) => ({
  menuDetailsData: {
    foodType: "",
    deliveryToCars: "",
    serviceType: "",
    restaurantImage: null,
    menuImage: null,
  },
  setMenuDetailsData: (field, value) => {
    set((state) => ({
      menuDetailsData: {
        ...state.menuDetailsData,
        [field]: value,
      },
    }));
  },
}));

export default useRestaurantMenuStore;
