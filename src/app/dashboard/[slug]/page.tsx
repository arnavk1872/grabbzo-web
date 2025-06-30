// @ts-nocheck
import OrderWrapper from "@/components/Orders/OrderWrapper";
import { getOrderbyId } from "@/helpers/api-utils";
import React from "react";

type tParams = Promise<{ slug: string[] }>;

const page = async (props: { params: tParams }) => {
  const { slug } = await props.params;
  const orderDetails = await getOrderbyId(slug);
  
  return (
    <OrderWrapper orderDetails={orderDetails} />
  );
};

export default page;
