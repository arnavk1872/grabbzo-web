import { create } from "zustand";

interface RestaurantInfoState {
  basicDetailsData: {
    ownerName: string;
    restaurantName: string;
    email: string;
    mobileNumber: string;
    primaryContactNumber: string;
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
  setBasicDetailsData: (field: string, value: string) => void;
}

const useRestaurantInfoStore = create<RestaurantInfoState>((set) => ({
  basicDetailsData: {
    ownerName: "",
    restaurantName: "",
    email: "",
    mobileNumber: "",
    primaryContactNumber: "",
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
}));

export default useRestaurantInfoStore;
