"use client";
import React, { useState } from "react";
import { Switch } from "@/components/UI/Switch";
import Plus from "../Icons/Plus";
import { usePathname } from "next/navigation";
import Pencil from "../Icons/Pencil";

interface CategorySelectorProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  changeToggleEditor: (toggle: boolean) => void;
}

const AvailableCategories: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  changeToggleEditor,
}) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const pathname = usePathname();
  const isEditor = pathname.includes("editor");

  const handleCategoryClick = (category: string) => {
    const newActiveCategory = activeCategory === category ? null : category;
    setActiveCategory(newActiveCategory);
    onCategoryChange(category);
  };

  return (
    <div>
      <div className="flex justify-between w-full font-semibold text-[18px] font-poppins px-6 my-4">
        CATEGORY
      </div>
      {categories.map((category) => (
        <div
          key={category}
          onClick={() => handleCategoryClick(category)}
          className={`px-4 py-4 my-4 rounded-full flex gap-x-4 cursor-pointer justify-between items-center font-poppins text-[16px] whitespace-nowrap xl:w-[400px] ${
            selectedCategory === category
              ? "bg-blue-500 text-white"
              : "bg-white text-black"
          }`}
        >
          {category}
          {!isEditor &&  <Switch
            checked={activeCategory === category}
            onCheckedChange={() => handleCategoryClick(category)}
          /> }
          {isEditor && <Pencil/>}
        </div>
      ))}
      {isEditor && (
        <div onClick={() => changeToggleEditor(false)} className="flex items-center w-fit cursor-pointer gap-x-1 text-[14px] font-poppins font-bold text-blue-700">
          <Plus /> Add Category
        </div>
      )}
    </div>
  );
};

export default AvailableCategories;
