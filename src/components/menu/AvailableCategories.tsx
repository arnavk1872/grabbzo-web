"use client";
import React, { useEffect, useState } from "react";
import { Switch } from "@/components/UI/Switch";
import Plus from "../Icons/Plus";
import { usePathname } from "next/navigation";
import Pencil from "../Icons/Pencil";
import Dustbin from "../Icons/Dustbin";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../AlertDialog";
import { changeCategoryStatus, deleteCategory } from "@/helpers/api-utils";

interface Item {
  id: number;
  title: string;
  isEnabled: boolean;
}

interface CategoryData {
  isDisabled: boolean;
  categoryId: number;
  items: Item[];
}

interface CategorySelectorProps {
  categories: Record<string, CategoryData>;
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
  const [isDisabledMap, setIsDisabledMap] = useState<Record<string, boolean>>({});

  // Initialize `isDisabledMap` only once when `categories` changes
  useEffect(() => {
    if (Object.keys(isDisabledMap).length === 0) {
      const initialDisabledMap = Object.entries(categories).reduce(
        (acc, [categoryName, categoryData]) => ({
          ...acc,
          [categoryName]: categoryData.isDisabled,
        }),
        {}
      );
      setIsDisabledMap(initialDisabledMap);
    }
  }, [categories, isDisabledMap]);

  const handleCategoryClick = (category: string) => {
    const newActiveCategory = activeCategory === category ? null : category;
    setActiveCategory(newActiveCategory);
    onCategoryChange(category);
  };

  const toggleCategoryStatus = async (status: boolean, categoryId: number, categoryName: string) => {
    try {
      await changeCategoryStatus(!status, categoryId);
      setIsDisabledMap((prev) => ({
        ...prev,
        [categoryName]: !status,
      }));
    } catch (error) {
      console.error("Failed to update category status:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between w-full font-semibold text-[18px] font-poppins px-6 my-4">
        CATEGORY
      </div>
      {Object.entries(categories).map(([categoryName, categoryData]) => (
        <div
          key={categoryName}
          onClick={() => handleCategoryClick(categoryName)}
          className={`px-6 py-4 my-4 rounded-full flex gap-x-4 cursor-pointer justify-between items-center font-poppins text-[16px] whitespace-nowrap 2xl:w-[400px] ${
            selectedCategory === categoryName && !isEditor
              ? "bg-blue-500 text-white"
              : "bg-white text-black"
          }`}
        >
          {categoryName}
          {!isEditor && (
            <Switch
              checked={!isDisabledMap[categoryName]}
              onCheckedChange={() =>
                toggleCategoryStatus(isDisabledMap[categoryName], categoryData.categoryId, categoryName)
              }
            />
          )}
          {isEditor && (
            <div className="flex gap-x-2 justify-center items-center">
              <AlertDialog>
                <AlertDialogTrigger>
                  <Dustbin />
                </AlertDialogTrigger>
                <AlertDialogContent className="font-poppins">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirmation</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to permanently delete this category?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="text-white" onClick={async ()=>{await deleteCategory(categoryData.categoryId)}}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Pencil />
            </div>
          )}
        </div>
      ))}
      {isEditor && (
        <div
          onClick={() => changeToggleEditor(false)}
          className="flex items-center w-fit cursor-pointer gap-x-1 text-[14px] font-poppins font-bold text-blue-700"
        >
          <Plus /> Add Category
        </div>
      )}
    </div>
  );
};

export default AvailableCategories;
