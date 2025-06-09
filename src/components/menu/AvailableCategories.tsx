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
import {
  changeCategoryStatus,
  deleteCategory,
  editCategory,
} from "@/helpers/api-utils";
import { useSnackbar } from "notistack";
import { Button } from "../UI/Button";
import AddCategory from "./AddCategory";
import Cross from "../Icons/Cross";

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
  setCategories: React.Dispatch<
    React.SetStateAction<Record<string, CategoryData>>
  >;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  changeToggleEditor: (toggle: boolean) => void;
  onCategoryIdChange: (category: number) => void;
  setStockVisible: (toggle: boolean) => void;
  stockVisible: any;
}

const AvailableCategories: React.FC<CategorySelectorProps> = ({
  categories,
  setCategories,
  selectedCategory,
  onCategoryChange,
  changeToggleEditor,
  onCategoryIdChange,
  setStockVisible,
  stockVisible,
}) => {
  const [isDisabledMap, setIsDisabledMap] = useState<Record<string, boolean>>(
    {}
  );
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [updatedCategoryName, setUpdatedCategoryName] = useState<string>("");
  const { enqueueSnackbar } = useSnackbar();
  const pathname = usePathname();
  const isEditor = pathname.includes("editor");

  useEffect(() => {
    if (selectedCategory && categories[selectedCategory]) {
      setStockVisible(!categories[selectedCategory].isDisabled);
    }
  }, [selectedCategory]);

  useEffect(() => {
    const initialDisabledMap = Object.entries(categories).reduce(
      (acc, [categoryName, categoryData]) => ({
        ...acc,
        [categoryName]: categoryData.isDisabled,
      }),
      {}
    );
    // stockVisible(!isDisabledMap[categoryName]);
    setIsDisabledMap(initialDisabledMap);
  }, [categories]);

  const toggleCategoryStatus = async (
    status: boolean,
    categoryId: number,
    categoryName: string
  ) => {
    try {
      await changeCategoryStatus(!status, categoryId);
      setStockVisible(!stockVisible);
      enqueueSnackbar(`Category ${status ? "Enabled" : "Disabled"}!`, {
        variant: status ? "success" : "warning",
        className: "font-poppins",
      });
      setCategories((prevCategories) => ({
        ...prevCategories,
        [categoryName]: {
          ...prevCategories[categoryName],
          isDisabled: !status, // Update isDisabled in state
        },
      }));
      setIsDisabledMap((prev) => ({ ...prev, [categoryName]: !status }));
    } catch (error) {
      console.error("Failed to update category status:", error);
    }
  };

  const handleDeleteCategory = async (
    categoryName: string,
    categoryId: number
  ) => {
    try {
      await deleteCategory(categoryId);
      enqueueSnackbar("Category has been deleted!", {
        variant: "error",
        className: "font-poppins",
      });

      setCategories((prevCategories) => {
        const updatedCategories = { ...prevCategories };
        delete updatedCategories[categoryName];
        return updatedCategories;
      });
    } catch (error) {
      console.error("Failed to delete category:", error);
      enqueueSnackbar("Failed to delete category!", {
        variant: "error",
        className: "font-poppins",
      });
    }
  };

  const handleEditCategory = (categoryName: string) => {
    setEditingCategory(categoryName);
    setUpdatedCategoryName(categoryName);
  };

  const handleUpdateCategory = async (
    categoryId: number,
    oldCategoryName: string
  ) => {
    if (
      !updatedCategoryName.trim() ||
      updatedCategoryName === oldCategoryName
    ) {
      setEditingCategory(null);
      return;
    }

    try {
      await editCategory(categoryId, updatedCategoryName);

      enqueueSnackbar("Category updated successfully!", {
        variant: "success",
        className: "font-poppins",
      });

      setCategories((prevCategories) => {
        const updatedCategories = { ...prevCategories };
        updatedCategories[updatedCategoryName] = {
          ...updatedCategories[oldCategoryName],
        };
        delete updatedCategories[oldCategoryName];
        return updatedCategories;
      });

      setEditingCategory(null);
    } catch (error) {
      console.error("Failed to update category:", error);
      enqueueSnackbar("Failed to update category!", {
        variant: "error",
        className: "font-poppins",
      });
    }
  };

  return (
    <div>
      <div className="flex justify-between w-full font-semibold text-[18px] font-poppins px-6 my-4">
        CATEGORY | {Object.keys(categories).length}
      </div>
      <div className="overflow-y-auto min-w-[250px] max-h-[450px]">
        {Object.keys(categories).length === 0 && (
          <div className="font-poppins">No Categories added yet!</div>
        )}

        {Object.entries(categories).map(([categoryName, categoryData]) => (
          <div
            key={categoryName}
            onClick={() => {
              onCategoryChange(categoryName);
              onCategoryIdChange(categoryData.categoryId);
            }}
            className={`px-6 py-4 my-4 rounded-full flex gap-x-4 cursor-pointer justify-between items-center font-poppins text-[16px] ${
              selectedCategory === categoryName && !isEditor
                ? "bg-blue-500 text-white"
                : selectedCategory === categoryName && isEditor
                ? "bg-blue-100"
                : "bg-white text-black"
            }`}
          >
            {editingCategory === categoryName ? (
              <input
                className="border rounded p-1 w-20 text-black"
                value={updatedCategoryName}
                onChange={(e) => setUpdatedCategoryName(e.target.value)}
                onBlur={() =>
                  handleUpdateCategory(categoryData.categoryId, categoryName)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleUpdateCategory(categoryData.categoryId, categoryName);
                  }
                }}
                autoFocus
              />
            ) : (
              <span>{categoryName}</span>
            )}

            {!isEditor && (
              <Switch
                checked={!isDisabledMap[categoryName]}
                onCheckedChange={() =>
                  toggleCategoryStatus(
                    isDisabledMap[categoryName],
                    categoryData.categoryId,
                    categoryName
                  )
                }
              />
            )}

            {isEditor && (
              <div className="flex gap-x-2">
                <AlertDialog>
                  <AlertDialogTrigger>
                    <Dustbin />
                  </AlertDialogTrigger>
                  <AlertDialogContent className="font-poppins">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirmation</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this category?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="text-white"
                        onClick={() =>
                          handleDeleteCategory(
                            categoryName,
                            categoryData.categoryId
                          )
                        }
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <button onClick={() => handleEditCategory(categoryName)}>
                  <Pencil />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      {isEditor && (
        <div
          // onClick={() => changeToggleEditor(false)}
          className="flex items-center font-poppins cursor-pointer gap-x-1 text-[14px] font-bold text-blue-700"
        >
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
            <div className="flex"><Plus /> Add Category</div>
            </AlertDialogTrigger>
           
            <AlertDialogContent className="font-poppins">
        
              <AddCategory/>
              <AlertDialogHeader>
               
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="text-white">
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </div>
  );
};

export default AvailableCategories;
