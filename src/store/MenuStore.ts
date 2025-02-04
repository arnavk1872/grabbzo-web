import { create } from "zustand";

interface ItemState {
  selectedItem: any | null;
  setSelectedItem: (item: any) => void;
}

export const useItemStore = create<ItemState>((set) => ({
  selectedItem: null,
  setSelectedItem: (item) => set({ selectedItem: item }),
}));
