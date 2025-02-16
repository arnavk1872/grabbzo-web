import React, { useRef } from "react";
import { Button } from "../UI/Button";
import AddItem from "./AddItem";
import AddCategory from "./AddCategory";
import { addNewCategory, addNewItem, updateItemDetails } from "@/helpers/api-utils";
import { useSnackbar } from "notistack";
import { useItemStore } from "@/store/MenuStore";

interface ChangeMenuProps {
  toggleEditor: boolean;
  allCategories?: any;
  categories:any
  setCategories:any
  localItems:any
  setLocalItems:any
}

const ChangeMenu: React.FC<ChangeMenuProps> = ({
  toggleEditor,
  allCategories,
  categories,
  setCategories,
  localItems,
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
  
  const { selectedItem, categoryValue ,categoryId } = useItemStore();

  const savedItem = selectedItem ? JSON.stringify([
    {
      ...selectedItem,
      selectedCategory: categoryValue
    }
  ]) : "";

  const handleSaveChanges = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (toggleEditor) {
      const itemData = itemDataRef.current?.getItemData();

      if (!itemData) {
        console.error("Item data is incomplete.");
        return;
      }
      try {
        if(savedItem  && Object.keys(savedItem).length > 1){
          await updateItemDetails(categoryId,savedItem);
          enqueueSnackbar("Item updated successfully !", {
            variant: "success",
            className: "font-poppins",
          });
        }else{
          const response = await addNewItem(formData);
          console.log(response,"HAHAHAHAHA")
          enqueueSnackbar("Item added successfully !", {
            variant: "success",
            className: "font-poppins",
          });
          setLocalItems((prevItems: any[]) => [
            ...prevItems,  // Keep existing items
            {
              isDisabled: false,
              categoryId: response.id,
              title:response.title
            }
          ]);
          
          
        }
       
      } catch (error) {
        console.error("Error adding item:", error);
      }
    } else {
      if (!categoryName.trim()) {
        return;
      }

      try {
        const response = await addNewCategory(categoryName);

        setCategories((prevCategories: any) => ({
          ...prevCategories,  // Keep existing categories
          [categoryName]: {   // Add new category with dynamic key
            isDisabled: false,
            categoryId: response.id,
            items: [],
          },
        }));
        
        
        enqueueSnackbar("Category added successfully !", {
          variant: "success",
          className: "font-poppins",
        });
        setCategoryName(""); 
      } catch (error) {
        console.error("Error adding category:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-end pr-12">
      <Button
        onClick={handleSaveChanges}
        className="bg-blue-600 hover:bg-blue-800 text-white 2xl:w-1/4 text-[16px]"
      >
        Save Changes
      </Button>
      <div className="bg-white h-fit min-h-[800px] pb-6 min-w-[385px] 2xl:w-[600px] rounded-[24px] my-4">
        {toggleEditor ? (
          <AddItem
            ref={itemDataRef}
            allCategories={allCategories}
            formData={formData}
            onFormDataChange={handleFormDataChange}
          />
        ) : (
          <AddCategory
            categoryName={categoryName}
            setCategoryName={setCategoryName}
          />
        )}
      </div>
    </div>
  );
};

export default ChangeMenu;
