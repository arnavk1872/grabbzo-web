import React from "react";
import Heart from "../Icons/Heart";
import { Avatar, AvatarFallback, AvatarImage } from "../Dashboard/Avatar";
import { Star } from "lucide-react";

interface FeedbackItemProps {
  name: string;
  likes: number;
}

const FeedbackItem: React.FC<FeedbackItemProps> = ({
  name,
  likes,
}) => {

  return (
    <div className="flex items-center bg-white py-4  ">
      {/* Placeholder for Image */}
      <Avatar className="h-12 w-12 !bg-yellow-500 ">
          <AvatarImage  src="" />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>

      {/* Content */}
      <div className="ml-4 w-full">
        <div className="flex justify-between items-center">
          
          <div className="flex gap-x-2">
            <h3 className="text-[18px] font-medium text-yellow-500">{name}</h3>
            
          </div>
          <p className="text-sm text-yellow-700 flex items-center">
              <span className="mr-1 cursor-pointer"><Star size={16}/></span>
              {likes}
            </p>
          {/* <p className="mt-2 text-sm text-gray-600 flex gap-x-[2px]">
            Stock: <span className="font-medium">{stock}</span>/
            <span>{maxStock}</span>
          </p> */}
        </div>

        <div className="relative mt-2 line-clamp-1 font-poppins text-[13px]">
          {/* <div className="h-2 bg-gray-300 rounded-full">
            <div
              className="h-2 bg-yellow-400 rounded-full"
              style={{ width: `${progressWidth}%` }}
            ></div>
          </div> */}
          {"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vehicula nisi vel massa consectetur consectetur. Ut quam magna, tempus vel mauris eu, fermentum volutpat diam"}
        </div>
      </div>
    </div>
  );
};

export default FeedbackItem;
