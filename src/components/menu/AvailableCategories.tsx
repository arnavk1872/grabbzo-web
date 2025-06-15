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
} from "@/helpers/api-utils";
import { deleteCategory,editCategory } from "@/helpers/api-utils";
import { useSnackbar } from "notistack";
import { Input } from "../UI/Input";
import { addNewCategory, addNewSubcategory, deleteSubCategory, editSubCategory } from "@/helpers/menu-utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../UI/Accordion";
import { useItemStore } from "@/store/MenuStore";

interface Item {
  id: number;
  title: string;
  isEnabled: boolean;
}

interface CategoryData {
  isDisabled: boolean;
  categoryId: number;
  items: Item[];
  subCategories?: { id: number; name: string; items: Item[] }[];
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
  const [isDisabledMap, setIsDisabledMap] = useState<Record<string, boolean>>({});
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [updatedCategoryName, setUpdatedCategoryName] = useState<string>("");
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [newSubcategoryName, setNewSubcategoryName] = useState<string>("");
  const [isAddingSubcategory, setIsAddingSubcategory] = useState(false);
  const [selectedCategoryForSubcategory, setSelectedCategoryForSubcategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const pathname = usePathname();
  const isEditor = pathname.includes("editor");
  const { categoryId } = useItemStore();
  const [editingSubcategory, setEditingSubcategory] = useState<{category: string, name: string} | null>(null);
  const [updatedSubcategoryName, setUpdatedSubcategoryName] = useState<string>("");

  console.log(categories, "categoriesssss");
  

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

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      enqueueSnackbar("Category name is required", { variant: "error" });
      return;
    }

