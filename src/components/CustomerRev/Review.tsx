import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../Dashboard/Avatar";

interface ReviewProps {
  username: string;
  item: string;
  description: string;
  date: string;
  rating: number;
  price: string;
}

const Review: React.FC<ReviewProps> = ({ username, item, description, date, rating, price }) => {
  return (
    <div className="flex items-start p-4 bg-white border border-borderColor font-poppins rounded-[30px]  my-2  w-full">
      <div className="p-4 flex flex-col items-center">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>User</AvatarFallback>
        </Avatar>
        <span className="text-[12px] font-semibold font-poppins mt-2 whitespace-nowrap">
          {"05 min ago"}
        </span>
      </div>
      
      <div className="flex-grow ml-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-x-4">
            <p className="text-gray-900 font-semibold text-[16px]">{username}</p>
            <p className="text-Red font-semibold text-[16px]">{item}</p>
          </div>
          <div className="flex items-center px-8">
            <span className="text-[#FFBA4D] text-2xl">
              {'★'.repeat(rating)}
            </span>
          </div>
        </div>
        <p className="text-gray-600 text-sm mt-2 max-w-[1230px] text-[16px]">{description}</p>
        <div className="flex items-center justify-between mt-4">
          <p className="text-Red text-sm font-semibold">{date}</p>
          <p className="text-LightGreen font-semibold  lg:px-8">{price}</p>
        </div>
      </div>
    </div>
  );
};

export default Review;
