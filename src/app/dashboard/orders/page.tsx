import NoNewOrders from "@/components/Orders/NoNewOrders";
import OrderTable from "@/components/Orders/OrderTable";
import { getOrders } from "@/helpers/api-utils";
import React from "react";

const page = async () => {
  const orderDetails = await getOrders("NEW");
  console.log(orderDetails,"DERTA");
  

  return (
    <div className="w-full">
      {orderDetails.length == 0 ? (
        <NoNewOrders />
      ) : (
        <OrderTable orderDetails={orderDetails} />
      )}
    </div>
  );
};

export default page;
