import React from "react";

type ItemProps = {
  Item: string;
  Additional: string;
  No: number;
  Price: number;
};

const Item: React.FC<ItemProps> = ({ Item, Additional, No, Price }) => {
  return (
    <div className="border-b border-gray-300 pb-5 pt-2">
      <div className="flex justify-between items-center">
        <h4 className="text-2xl font-medium">{Item}</h4>
        <h6 className="text-blue-600 font-medium text-xl">
          {Price.toFixed(2)}
        </h6>
      </div>
      <div className="flex flex-col text-gray-500">
        {Additional.length > 0 && (
          <span>Additional Ingredient: {Additional}</span>
        )}
        <span>Quanitty: {No}</span>
      </div>
    </div>
  );
};

export default Item;
