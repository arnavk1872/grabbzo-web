import { create } from "zustand";
import { getFlag, getFranchiseDetails } from "@/helpers/api-utils";

interface RestaurantInfoState {
  basicDetailsData: {
    ownerName: string;
    restaurantName: string;
    email: string;
    closedDay: string;
    closingTime: Date | undefined;
    shopNo: string;
    floor: string;
    area: string;
    state: string;
    city: string;
    pinCode: string;
    landmark: string;
    latitude: string;
    longitude: string;
  };
  setBasicDetailsData: (
    field: string,
    value: string | Date | undefined
  ) => void;
  initializeRestaurantName: () => Promise<void>;
}

const useRestaurantInfoStore = create<RestaurantInfoState>((set, get) => ({
  basicDetailsData: {
    ownerName: "",
    restaurantName: "",
    email: "",
    closedDay: "",
    closingTime: undefined,
    shopNo: "",
    floor: "",
    area: "",
    state: "",
    city: "",
    pinCode: "",
    landmark: "",
    latitude: "28.632136674970926",
    longitude: "77.21846936089494",
  },
  setBasicDetailsData: (field, value) => {
    set((state) => ({
      basicDetailsData: {
        ...state.basicDetailsData,
        [field]: value,
      },
    }));
  },

  initializeRestaurantName: async () => {
    try {
      const { franchise } = await getFlag();
      if (franchise) {
        const franchiseDetails = await getFranchiseDetails();
        set({
          basicDetailsData: {
            ...get().basicDetailsData,
            restaurantName: franchiseDetails.restaurantName,
          },
        });
      }
    } catch (error) {
      console.error("Error initializing restaurant name:", error);
    }
  },
}));

export default useRestaurantInfoStore;
