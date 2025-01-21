import React, { useState } from "react";
import { Input } from "../UI/Input";
import { z } from "zod";

interface AddCategoryProps {
  categoryName: string;
  setCategoryName: (name: string) => void;
}

const AddCategory: React.FC<AddCategoryProps> = ({ categoryName, setCategoryName }) => {
  const [error, setError] = useState<string | null>(null);

  const categoryNameSchema = z.string().min(1, "Category name is required");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCategoryName(value);

    const validationResult = categoryNameSchema.safeParse(value);
    if (!validationResult.success) {
      setError(validationResult.error.errors[0].message); 
    } else {
      setError(null); 
    }
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
      {error && <div className="text-red-500 text-[14px] mt-1">{error}</div>}
    </div>
  );
};

export default AddCategory;
