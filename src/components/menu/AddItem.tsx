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

type AddItemProps = {
  allCategories: { id: number; name: string }[];
};

const AddItem = forwardRef(({ allCategories }: AddItemProps, ref) => {
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [foodType, setFoodType] = useState("Veg"); // Default to Veg

  useImperativeHandle(ref, () => ({
    getItemData: () => ({
      name: selectedCategory, // Category name from dropdown
      description: itemDescription,
      isDisabled: false,
      items: [
        {
          title: itemName, // Title from item name input
          description: itemDescription,
          price: parseFloat(itemPrice),
          imageUrl: "https://example.com/image.jpg", // Placeholder
          isStock: true,
          isVeg: foodType === "Veg",
        },
      ],
    }),
  }));

  return (
    <div className="font-poppins">
      <Input
        placeholder="Enter Item Name"
        className="m-6 w-11/12 h-[42px] rounded-[16px] shadow-none"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />

      <div className="mx-6 text-[17px]">Category</div>
      <div className="mx-6 my-1 border border-borderColor p-2 w-[30%] rounded-[16px]">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex whitespace-nowrap justify-between items-center gap-x-4">
              {selectedCategory || "Select Category"}
              <DownwardArrow />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {allCategories.map((category) => (
              <DropdownMenuItem
                key={category.id}
                onClick={() => setSelectedCategory(category.name)} // Set selected category
              >
                {category.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mx-6 mt-2 text-[17px]">Food Type</div>
      <div className="flex gap-x-6 px-4 py-1">
        <div
          className={`border hover:bg-LightGreen  cursor-pointer flex justify-center border-borderColor py-2 px-6 rounded-[16px] min-w-32 ${
            foodType === "Veg" ? "bg-LightGreen text-white" : ""
          }`}
          onClick={() => setFoodType("Veg")}
        >
          Veg
        </div>
        <div
          className={`border hover:bg-Red cursor-pointer border-borderColor py-2 px-6 rounded-[16px] min-w-32 ${
            foodType === "Non-Veg" ? "bg-Red text-white" : ""
          }`}
          onClick={() => setFoodType("Non-Veg")}
        >
          Non-Veg
        </div>
      </div>

      <div className="mx-6 my-2">
        Pricing
        <Input
          placeholder="₹"
          className="h-[42px] rounded-[16px] shadow-none"
          value={itemPrice}
          onChange={(e) => setItemPrice(e.target.value)}
        />
      </div>

      <div className="mx-6 my-2">Images</div>

      <div className="mx-6 my-4">
        Item Description
        <Textarea
          className="rounded-[16px] h-[106px] shadow-none"
          value={itemDescription}
          onChange={(e) => setItemDescription(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-x-8">
        <div className="w-1/3">
          <div className="mx-6 my-2">Serving Info</div>
          <div className="mx-6 my-1 border border-borderColor p-2 px-6 rounded-[16px] w-full">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex whitespace-nowrap justify-between items-center gap-x-4">
                  Serves
                  <DownwardArrow />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {[1, 2, 3, 4].map((option) => (
                  <DropdownMenuItem key={option}>{option}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="w-1/3">
          <div className="mx-6 my-2">Portion Size</div>
          <div className="mx-6 border border-borderColor p-2 px-6 rounded-[16px] w-full">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex whitespace-nowrap justify-end items-center gap-x-4">
                  ml
                  <DownwardArrow />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>1</DropdownMenuItem>
                <DropdownMenuItem>2</DropdownMenuItem>
                <DropdownMenuItem>3</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="mx-6 my-2">
        Prepration Time
        <Input className="h-[42px] rounded-[16px] shadow-none" />
      </div>
    </div>
  );
});

export default AddItem;
