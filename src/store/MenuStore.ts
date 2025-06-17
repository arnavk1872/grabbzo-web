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
  addonGroupId: number;
  setAddonGroupId: (addonGroupId: number) => void;
  subcategoryId: number;
  setSubcategoryId: (subcategoryId: number) => void;
  accordionValue: string | undefined;
  setAccordionValue: (value: string | undefined) => void;
}

export const useItemStore = create<ItemState>((set) => ({
  selectedItem: null,
  setSelectedItem: (item) => set({ selectedItem: item }),
  categoryValue: "",
  setCategoryValue: (category) => set({ categoryValue: category }),
  categoryId: 0,
  setCategoryId: (category) => set({ categoryId: category }),
  itemId: 0,
  setItemId: (itemId) => set({ itemId: itemId }),
  addonGroupId: 0,
  setAddonGroupId: (addonGroupId) => set({ addonGroupId: addonGroupId }),
  subcategoryId: 0,
  setSubcategoryId: (subcategoryId) => set({ subcategoryId: subcategoryId }),
  accordionValue: undefined,
  setAccordionValue: (value) => set({ accordionValue: value }),
}));
