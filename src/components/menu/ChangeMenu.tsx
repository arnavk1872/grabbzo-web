import React, { useEffect, useRef } from "react";
import { Button } from "../UI/Button";
import { updateItemDetails } from "@/helpers/menu-utils";
import { addNewItem, getItemDetails } from "@/helpers/menu-utils";
import { useSnackbar } from "notistack";
import { useItemStore } from "@/store/MenuStore";
import MenuItemForm from "./MenuItemForm";
import MenuHelpTooltip from "./MenuHelpTooltip";

interface ChangeMenuProps {
  toggleEditor: boolean;
  allCategories?: any;
  categories: any;
  setCategories: any;
  localItems: any;
  setLocalItems: any;
}

const ChangeMenu: React.FC<ChangeMenuProps> = ({
  toggleEditor,
  allCategories,
  categories,
  setCategories,
  setLocalItems,
}) => {
  const [categoryName, setCategoryName] = React.useState<string>("");
  const [itemDetails, setItemDetails] = React.useState<any>(null);

  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    price: "",
    selectedCategory: null,
    isVeg: true,
    servingInfo: null,
    portionSize: null,
    isStock: true,
    categoryId:'',
    restaurantCategory: {
      id: null,
    },
  });

  const itemDataRef = useRef<any>(null);
  const { itemId } = useItemStore();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const getItemDetail = async () => {
      if (itemId) {
        try {
          const itemDetailsResponse = await getItemDetails(itemId);
  
          if (itemDetailsResponse) {
            setItemDetails(itemDetailsResponse);
            
            // Populate form data with the fetched item details
            setFormData(prev => ({
              ...prev,
              title: itemDetailsResponse.title || "",
              description: itemDetailsResponse.description || "",
              price: itemDetailsResponse.price?.toString() || "",
              isVeg: itemDetailsResponse.isVeg ?? true,
              servingInfo: itemDetailsResponse.servingInfo || null,
              portionSize: itemDetailsResponse.portionSize || null,
              isStock: itemDetailsResponse.isStock ?? true,
              categoryId: itemDetailsResponse.categoryId || "",
            }));
          }
        } catch (error) {
          console.error("Error fetching item details:", error);
        }
      }
    };
    getItemDetail();
  }, [itemId]);

  const handleFormDataChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const { selectedItem, categoryValue, categoryId, setItemId } = useItemStore();

  const savedItem = selectedItem
    ? JSON.stringify({
        ...selectedItem,
        selectedCategory: categoryValue,
      })
    : "";


  const handleSaveChanges = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const validationErrors = itemDataRef.current?.getItemData();

    if (validationErrors && Object.keys(validationErrors).length > 0) {
      console.log("Validation failed, not saving item", validationErrors);
      return;
    }

    try {
      if (itemId) {
        const response = await updateItemDetails(
          itemId,
          formData
        );
        enqueueSnackbar("Item updated successfully !", {
          variant: "success",
          className: "font-poppins",
        });
        setLocalItems((prevItems: any[]) =>
          prevItems.map((item) =>
            item.id === itemId ? { ...item, ...formData } : item
          )
        );
      } else {
        const response = await addNewItem(formData);
        setItemId(response.id);
        enqueueSnackbar("Item added successfully !", {
          variant: "success",
          className: "font-poppins",
        });
        setLocalItems((prevItems: any[]) => [
          ...prevItems, // Keep existing items
          {
            isEnabled: true,
            id: response.id,
            title: response.title,
          },
        ]);
        setCategories((prevCategories: any) => {
          const updatedCategories = { ...prevCategories };
          
          // If the item is being added to a subcategory
          if (categoryValue.includes('/')) {
            const [mainCategory, subCategoryName] = categoryValue.split('/');
            const category = updatedCategories[mainCategory];
            
            if (category?.subCategories) {
              const subCategoryIndex = category.subCategories.findIndex(
                (sub: any) => sub.name === subCategoryName
              );

              if (subCategoryIndex !== -1) {
                const updatedSubCategories = [...category.subCategories];
                updatedSubCategories[subCategoryIndex] = {
                  ...updatedSubCategories[subCategoryIndex],
                  items: [
                    ...(updatedSubCategories[subCategoryIndex].items || []),
                    {
                      isEnabled: true,
                      id: response.id,
                      title: response.title,
                    },
                  ],
                };

                return {
                  ...updatedCategories,
                  [mainCategory]: {
                    ...category,
                    subCategories: updatedSubCategories,
                  },
                };
              }
            }
          }

          // If the item is being added to a main category
          const category = updatedCategories[categoryValue];
          if (category) {
            return {
              ...updatedCategories,
              [categoryValue]: {
                ...category,
                isDisabled: false,
                categoryId: categoryId,
                items: [
                  ...(category.items || []),
                  {
                    isEnabled: true,
                    id: response.id,
                    title: response.title,
                  },
                ],
              },
            };
          }
          
          return updatedCategories;
        });
        setFormData({
          title: '',
          description: '',
          price: '',
          selectedCategory: null,
          isVeg: true,
          servingInfo: null,
          portionSize: null,
          isStock: false,
          categoryId:'',
          restaurantCategory: {
            id: null,
          },
        });
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <div className="flex flex-col items-end pr-6">
      <div className="flex items-center gap-2 mr-6">
        <MenuHelpTooltip />
      <Button
        onClick={handleSaveChanges}
          className="bg-blue-600 hover:bg-blue-800 text-white 2xl:w-1/4 text-[16px]"
      >
        Save Changes
      </Button>
      </div>
      <div className="bg-white h-fit min-h-[800px] pb-6  rounded-[24px] my-4 mr-4">
          <MenuItemForm ref={itemDataRef}
             categories={categories}
          formData={formData}
             onFormDataChange={handleFormDataChange} />
      </div>
    </div>
  );
};

export default ChangeMenu;
