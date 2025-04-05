import NoReadyOrders from "@/components/Orders/NoReadyOrders";
import OrderTable from "@/components/Orders/OrderTable";
import { getOrders } from "@/helpers/api-utils";
import React from "react";


const page = async() => {

  const orderDetails = await getOrders("READY");
  return (
    <div>
      {true ? (
        <NoReadyOrders />
      ) : (
        <OrderTable orderDetails={orderDetails} />
      )}
    </div>
  );
};

export default page;
