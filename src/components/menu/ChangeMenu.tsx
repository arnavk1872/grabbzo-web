import React, { useRef } from "react";
import { Button } from "../UI/Button";
import AddItem from "./AddItem";
import AddCategory from "./AddCategory";
// import { addNewCategory } from "@/helpers/api-utils";

interface ChangeMenuProps {
  toggleEditor: boolean;
  allCategories?: any;
}

const ChangeMenu: React.FC<ChangeMenuProps> = ({ toggleEditor, allCategories }) => {
  const categoryNameRef = useRef<string>(""); 
  const itemDataRef = useRef<any>(null);

  const handleSaveChanges = async () => {
    if (toggleEditor) {
      const itemData = itemDataRef.current?.getItemData();
      console.log("Save changes for AddItem:", itemData);
      
      if (!itemData) {
        alert("Item data is incomplete.");
        return;
      }

      try {
        // API call for AddItem
        // await addNewCategory(itemData); 
        alert("Item added successfully!");
      } catch (error) {
        console.error("Error adding item:", error);
        alert("Failed to add item.");
      }
    } else {
      if (!categoryNameRef.current.trim()) {
        alert("Category name is required.");
        return;
      }

      try {
        // await addNewCategory(categoryNameRef.current);
        alert("Category added successfully!");
        categoryNameRef.current = "";
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
        className="bg-blue-600 hover:bg-blue-800  2xl:w-1/4 text-[17px]"
      >
        Save Changes
      </Button>
      <div className="bg-white h-[90vh] min-w-[300px] 2xl:w-[600px] rounded-[24px] my-4">
        {toggleEditor ? (
          <AddItem ref={itemDataRef} allCategories={allCategories} />
        ) : (
          <AddCategory categoryNameRef={categoryNameRef} />
        )}
      </div>
    </div>
  );
};

export default ChangeMenu;