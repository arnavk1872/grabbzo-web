import NoPreparingOrders from "@/components/Orders/NoPreparingOrders";
import OrderTable from "@/components/Orders/OrderTable";
import React from "react";

const page = () => {
  return <div>{true ? <NoPreparingOrders /> : <OrderTable />}</div>;
};

export default page;
