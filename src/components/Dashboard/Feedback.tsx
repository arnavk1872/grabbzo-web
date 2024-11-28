import React from "react";
import FeedbackItem from "./FeedbackItem";

interface FeedbackData {
  id: number;
  name: string;
  likes: number;
  stock: number;
  maxStock: number;
}

const Feedback: React.FC = () => {
  const dummyData: FeedbackData[] = [
    {
      id: 1,
      name: "Chicken & Mushroom",
      likes: 734,
      stock: 433,
      maxStock: 844,
    },
    {
      id: 2,
      name: "Roast Chicken Salad",
      likes: 946,
      stock: 245,
      maxStock: 554,
    },
    {
      id: 3,
      name: "Turkey Sweet Potatoes",
      likes: 2845,
      stock: 346,
      maxStock: 478,
    },
  ];

  return (
    <div className="rounded-[30px] bg-white border border-borderColor w-full lg:mr-12 max-h-[400px] flex-[1]">
      <div className="font-poppins text-[16px] font-semibold py-6 px-4">
        Customer Feedback
      </div>
      <div className="px-6">
        {dummyData.map((item) => (
          <FeedbackItem
            key={item.id}
            name={item.name}
            likes={item.likes}
            stock={item.stock}
            maxStock={item.maxStock}
          />
        ))}
      </div>
    </div>
  );
};

export default Feedback;
