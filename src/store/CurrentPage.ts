import { create } from "zustand";

interface PageState {
  currentPage: {
    page: string;
  };
  setCurrentPage: (value: string) => void;
  Franchise: string;
  setFranchise: (Franchise: string) => void;
}

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
  Franchise: "",
  setFranchise: (value) => set({ Franchise: value }),
}));
