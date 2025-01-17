import React, { useImperativeHandle, forwardRef, useState } from "react";
import { Input } from "../UI/Input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../UI/Dropdown";
import { Textarea } from "../UI/TextArea";
import DownwardArrow from "../Icons/DownwardArrow";

// Define the type for Dropdown props
interface DropdownProps {
  label: string;
  options: number[];
  selected: number | null;
  onSelect: (value: number) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, selected, onSelect }) => (
  <div className="border border-borderColor p-2 px-6 rounded-[16px] w-full">
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex justify-between items-center gap-x-4">
          {selected || label}
          <DownwardArrow />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {options.map((option) => (
          <DropdownMenuItem key={option} onClick={() => onSelect(option)}>
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);

interface AddItemProps {
  allCategories: { id: number; name: string }[];
  formData: any;
  onFormDataChange: (field: string, value: any) => void; // Prop to update form data
}
// Define the type for the AddItem component props
const AddItem = forwardRef(({ allCategories, formData, onFormDataChange }: AddItemProps, ref) => {
  useImperativeHandle(ref, () => ({
    getItemData: () => ({
      name: formData.selectedCategory,
      description: formData.description,
      isDisabled: false,
      items: [
        {
          title: formData.title,
          description: formData.description,
          price: parseFloat(formData.price),
          imageUrl: "https://example.com/image.jpg",
          isStock: true,
          isVeg: formData.foodType === "Veg",
        },
      ],
    }),
  }));

  return (
    <div className="font-poppins">
      <Input
        placeholder="Enter Item Name"
        className="m-6 w-11/12 h-[42px] rounded-[16px] shadow-none"
        value={formData.title}
        onChange={(e) => onFormDataChange("title", e.target.value)} // Use the callback here
      />

      <div className="mx-6 text-[17px]">Category</div>
      <div className="mx-6 my-1 w-1/3 whitespace-nowrap">
        <Dropdown
          label="Select Category"
          options={allCategories.map((category: { name: any; }) => category.name)}
          selected={formData.selectedCategory}
          onSelect={(value) => onFormDataChange("selectedCategory", value)} // Update category
        />
      </div>

      <div className="mx-6 mt-2 text-[17px]">Food Type</div>
      <div className="flex gap-x-6 px-4 py-1">
        {["Veg", "Non-Veg"].map((type) => (
          <div
            key={type}
            className={`border cursor-pointer flex justify-center border-borderColor py-2 px-6 rounded-[16px] min-w-32 hover:bg-${type === "Veg" ? "LightGreen" : "Red"}  
              ${formData.isVeg === type ? `bg-${type === "Veg" ? "LightGreen" : "Red"} text-white` : ""}`}
            onClick={() => onFormDataChange("isVeg", type)} // Update food type
          >
            {type}
          </div>
        ))}
      </div>

      <div className="mx-6 my-2">
        Pricing
        <Input
          placeholder="₹"
          className="h-[42px] rounded-[16px] shadow-none"
          value={formData.price}
          onChange={(e) => onFormDataChange("price", e.target.value)} // Update item price
        />
      </div>

      <div className="mx-6 my-4">
        Item Description
        <Textarea
          className="rounded-[16px] h-[106px] shadow-none"
          value={formData.description}
          onChange={(e) => onFormDataChange("description", e.target.value)} // Update item description
        />
      </div>

      <div className="flex items-center gap-x-8">
        <div className="w-1/3 mx-6">
          <div className=" my-2">Serving Info</div>
          <Dropdown
            label="Serves"
            options={[1, 2, 3, 4]}
            selected={formData.servingInfo}
            onSelect={(value) => onFormDataChange("servingInfo", value)} // Update servingInfo
          />
        </div>

        <div className="w-1/3 mx-6">
          <div className="my-2">Portion Size</div>
          <Dropdown
            label="ml"
            options={[150, 300, 500,1000]}
            selected={formData.portionSize}
            onSelect={(value) => onFormDataChange("portionSize", value)} // Update portion size
          />
        </div>
      </div>

      <div className="mx-6 my-2">
        Preparation Time (in min)
        <Input
          className="h-[42px] rounded-[16px] shadow-none"
          value={formData.preparationTime}
          onChange={(e) => onFormDataChange("preparationTime", e.target.value)} // Update preparation time
        />
      </div>
    </div>
  );
});

export default AddItem;