import React from "react";

type DishCardProps = {
  formData?: any;
  onFormDataChange?: (field: string, value: any) => void;
  errors?: Record<string, string>;
  setErrors?: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  initialTitle?: string;
  initialDescription?: string;
  initialIsVeg?: boolean;
};

const MAX_CHARS = 150;

const DishCard: React.FC<DishCardProps> = ({
  formData,
  onFormDataChange,
  errors = {},
  setErrors,
  initialTitle = "",
  initialDescription = "",
  initialIsVeg = true,
}) => {
  // Use formData if available, otherwise fall back to initial values
  const title = formData?.title ?? initialTitle;
  const description = formData?.description ?? initialDescription;
  const isVeg = formData?.isVeg ?? initialIsVeg;

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (onFormDataChange) {
      onFormDataChange("title", value);
      if (setErrors) {
        setErrors((prev) => ({ ...prev, title: "" }));
      }
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (onFormDataChange) {
      onFormDataChange("description", value);
      if (setErrors) {
        setErrors((prev) => ({ ...prev, description: "" }));
      }
    }
  };

  const handleVegChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === "veg";
    if (onFormDataChange) {
      onFormDataChange("isVeg", value);
    }
  };

  return (
    <div className="border rounded-md p-4 shadow-sm max-w-md space-y-4 ">
      <div className="flex justify-between items-start">
        <div className="flex-1 mr-2">
          {errors.title && (
            <div className="text-red-500 text-[14px] mb-1">{errors.title}</div>
          )}
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="text-lg font-semibold text-blue-900 w-full border-b border-gray-300 focus:outline-none"
            placeholder="Dish Name"
          />
        </div>
        <div className="flex items-center gap-1 border border-gray-300 rounded-md px-1">
          <span
            className={`w-3 h-3 border rounded-sm flex items-center justify-center ${
              isVeg ? "border-green-700" : "border-red-700"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isVeg ? "bg-green-600" : "bg-red-600"
              }`}
            ></span>
          </span>
          <select
            value={isVeg ? "veg" : "non-veg"}
            onChange={handleVegChange}
            className="text-sm text-blue-900  rounded px-2 py-1"
          >
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
          </select>
        </div>
      </div>

      <div>
        {errors.description && (
          <div className="text-red-500 text-[14px] mb-1">{errors.description}</div>
        )}
        <textarea
          value={description}
          onChange={handleDescriptionChange}
          className="text-sm text-gray-700 w-full border border-gray-300 rounded-md p-2 focus:outline-none"
          rows={3}
          maxLength={MAX_CHARS}
          placeholder="Enter description"
        />
        <div className="mt-2 bg-[#FFE5BC] border border-yellow-400 text-yellow-800 text-xs p-2 rounded">
        Adding description will help increase the sales of this item.
            </div>
      </div>

      <div className="text-sm text-gray-500 text-right">
        {description.length}/{MAX_CHARS}
      </div>
    </div>
  );
};

export default DishCard;
