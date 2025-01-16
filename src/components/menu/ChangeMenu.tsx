import React, { useRef } from "react";
import { Button } from "../UI/Button";
import AddItem from "./AddItem";
import AddCategory from "./AddCategory";
import { addNewCategory, addNewItem } from "@/helpers/api-utils";

interface ChangeMenuProps {
  toggleEditor: boolean;
  allCategories?: any;
}

const ChangeMenu: React.FC<ChangeMenuProps> = ({ toggleEditor, allCategories }) => {
  const [categoryName, setCategoryName] = React.useState<string>("");
  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    price: "",
    selectedCategory: null,
    isVeg:true,
    servingInfo: null,
    portionSize: null,
    isStock:true
  });

  const itemDataRef = useRef<any>(null);

  const handleFormDataChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveChanges = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (toggleEditor) {
      const itemData = itemDataRef.current?.getItemData();
      console.log("Save changes for AddItem:", itemData);

      if (!itemData) {
        alert("Item data is incomplete.");
        return;
      }

      try {
        await addNewItem(formData); // Use the updated formData
        alert("Item added successfully!");
      } catch (error) {
        console.error("Error adding item:", error);
        alert("Failed to add item.");
      }
    } else {
      if (!categoryName.trim()) {
        alert("Category name is required.");
        return;
      }

      try {
        await addNewCategory(categoryName); // Ensure this function works correctly
        alert("Category added successfully!");
        setCategoryName(""); // Clear input
      } catch (error) {
        console.error("Error adding category:", error);
        alert("Failed to add category.");
      }
    }
  };

  return (
    <div className="flex flex-col items-end px-12">
      <Button
        onClick={handleSaveChanges}
        className="bg-blue-600 hover:bg-blue-800 text-white 2xl:w-1/4 text-[16px]"
      >
        Save Changes
      </Button>
      <div className="bg-white h-[90vh] min-w-[300px] 2xl:w-[600px] rounded-[24px] my-4">
        {toggleEditor ? (
          <AddItem
            ref={itemDataRef}
            allCategories={allCategories}
            formData={formData} // Pass formData
            onFormDataChange={handleFormDataChange} // Pass callback to handle updates
          />
        ) : (
          <AddCategory categoryName={categoryName} setCategoryName={setCategoryName} />
        )}
      </div>
    </div>
  );
};

export default ChangeMenu;
