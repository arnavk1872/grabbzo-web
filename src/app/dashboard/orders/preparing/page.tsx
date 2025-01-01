import NoPreparingOrders from "@/components/Orders/NoPreparingOrders";
import OrderTable from "@/components/Orders/OrderTable";
import { getOrders } from "@/helpers/api-utils";
import React from "react";

const page = async () => {

  const orderDetails = await getOrders("pending");
  return <div>{true ? <NoPreparingOrders /> : <OrderTable orderDetails={orderDetails} />}</div>;
};

export default page;