    setIsLoading(true);
    try {
      const newCategory = await addNewCategory(newCategoryName.trim());
      enqueueSnackbar("Category added successfully!", { variant: "success" });
      setNewCategoryName("");
      
      // Add the new category to the local state
      setCategories((prevCategories) => ({
        ...prevCategories,
        [newCategoryName.trim()]: {
          isDisabled: false,
          categoryId: newCategory?.id || Date.now(),
          items: []
        }
      }));
    } catch (error) {
      console.error("Error adding category:", error);
      enqueueSnackbar("Failed to add category. Please try again.", { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddSubcategory = async () => {
    console.log('Adding subcategory:', { name: newSubcategoryName, categoryId });
    
    if (!newSubcategoryName.trim()) {
      console.log('Validation failed: name is required');
      enqueueSnackbar("Subcategory name is required", { variant: "error" });
      return;
    }

    setIsAddingSubcategory(true);
    try {
      const response = await addNewSubcategory(newSubcategoryName.trim(), categoryId);
      console.log('New subcategory response:', response);
      
      if (!response?.id) {
        throw new Error('Failed to get subcategory ID from response');
      }
      
      enqueueSnackbar("Subcategory added successfully!", { variant: "success" });
      
      // Add the new subcategory to the local state
      setCategories((prevCategories) => {
        const updatedCategories = { ...prevCategories };
        if (!updatedCategories[selectedCategory].subCategories) {
          updatedCategories[selectedCategory].subCategories = [];
        }
        updatedCategories[selectedCategory].subCategories.push({
          id: response.id,
          name: newSubcategoryName.trim(),
          items: []
        });
        return updatedCategories;
      });

      // Reset states
      setNewSubcategoryName("");
      setSelectedCategoryForSubcategory(null);
    } catch (error) {
      console.error("Error adding subcategory:", error);
      enqueueSnackbar("Failed to add subcategory. Please try again.", { variant: "error" });
    } finally {
      setIsAddingSubcategory(false);
    }
  };

  const handleDeleteSubcategory = async (categoryName: string, subcategoryName: string, subcategoryId: number) => {
    try {
      await deleteSubCategory(subcategoryId);
      setCategories(prev => {
        const updated = { ...prev };
        if (Array.isArray(updated[categoryName].subCategories)) {
          updated[categoryName].subCategories = updated[categoryName].subCategories.filter(
            (sub: any) => sub.id !== subcategoryId
          );
        }
        return updated;
      });
      enqueueSnackbar("Subcategory has been deleted!", { variant: "error" });
    } catch (error) {
      enqueueSnackbar("Failed to delete subcategory", { variant: "error" });
    }
  };

  const handleEditSubcategory = (categoryName: string, subcategoryName: string) => {
    setEditingSubcategory({ category: categoryName, name: subcategoryName });
    setUpdatedSubcategoryName(subcategoryName);
  };

  const handleUpdateSubcategory = async (categoryName: string, oldSubcategoryName: string, subcategoryId: number) => {
    if (!updatedSubcategoryName.trim() || updatedSubcategoryName === oldSubcategoryName) {
      setEditingSubcategory(null);
      return;
    }

    try {
      const response = await editSubCategory(subcategoryId, updatedSubcategoryName);
      console.log('Edit subcategory response:', response);

      enqueueSnackbar("Subcategory updated successfully!", {
        variant: "success",
        className: "font-poppins",
      });

      setCategories((prevCategories) => {
        const updatedCategories = { ...prevCategories };
        if (updatedCategories[categoryName].subCategories) {
          const subcategoryData = updatedCategories[categoryName].subCategories.find(
            (sub: any) => sub.id === subcategoryId
          );
          if (subcategoryData) {
            subcategoryData.name = updatedSubcategoryName.trim();
          }
        }
        return updatedCategories;
      });

      setEditingSubcategory(null);
    } catch (error) {
      console.error("Failed to update subcategory:", error);
      enqueueSnackbar("Failed to update subcategory!", {
        variant: "error",
        className: "font-poppins",
      });
    }
  };

  console.log(categories, "categories");
  
console.log(selectedCategory, "selectedCategory");

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
          <div key={categoryName} className="mb-4">
            <div
              className={`px-6 py-4 rounded-full flex gap-x-4 cursor-pointer justify-between items-center font-poppins text-[16px] ${
                selectedCategory === categoryName && !isEditor
                  ? "bg-blue-500 text-white"
                  : selectedCategory === categoryName && isEditor
                  ? "bg-blue-100"
                  : "bg-white text-black"
              }`}
              onClick={(e) => {
                if (!(e.target as HTMLElement).closest('.subcategory-item')) {
                  onCategoryChange(categoryName);
                  onCategoryIdChange(categoryData.categoryId);
                }
              }}
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
            
            {/* Show Subcategories when category is selected */}
            {(selectedCategory === categoryName || selectedCategory?.startsWith(`${categoryName}/`)) && (
              <div className="px-6 py-2 mt-2">
                {/* Render subcategories above the Add Subcategories button */}
                {categories[categoryName]?.subCategories && (
                  <div className="space-y-2 mb-2">
                    {categories[categoryName].subCategories.map((subcategoryData) => (
                      <div
                        key={subcategoryData.id}
                        className={`ml-6 px-6 py-3 rounded-full flex gap-x-4 cursor-pointer justify-between items-center font-poppins text-[15px] ${
                          selectedCategory === `${categoryName}/${subcategoryData.name}` && !isEditor
                            ? "bg-blue-400 text-white"
                            : selectedCategory === `${categoryName}/${subcategoryData.name}` && isEditor
                            ? "bg-blue-100"
                            : "bg-gray-100 text-black"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onCategoryChange(`${categoryName}/${subcategoryData.name}`);
                          onCategoryIdChange(subcategoryData.id);
                        }}
                      >
                        {editingSubcategory?.category === categoryName && editingSubcategory?.name === subcategoryData.name ? (
                          <input
                            className="border rounded p-1 w-20 text-black"
                            value={updatedSubcategoryName}
                            onChange={(e) => setUpdatedSubcategoryName(e.target.value)}
                            onBlur={() => handleUpdateSubcategory(categoryName, subcategoryData.name, subcategoryData.id)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handleUpdateSubcategory(categoryName, subcategoryData.name, subcategoryData.id);
                              }
                            }}
                            autoFocus
                          />
                        ) : (
                          <span>{subcategoryData.name}</span>
                        )}
                        {isEditor && (
                          <div className="flex gap-x-2">
                            <button onClick={(e) => { e.stopPropagation(); handleEditSubcategory(categoryName, subcategoryData.name); }}>
                              <Pencil />
                            </button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <button onClick={(e) => e.stopPropagation()}>
                                  <Dustbin />
                                </button>
                              </AlertDialogTrigger>
                              <AlertDialogContent className="font-poppins">
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Confirmation</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete this subcategory?
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    className="text-white"
                                    onClick={() => handleDeleteSubcategory(categoryName, subcategoryData.name, subcategoryData.id)}
                                  >
                                    Continue
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                {/* Add Subcategories Button (unchanged) */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <div className="flex items-center gap-x-2 text-[14px] font-bold text-blue-700 cursor-pointer font-poppins">
                      <Plus /> Add Subcategories
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="font-poppins">
                    <AlertDialogHeader className="font-semibold">
                      Add New Subcategory
                    </AlertDialogHeader>
                    <Input 
                      className="my-2 shadow-none border border-gray-300 rounded p-2 w-full" 
                      placeholder="Add Subcategory Name"
                      value={newSubcategoryName}
                      onChange={(e) => setNewSubcategoryName(e.target.value)}
                    />
                    <AlertDialogFooter>
                      <AlertDialogCancel onClick={() => {
                        setNewSubcategoryName("");
                        setSelectedCategoryForSubcategory(null);
                      }}>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        className="text-white"
                        onClick={() => {
                          if (!newSubcategoryName.trim()) {
                            enqueueSnackbar("Subcategory name is required", { variant: "error" });
                            return;
                          }
                          setSelectedCategoryForSubcategory(categoryName);
                          setTimeout(() => handleAddSubcategory(), 0);
                        }}
                        disabled={isAddingSubcategory || !newSubcategoryName.trim()}
                      >
                        {isAddingSubcategory ? "Adding..." : "Continue"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
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
        
             
              <AlertDialogHeader className="font-semibold">
               Add New Category
              </AlertDialogHeader>
              <Input 
                className="my-2 shadow-none border border-gray-300 rounded p-2 w-full" 
                placeholder="Add Name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setNewCategoryName("")}>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  className="text-white"
                  onClick={handleAddCategory}
                  disabled={isLoading || !newCategoryName.trim()}
                >
                  {isLoading ? "Adding..." : "Continue"}
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
