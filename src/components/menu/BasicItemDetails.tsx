import React, { useState } from "react";

type DishCardProps = {
  initialTitle?: string;
  initialDescription?: string;
  initialIsVeg?: boolean;
};

const MAX_CHARS = 100;

const DishCard: React.FC<DishCardProps> = ({
  initialTitle = "",
  initialDescription = "",
  initialIsVeg = true,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [isVeg, setIsVeg] = useState(initialIsVeg);

  return (
    <div className="border rounded-md p-4 shadow-sm max-w-md space-y-4 ">
      <div className="flex justify-between items-start">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-lg font-semibold text-blue-900 w-full mr-2 border-b border-gray-300 focus:outline-none"
          placeholder="Dish Name"
        />
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
    onChange={(e) => setIsVeg(e.target.value === "veg")}
    className="text-sm text-blue-900  rounded px-2 py-1"
  >
    <option value="veg">Veg</option>
    <option value="non-veg">Non-Veg</option>
  </select>
</div>

      </div>

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="text-sm text-gray-700 w-full border border-gray-300 rounded-md p-2 focus:outline-none"
        rows={3}
        maxLength={MAX_CHARS}
        placeholder="Enter description"
      />

      <div className="text-sm text-gray-500 text-right">
        {description.length}/{MAX_CHARS}
      </div>
    </div>
  );
};

export default DishCard;
