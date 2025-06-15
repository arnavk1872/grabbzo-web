"use client";
import React, { useEffect, useMemo, useState } from "react";
import AvailableCategories from "./AvailableCategories";
import AvailableItems from "./AvailableItems";
import { useItemStore } from "@/store/MenuStore";

interface AvailableMenuProps {
  allCategories: {
    isDisabled: boolean;
    categoryId: number;
    id: number;
    name: string;
    items: {
      title: any;
      isStock: any;
      id: number;
      name: string;
      isEnabled: boolean;
    }[];
    subCategories?: Array<{
      id: number;
      name: string;
      items: {
        title: any;
        isStock: any;
        id: number;
        name: string;
        isEnabled: boolean;
      }[];
    }>;
  }[];
  categories: Record<string, {
    isDisabled: boolean;
    categoryId: number;
    items: {
      id: number;
      title: string;
      isEnabled: boolean;
    }[];
    subCategories?: Array<{
      id: number;
      name: string;
      items: {
        id: number;
        title: string;
        isEnabled: boolean;
      }[];
    }>;
  }>;
  setCategories: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  categoryCount: number;
  localItems: any[];
  setLocalItems: React.Dispatch<React.SetStateAction<any[]>>;
  changeToggleEditor?: (toggle: boolean) => void;
}

const AvailableMenu: React.FC<AvailableMenuProps> = ({
  allCategories,
  changeToggleEditor,
  categories,
  setCategories,
  categoryCount,
  localItems,
  setLocalItems,
}) => {
  
  const [selectedCategory, setSelectedCategory] = useState<string>(
    allCategories[0]?.name || ""
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(
    allCategories[0]?.id
  );
  const [stockVisible, setStockVisible] = useState(false);

  const { setCategoryValue, setCategoryId } = useItemStore();

  const mergedItems = useMemo(() => {
    // Find category name that matches selectedCategoryId
    const selectedCategoryName = Object.keys(categories).find(
      (key) => categories[key].categoryId === selectedCategoryId
    );
  
    const categoryItems = categories[selectedCategoryName || ""]?.items || [];
  
    const localCategoryItems = localItems.filter(
      (item: any) => item.categoryId === selectedCategoryId
    );
  
    const merged = [
      ...categoryItems,
      ...localCategoryItems.filter(
        (localItem: any) =>
          !categoryItems.some((item: any) => item.id === localItem.id)
      ),
    ];
  
    return merged;
  }, [categories, localItems, selectedCategoryId]);

  

  useEffect(() => {
    setCategoryId(selectedCategoryId);
    setCategoryValue(selectedCategory);
  }, [selectedCategory]);


  const handleToggleEditor = changeToggleEditor || (() => {});

  return (
    <div key={categoryCount} className="p-4 flex gap-x-4 w-full">
      <AvailableCategories
        categories={categories}
        setCategories={setCategories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onCategoryIdChange={setSelectedCategoryId}
        changeToggleEditor={handleToggleEditor}
        setStockVisible={setStockVisible}
        stockVisible={stockVisible}
      />
      <AvailableItems
        items={mergedItems}
        changeToggleEditor={handleToggleEditor}
        localItems={localItems}
        setLocalItems={setLocalItems}
        stockVisible={stockVisible}
      />
    </div>
  );
};

export default AvailableMenu;
