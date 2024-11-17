import Review from "@/components/CustomerRev/Review";
import Sort from "@/components/CustomerRev/Sort";
import React from "react";
import reviews from "@/dummyData/reviews";

const page = () => {
  return (
    <div className="w-full mx-4">
      <Sort />
      <div className="font-poppins font-bold text-[16px]">Customer Reviews</div>
      {reviews.map((review) => (
        <Review
          key={review.id}
          username={review.username}
          item={review.item}
          description={review.description}
          date={review.date}
          rating={review.rating}
          price={review.price}
        />
      ))}
    </div>
  );
};

export default page;
