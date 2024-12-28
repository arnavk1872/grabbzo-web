import NoReadyOrders from "@/components/Orders/NoReadyOrders";
import OrderTable from "@/components/Orders/OrderTable";
import React from "react";

const page = () => {
  return <div>{true ? <NoReadyOrders /> : <OrderTable />}</div>;
};

export default page;
