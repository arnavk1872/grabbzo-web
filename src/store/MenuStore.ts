import { create } from "zustand";

interface ItemState {
  selectedItem: any | null;
  setSelectedItem: (item: any) => void;
  categoryValue: string;
  setCategoryValue: (category: string) => void;
  categoryId: number;
  setCategoryId: (category: number) => void;
  itemId: number;
  setItemId: (itemId: number) => void;
}

export const useItemStore = create<ItemState>((set) => ({
  selectedItem: null,
  setSelectedItem: (item) => set({ selectedItem: item }),
  categoryValue: "",
  setCategoryValue: (category) => set({ categoryValue: category }),
  categoryId: 0,
  setCategoryId: (category) => set({ categoryId: category }),
  itemId: 0,
  setItemId: (item) => set({ itemId: item }),
}));
