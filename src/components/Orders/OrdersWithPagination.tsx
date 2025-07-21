"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getOrders } from "@/helpers/api-utils";
import OrderTable from "./OrderTable";
import NoNewOrders from "./NoNewOrders";
import NoPreparingOrders from "./NoPreparingOrders";
import NoReadyOrders from "./NoReadyOrders";
import NoPickedOrders from "./NoPickedOrders";

interface OrdersResponse {
  orders: {
    content: any[];
    pageable: {
      sort: any;
      offset: number;
      pageNumber: number;
      pageSize: number;
      paged: boolean;
      unpaged: boolean;
    };
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort: any;
    numberOfElements: number;
    first: boolean;
    empty: boolean;
  };
  page: number;
  "Total Pages": number;
  size: number;
}

interface OrdersWithPaginationProps {
  initialData: OrdersResponse;
  orderType: string;
  initialPage: number;
}

const OrdersWithPagination: React.FC<OrdersWithPaginationProps> = ({
  initialData,
  orderType,
  initialPage,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderData, setOrderData] = useState<OrdersResponse>(initialData);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const pageSize = 10;

  const fetchOrders = async (page: number) => {
    setLoading(true);
    try {
      const response = await getOrders(orderType, page, pageSize);
      setOrderData(response);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    
    // Update URL with new page parameter
    const params = new URLSearchParams(searchParams.toString());
    if (newPage === 0) {
      params.delete("page");
    } else {
      params.set("page", newPage.toString());
    }
    
    const newUrl = params.toString() ? `?${params.toString()}` : "";
    
    // Determine the correct URL based on order type
    let baseUrl = "/dashboard/orders";
    if (orderType === "PREPARING") {
      baseUrl = "/dashboard/orders/preparing";
    } else if (orderType === "READY") {
      baseUrl = "/dashboard/orders/ready";
    } else if (orderType === "COMPLETED") {
      baseUrl = "/dashboard/orders/pickedup";
    }
    
    router.push(`${baseUrl}${newUrl}`);
  };

  // Fetch orders when page changes (but not on initial load)
  useEffect(() => {
    if (currentPage !== initialPage) {
      fetchOrders(currentPage);
    }
  }, [currentPage, initialPage, orderType]);

  // Function to render appropriate "no orders" component based on orderType
  const renderNoOrdersComponent = () => {
    switch (orderType) {
      case "PREPARING":
        return <NoPreparingOrders />;
      case "READY":
        return <NoReadyOrders />;
      case "COMPLETED":
        return <NoPickedOrders />;
      default:
        return <NoNewOrders />;
    }
  };

  const renderPaginationButtons = () => {
    if (!orderData?.orders) return null;

    const { totalPages } = orderData.orders;
    const buttons = [];

    // Previous button
    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 0 || loading}
        className="px-3 py-1 mx-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
      >
        Previous
      </button>
    );

    // Page numbers
    for (let i = 0; i < totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={loading}
          className={`px-3 py-1 mx-1 rounded ${
            i === currentPage
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {i + 1}
        </button>
      );
    }

    // Next button
    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1 || loading}
        className="px-3 py-1 mx-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
      >
        Next
      </button>
    );

    return buttons;
  };

  const hasOrders = orderData?.orders?.content && orderData.orders.content.length > 0;

  return (
    <div className="w-full">
      {!hasOrders ? (
        renderNoOrdersComponent()
      ) : (
        <>
          <div className="relative">
            {loading && (
              <div className="absolute inset-0 bg-white bg-opacity-50 flex justify-center items-center z-10">
                <div className="text-lg">Loading...</div>
              </div>
            )}
            <OrderTable orderDetails={orderData.orders.content} />
          </div>
          
          {/* Pagination Controls */}
          {orderData.orders.totalPages && (
            <div className="flex justify-center items-center mt-4 mb-6 font-poppins">
              <div className="flex items-center space-x-2">
                {renderPaginationButtons()}
              </div>
              <div className="ml-4 text-sm text-gray-600">
                Showing {orderData.orders.numberOfElements} of {orderData.orders.totalElements} orders
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OrdersWithPagination; 