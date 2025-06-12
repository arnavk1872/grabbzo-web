import React, { useRef } from "react";
import { Button } from "../UI/Button";
import AddItem from "./AddItem";
import {
  addNewCategory,
  updateItemDetails,
} from "@/helpers/api-utils";
import { addNewItem } from "@/helpers/menu-utils";
import { useSnackbar } from "notistack";
import { useItemStore } from "@/store/MenuStore";
import MenuItemForm from "./MenuItemForm";

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
  const { enqueueSnackbar } = useSnackbar();

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
        return;
      }
      try {
        if (savedItem && Object.keys(savedItem).length > 1) {
          const response = await updateItemDetails(
            selectedItem.id,
            categoryId,
            savedItem
          );
          enqueueSnackbar("Item updated successfully !", {
            variant: "success",
            className: "font-poppins",
          });
          setLocalItems((prevItems: any[]) =>
            prevItems.map((item) =>
              item.id === selectedItem.id ? { ...item, ...selectedItem } : item
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
            const existingItems = prevCategories[categoryValue]?.items || [];
          
            return {
              ...prevCategories,
              [categoryValue]: {
                isDisabled: false,
                categoryId: categoryId,
                items: [
                  ...existingItems,
                  {
                    isEnabled: true,
                    id: response.id,
                    title: response.title,
                  },
                ],
              },
            };
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
      <Button
        onClick={handleSaveChanges}
        className="bg-blue-600 hover:bg-blue-800 text-white 2xl:w-1/4 mr-6 text-[16px]"
      >
        Save Changes
      </Button>
      <div className="bg-white h-fit min-h-[800px] pb-6 min-w-[375px] 2xl:w-[600px] rounded-[24px] my-4 mr-4">
     
             {/* ref={itemDataRef}
             categories={categories}
          formData={formData}
             onFormDataChange={handleFormDataChange} */}
        
          <MenuItemForm ref={itemDataRef}
             categories={categories}
          formData={formData}
             onFormDataChange={handleFormDataChange} />
        
      </div>
    </div>
  );
};

export default ChangeMenu;
