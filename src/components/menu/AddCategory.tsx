import React from 'react';
import { Input } from '../UI/Input';

interface AddCategoryProps {
  categoryNameRef: React.MutableRefObject<string>;
}

const AddCategory: React.FC<AddCategoryProps> = ({ categoryNameRef }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    categoryNameRef.current = e.target.value; // Update the ref value on input change
  };

  return (
    <div className="m-6 font-poppins">
      <h2 className="text-[18px] font-semibold">Add Category</h2>
      <Input
        className="my-2 shadow-none border border-gray-300 rounded p-2 w-full"
        placeholder="Add Name"
        onChange={handleInputChange}
      />
    </div>
  );
};

export default AddCategory;
