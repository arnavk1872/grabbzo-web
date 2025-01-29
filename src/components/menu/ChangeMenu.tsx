import React, { useRef } from "react";
import { Button } from "../UI/Button";
import AddItem from "./AddItem";
import AddCategory from "./AddCategory";
import { addNewCategory, addNewItem } from "@/helpers/api-utils";
import { useSnackbar } from "notistack";

interface ChangeMenuProps {
  toggleEditor: boolean;
  allCategories?: any;
}

const ChangeMenu: React.FC<ChangeMenuProps> = ({
  toggleEditor,
  allCategories,
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
  

  const handleSaveChanges = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (toggleEditor) {
      const itemData = itemDataRef.current?.getItemData();

      if (!itemData) {
        console.error("Item data is incomplete.");
        return;
      }

      try {
        await addNewItem(formData);
        enqueueSnackbar("Item added successfully !", {
          variant: "success",
          className: "font-poppins",
        });
      } catch (error) {
        console.error("Error adding item:", error);
      }
    } else {
      if (!categoryName.trim()) {
        return;
      }

      try {
        await addNewCategory(categoryName);
        enqueueSnackbar("Category added successfully !", {
          variant: "success",
          className: "font-poppins",
        });
        setCategoryName(""); // Clear input
      } catch (error) {
        console.error("Error adding category:", error);
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
