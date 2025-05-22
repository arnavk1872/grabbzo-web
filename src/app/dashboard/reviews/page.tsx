import Review from "@/components/CustomerRev/Review";
import Sort from "@/components/CustomerRev/Sort";
import { getReviews } from "@/helpers/api-utils";
import React from "react";

interface ReviewType {
  id: number;
  username: string;
  item: string;
  description: string;
  date: string; 
  rating: number;
  price: string;
}

const page = async() => {

  const restReviews = await getReviews();
  console.log(restReviews,"REVIEWS");
  const reviews: ReviewType[] = [
    // {
    //   id: 1,
    //   username: "Rodney Artichoke",
    //   item: "Chicken Burger",
    //   description:
    //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque blandit imperdiet neque nec varius. Aliquam dictum tincidunt nunc, sed iaculis orci convallis sit amet.",
    //   date: "20 August 2018, 10:40AM",
    //   rating: 4,
    //   price: " ₹97.50",
    // },
    // {
    //   id: 2,
    //   username: "Sally Tomato",
    //   item: "Veggie Pizza",
    //   description:
    //     "Blind texts in the mountains from the supplies of the village lorem ipsum dolor sit amet, lorem ipsum dolor.",
    //   date: "15 September 2021, 12:15PM",
    //   rating: 1,
    //   price: " ₹85.00",
    // },
    // {
    //   id: 3,
    //   username: "Johnny Banana",
    //   item: "Steak Sandwich",
    //   description:
    //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque blandit imperdiet neque nec varius. Aliquam dictum tincidunt nunc, sed iaculis orci convallis sit amet. Semikoli.",
    //   date: "11 January 2020, 5:30PM",
    //   rating: 3,
    //   price: " ₹45.00",
    // },
    // {
    //   id: 4,
    //   username: "Peter Pumpkin",
    //   item: "Chocolate Cake",
    //   description:
    //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque blandit imperdiet neque nec varius. Aliquam dictum tincidunt nunc, sed iaculis orci convallis sit amet.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque blandit imperdiet neque nec varius. Aliquam dictum tincidunt nunc, sed iaculis orci convallis sit amet..",
    //   date: "5 March 2019, 9:00AM",
    //   rating: 5,
    //   price: " ₹60.00",
    // },
    // {
    //   id: 5,
    //   username: "Daisy Pear",
    //   item: "Ice Cream Sundae",
    //   description:
    //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque blandit imperdiet neque nec varius. Aliquam dictum tincidunt nunc, sed iaculis orci convallis sit amet.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque blandit imperdiet neque nec varius. Aliquam dictum tincidunt nunc, sed iaculis orci convallis sit amet.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque blandit imperdiet neque nec varius. Aliquam dictum tincidunt nunc, sed iaculis orci convallis sit amet.",
    //   date: "20 July 2022, 3:45PM",
    //   rating: 4,
    //   price: " ₹30.50",
    // },
  ];

  return (
    <div className="w-full mx-4">
      <Sort />
      <div className="font-poppins font-bold text-[16px]">Customer Reviews</div>

      {reviews.length > 0 ? (
        reviews.map((review) => (
          <Review
            key={review.id}
            username={review.username}
            item={review.item}
            description={review.description}
            date={review.date}
            rating={review.rating}
            price={review.price}
          />
        ))
      ) : (
        <div className="text-center mt-4 font-poppins text-gray-600">
          No reviews available yet.
        </div>
      )}
    </div>
  );
};

export default page;
