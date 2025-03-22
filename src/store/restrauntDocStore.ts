import { create } from "zustand";

interface RestaurantDocState {
  docDetailsData: {
    panNumber: string;
    panFile: File | null;
    IsGst: boolean;
    GstNumber: string;
    GstFile: File | null;
    FssaiNumber: string;
    FssaiExpiry: string;
    FssaiFile: File | null;
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
    panFile: null,
    IsGst: false,
    GstNumber: "",
    GstFile: null,
    FssaiNumber: "",
    FssaiExpiry: "",
    FssaiFile: null,
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
