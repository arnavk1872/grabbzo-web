import { getFlag } from "@/helpers/api-utils";
import { create } from "zustand";

interface PageState {
  currentPage: {
    page: string;
  };
  pageHistory: string[]; 
  setCurrentPage: (value: string) => void;
  canNavigateTo: (value: string) => boolean;
  Franchise: boolean;
  initializeFranchise: () => Promise<void>;
}

const checkFranchise = async () => {
  const RestaurantFlags = await getFlag();
  return RestaurantFlags.franchise;
};

export const usePageStore = create<PageState>((set, get) => ({
  currentPage: {
    page: "information",
  },
  pageHistory: ["information"], 

  setCurrentPage: (value: string) => {
    const { pageHistory } = get();

    if (!pageHistory.includes(value)) {
      set((state) => ({
        currentPage: { page: value },
        pageHistory: [...state.pageHistory, value],
      }));
    } else {
   
      set(() => ({
        currentPage: { page: value },
      }));
    }
  },

  canNavigateTo: (value: string) => {
    const { pageHistory } = get();
    return pageHistory.includes(value);
  },

  Franchise: false,

  initializeFranchise: async () => {
    const franchiseStatus = await checkFranchise();
    set({ Franchise: franchiseStatus });
  },
}));
