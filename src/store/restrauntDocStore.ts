import { create } from "zustand";

interface RestaurantDocState {
  docDetailsData: {
    pan: File | null;
    panNumber: string;
    IsGst: boolean;
    GstNumber: string;
    gst: File | null;
    FssaiNumber: string;
    FssaiExpiry: string;
    fssai: File | null;
    BankAccountNumber: string;
    ReBankAccountNumber: string;
    BankIfscCode: string;
  };
  setDocDetailsData: (
    field: string,
    value: string | boolean | File | null
  ) => void;
}

const useRestaurantDocStore = create<RestaurantDocState>((set) => ({
  docDetailsData: {
    panNumber: "",
    pan: null,
    IsGst: false,
    GstNumber: "",
    gst: null,
    FssaiNumber: "",
    FssaiExpiry: "",
    fssai: null,
    BankAccountNumber: "",
    ReBankAccountNumber: "",
    BankIfscCode: "",
  },
  setDocDetailsData: (field, value) => {
    set((state) => ({
      docDetailsData: {
        ...state.docDetailsData,
        [field]: value,
      },
    }));
  },
}));

export default useRestaurantDocStore;
