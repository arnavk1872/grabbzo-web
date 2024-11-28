import React from "react";
import Heart from "../Icons/Heart";

interface FeedbackItemProps {
  name: string;
  likes: number;
  stock: number;
  maxStock: number;
}

const FeedbackItem: React.FC<FeedbackItemProps> = ({
  name,
  likes,
  stock,
  maxStock,
}) => {
  const progressWidth = (stock / maxStock) * 100;

  return (
    <div className="flex items-center bg-white py-4  ">
      {/* Placeholder for Image */}
      <div className="w-[72px] h-[62px] bg-gray-300 rounded-md"></div>

      {/* Content */}
      <div className="ml-4 w-full">
        <div className="flex justify-between items-center">
          
          <div className="flex gap-x-2">
            <h3 className="text-lg font-medium text-gray-800">{name}</h3>
            
          </div>
          <p className="text-sm text-red-500 flex items-center">
              <span className="mr-1 cursor-pointer"><Heart/></span>
              {likes}
            </p>
          {/* <p className="mt-2 text-sm text-gray-600 flex gap-x-[2px]">
            Stock: <span className="font-medium">{stock}</span>/
            <span>{maxStock}</span>
          </p> */}
        </div>

        <div className="relative mt-2">
          <div className="h-2 bg-gray-300 rounded-full">
            <div
              className="h-2 bg-yellow-400 rounded-full"
              style={{ width: `${progressWidth}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackItem;
