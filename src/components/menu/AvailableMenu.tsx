"use client";
import React, { useEffect, useMemo, useState } from "react";
import AvailableCategories from "./AvailableCategories";
import AvailableItems from "./AvailableItems";
import { useItemStore } from "@/store/MenuStore";

type Item = {
  id: number;
  title: string;
  isEnabled: boolean;
};

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
  }[];
  categories: any;
  setCategories: any;
  categoryCount: any;
  localItems: any;
  setLocalItems: any;
  changeToggleEditor?: (toggle: boolean) => void; // Adjusted type
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
  const { setCategoryValue, setCategoryId } = useItemStore();

  useEffect(() => {
    setCategoryId(selectedCategoryId);
    setCategoryValue(selectedCategory);
  }, [selectedCategory]);

  const categoryData = useMemo(() => {
    return allCategories.reduce<
      Record<string, { isDisabled: boolean; categoryId: number; items: Item[] }>
    >((acc, category) => {
      acc[category.name] = {
        isDisabled: category.isDisabled,
        categoryId: category.id,
        items: category.items.map((item) => ({
          id: item.id,
          title: item.title, // Map `name` to `title`
          isEnabled: item.isStock,
        })),
      };
      return acc;
    }, {});
  }, [JSON.stringify(allCategories)]);
  const [stockVisible, setStockVisible] = useState(false);
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
        items={categoryData[selectedCategory]?.items || []}
        changeToggleEditor={handleToggleEditor}
        localItems={localItems}
        setLocalItems={setLocalItems}
        stockVisible={stockVisible}
      />
    </div>
  );
};

export default AvailableMenu;
