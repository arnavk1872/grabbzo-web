import { getFlag } from "@/helpers/api-utils";
import { create } from "zustand";

interface PageState {
  currentPage: {
    page: string;
  };
  setCurrentPage: (value: string) => void;
  Franchise: boolean;
  initializeFranchise: () => Promise<void>;
}

const checkFranchise = async () => {
  const RestaurantFlags = await getFlag();
  return RestaurantFlags.franchise;
};

export const usePageStore = create<PageState>((set) => ({
  currentPage: {
    page: "information",
  },

  setCurrentPage: (value: string) => {
    set((state) => ({
      currentPage: {
        ...state.currentPage,
        page: value,
      },
    }));
  },

  Franchise: false,

  initializeFranchise: async () => {
    const franchiseStatus = await checkFranchise();
    set({ Franchise: franchiseStatus });
  },
}));
