import NoPickedOrders from "@/components/Orders/NoPickedOrders";
import OrderTable from "@/components/Orders/OrderTable";
import { getOrders } from "@/helpers/api-utils";
import React from "react";

const page = async () => {
  const orderDetails = await getOrders("COMPLETED");
  return (
    <div>
      {/* {orderDetails.length == 0 ? ( */}
       {true ? (
        <NoPickedOrders />
      ) : (
        <OrderTable orderDetails={orderDetails} />
      )}
    </div>
  );
};

export default page;
