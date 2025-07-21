import { getOrders } from "@/helpers/api-utils";
import RealTimeOrders from "@/components/Orders/RealTimeOrders";
import StompConnection from "@/helpers/stomp";
import React from "react";

interface PageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

const page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const currentPage = parseInt(params.page ?? "0", 10);
  const orderDetails = await getOrders("NEW", currentPage, 10);
  
  return (
    <>
      <StompConnection />
      <RealTimeOrders 
        orderType="NEW"
        initialData={orderDetails} 
        initialPage={currentPage}
      />
    </>
  );
};

export default page;
