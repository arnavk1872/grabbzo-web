import React from "react";
import customerIcon from "@public/Customer.png";
import Image from "next/image";
import { Star } from "lucide-react";

const CustomerSatisfaction = () => {
  const totalStars = 5;
  const filledStars = 1; 

  return (
    <div className="h-[160px] bg-white rounded-[30px] max-w-[380px] mx-2 my-2 flex items-center space-x-4 px-8 gap-x-4 ">
      <Image src={customerIcon} height={52} width={51} alt="Customer Icon" />

      <div>
        {" "}
        <div className="flex space-x-1 items-center ">
          {Array.from({ length: totalStars }, (_, index) => (
            <Star
              key={index}
              className={
                index < filledStars ? "text-[#FFBA4D]" : "text-gray-300"
              }
              fill={index < filledStars ? "currentColor" : "none"}
            />
          ))}
          <span className="text-[30px] text-[#FFBA4D] font-bold  inline-block pl-2">1.0</span>
        </div>
        <span className="text-gray-700 text-lg font-medium">
          Customer Satisfaction
        </span>
      </div>
    </div>
  );
};

export default CustomerSatisfaction;