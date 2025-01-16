import React, { useState } from "react";
import { Input } from "../UI/Input";

interface AddCategoryProps {
  categoryName: string;
  setCategoryName: (name: string) => void;
}

const AddCategory: React.FC<AddCategoryProps> = ({ categoryName, setCategoryName }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value); // Update state on input change
  };

  return (
    <div className="m-6 font-poppins">
      <h2 className="text-[18px] font-semibold">Add Category</h2>
      <Input
        className="my-2 shadow-none border border-gray-300 rounded p-2 w-full"
        placeholder="Add Name"
        value={categoryName}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default AddCategory;
