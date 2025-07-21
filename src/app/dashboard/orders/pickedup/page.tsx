import { getOrders } from "@/helpers/api-utils";
import OrdersWithPagination from "@/components/Orders/OrdersWithPagination";
import React from "react";

interface PageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

const page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const currentPage = parseInt(params.page || "0", 10);
  const orderDetails = await getOrders("COMPLETED", currentPage, 10);
  
  return (
    <OrdersWithPagination 
      initialData={orderDetails} 
      orderType="COMPLETED"
      initialPage={currentPage}
    />
  );
};

export default page;
