// @ts-nocheck
import CustomerDetails from "@/components/Orders/CustomerDetails";
import ItemsOrdered from "@/components/Orders/ItemsOrdered";
import OrderDetails from "@/components/Orders/OrderDetails";
import { getOrderbyId } from "@/helpers/api-utils";
import React from "react";

type tParams = Promise<{ slug: string[] }>;

const page = async (props: { params: tParams }) => {
  const { slug } = await props.params;
  const orderDetails = await getOrderbyId(slug);

  return (
    <div className="w-full">
      <OrderDetails />
      <div className="flex w-full justify-between items-start 2xl:px-12">
        <CustomerDetails orderDetails={orderDetails} />
        <ItemsOrdered orderDetails={orderDetails.orderDetails}/>
      </div>
    </div>
  );
};

export default page;
