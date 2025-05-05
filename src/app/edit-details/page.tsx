import RestaurantEditPage from "@/components/RestaurantEdit/RestaurantEditPage";
import { getRestaurantDetails } from "@/helpers/api-utils";
import React from "react";

const page = async () => {
  const RestaurantDetails = await getRestaurantDetails();

  if (!RestaurantDetails?.data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1 className="hidden">Edit Restaurant Details Page</h1>
      <RestaurantEditPage data={RestaurantDetails.data.data} />
    </div>
  );
};

export default page;
