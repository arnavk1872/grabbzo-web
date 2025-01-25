import React, { useImperativeHandle, forwardRef, useState } from "react";
import { Input } from "../UI/Input";
import Dropdown from "./DropDown";
import { Textarea } from "../UI/TextArea";
import { formSchema } from "./formSchema";

interface AddItemProps {
  allCategories: { id: number; name: string }[];
  formData: any;
  onFormDataChange: (field: string, value: any) => void;
}

const AddItem = forwardRef(
  ({ allCategories, formData, onFormDataChange }: AddItemProps, ref) => {
    const [errors, setErrors] = useState<Record<string, string>>({});

    useImperativeHandle(ref, () => ({
      getItemData: () => {
        const validationResult = formSchema.safeParse(formData);
        if (!validationResult.success) {
          const validationErrors: Record<string, string> = {};
          validationResult.error.errors.forEach((err) => {
            const path = err.path.join(".");

            validationErrors[path] = err.message;
          });
          setErrors(validationErrors);
          throw new Error("Validation failed");
        }

        return {
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
              isVeg: formData.foodType === true,
            },
          ],
          restaurantCategory: {
            id: formData.restaurantCategory.id,
          },
        };
      },
    }));

    return (
      <div className="font-poppins">
        <div className="m-6">
          <div className="text-red-500 text-[14px]">{errors.title}</div>
          <Input
            placeholder="Enter Item Name"
            className="w-11/12 h-[42px] rounded-[16px] shadow-none"
            value={formData.title}
            onChange={(e) => {
              onFormDataChange("title", e.target.value);
              setErrors((prev) => ({ ...prev, title: "" }));
            }}
          />
        </div>

        <div className="mx-6 text-[17px]">Category</div>
        {/* <div className="mb-2 mx-6 text-red-500 text-[14px]">{errors.name}</div> */}
        <div className="w-1/3 whitespace-nowrap mx-6">
        <Dropdown
          label="Select Category"
          options={allCategories}
          selected={
            formData.restaurantCategory?.id
              ? allCategories.find(
                  (category) => category.id === formData.restaurantCategory?.id
                )?.name || ""
              : "Select Category"
          }
          onSelect={(selectedId) => {
            const selectedCategory = allCategories.find(
              (category) => category.id === selectedId
            );
            if (selectedCategory) {
              onFormDataChange("restaurantCategory", {
                id: selectedCategory.id,
              });
              setErrors((prev) => ({
                ...prev,
                "restaurantCategory.id": "",
              }));
            }
          }}
        />
        </div>

        <div className="mx-6 mt-2 text-[17px]">Food Type</div>
        <div className="flex gap-x-6 px-4 py-1">
          {[{ label: "Veg", value: true }, { label: "Non-Veg", value: false }].map(
            ({ label, value }) => (
              <div
                key={label}
                className={`border cursor-pointer flex justify-center border-borderColor py-2 px-6 rounded-[16px] min-w-32 ${
                  formData.isVeg === value ? "bg-green-500 text-white" : ""
                }`}
                onClick={() => onFormDataChange("isVeg", value)}
              >
                {label}
              </div>
            )
          )}
        </div>

        <div className="mx-6 my-2">
          Pricing
          <div className="mb-2 text-red-500 text-[14px]">{errors.price}</div>
          <Input
            placeholder="₹"
            className="h-[42px] rounded-[16px] shadow-none"
            value={formData.price}
            onChange={(e) => {
              onFormDataChange("price", e.target.value);
              setErrors((prev) => ({ ...prev, price: "" }));
            }}
          />
        </div>

        <div className="mx-6 my-4">
          Item Description
          <div className="mb-2 text-red-500 text-[14px]">
            {errors.description}
          </div>
          <Textarea
            className="rounded-[16px] h-[106px] shadow-none"
            value={formData.description}
            onChange={(e) => {
              onFormDataChange("description", e.target.value);
              setErrors((prev) => ({ ...prev, description: "" }));
            }}
          />
        </div>

        <div className="flex items-center gap-x-8">
          <div className="w-1/3 mx-6">
            <div className="my-2">Serving Info</div>
            <Dropdown
              label="Serves"
              options={[1, 2, 3, 4]}
              selected={formData.servingInfo}
              onSelect={(value) => {
                onFormDataChange("servingInfo", value);
                setErrors((prev) => ({ ...prev, servingInfo: "" }));
              }}
            />
          </div>

          <div className="w-1/3 mx-6">
            <div className="my-2">Portion Size</div>
            <Dropdown
              label="ml"
              options={[150, 300, 500, 1000]}
              selected={formData.portionSize}
              onSelect={(value) => {
                onFormDataChange("portionSize", value);
                setErrors((prev) => ({ ...prev, portionSize: "" }));
              }}
            />
          </div>
        </div>

        <div className="mx-6 my-2">
          Preparation Time (in min)
          <Input
            className="h-[42px] rounded-[16px] shadow-none"
            value={formData.preparationTime}
            onChange={(e) => {
              onFormDataChange("preparationTime", e.target.value);
              setErrors((prev) => ({ ...prev, preparationTime: "" }));
            }}
          />
        </div>
      </div>
    );
  }
);

export default AddItem;
