"use client";
import React, { useMemo, useState } from "react";
import AvailableCategories from "./AvailableCategories";
import AvailableItems from "./AvailableItems";

type Category = {
  id: number;
  name: string;
  items: { id: number; name: string; isEnabled: boolean }[];
};

type Item = {
  id: number;
  title: string; // Transformed from `name`
  isEnabled: boolean;
};

interface AvailableMenuProps {
  allCategories: {
    isDisabled: boolean;
    categoryId:number;
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
  changeToggleEditor?: (toggle: boolean) => void; // Adjusted type
}

const AvailableMenu: React.FC<AvailableMenuProps> = ({
  allCategories,
  changeToggleEditor,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    allCategories[0]?.name || ""
  );

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
  }, [JSON.stringify(allCategories)]); // Deep comparison using JSON.stringify

  // Trigger re-render when the number of categories changes
  const categoryCount = useMemo(() => Object.keys(categoryData).length, [categoryData]);
  const [categories, setCategories] = useState(categoryData);

  const handleToggleEditor = changeToggleEditor || (() => {});
  

  return (
    <div key={categoryCount} className="p-4 flex gap-x-4 w-full">
      <AvailableCategories
        categories={categories}
        setCategories={setCategories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        changeToggleEditor={handleToggleEditor}
      />
      <AvailableItems
        items={categoryData[selectedCategory]?.items || []} // Pass only the items array
        changeToggleEditor={handleToggleEditor}
      />
    </div>
  );
};

export default AvailableMenu;
