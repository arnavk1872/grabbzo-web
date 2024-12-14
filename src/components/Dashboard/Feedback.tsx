import React from "react";
import FeedbackItem from "./FeedbackItem";
import LeftArrow from "../Icons/LeftArrow";
import ArrowRight from "../Icons/ArrowRight";

interface FeedbackData {
  id: number;
  name: string;
  likes: number;
}

const Feedback: React.FC = () => {
  const dummyData: FeedbackData[] = [
    {
      id: 1,
      name: "Chicken & Mushroom",
      likes: 734,
    },
    {
      id: 2,
      name: "Roast Chicken Salad",
      likes: 946,
    },
    {
      id: 3,
      name: "Turkey Sweet Potatoes",
      likes: 2845,
    },
  ];

  return (
    <div className="rounded-[30px] bg-white border border-borderColor w-full lg:mr-3 max-h-[400px] flex-[1]">
      <div className="font-poppins text-[18px] font-semibold py-6 px-4">
        Customer Feedback
      </div>
      <div className="px-6">
        {dummyData.map((item) => (
          <FeedbackItem
            key={item.id}
            name={item.name}
            likes={item.likes}
          />
        ))}
      </div>
      <div className="flex justify-center ">
        {" "}
        <div  className="cursor-pointer w-2"><LeftArrow /></div>
        <div className="cursor-pointer w-2"><ArrowRight /></div>
        
      </div>
    </div>
  );
};

export default Feedback;
