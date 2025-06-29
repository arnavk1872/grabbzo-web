"use client";
import React, { useState, useEffect } from "react";
import { useOrderStore } from "@/store/OrderStore";
import OrderTable from "./OrderTable";
import NoNewOrders from "./NoNewOrders";

interface RealTimeOrdersProps {
  orderType: string;
}

const RealTimeOrders: React.FC<RealTimeOrdersProps> = ({ orderType }) => {
  const { newOrders, addNewOrder, removeOrder, updateOrderStatus } = useOrderStore();
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);

  // Filter orders based on orderType
  useEffect(() => {
    if (orderType === "NEW") {
      setFilteredOrders(newOrders.filter(order => order.status === "NEW"));
    }
  }, [newOrders, orderType]);

  // Listen for new orders from stomp connection
  useEffect(() => {
    const handleNewOrder = (event: any) => {
      const orderData = event.detail;
      console.log('Received new order:', orderData);
      
      // Format the order data to match expected structure
      const formattedOrder = {
        id: orderData.id || orderData.orderId,
        createdAt: orderData.createdAt || new Date().toISOString(),
        customerName: orderData.customerName || orderData.customer?.name || "Unknown",
        customerArrivingTime: orderData.customerArrivingTime || orderData.arrivalTime,
        total: orderData.total || orderData.amount || "0",
        status: orderData.status || "NEW",
        type: orderData.type || orderData.orderType || "PICKUP"
      };
      
      addNewOrder(formattedOrder);
    };

    const handleStatusUpdate = (event: any) => {
      const statusData = event.detail;
      console.log('Received status update:', statusData);
      
      if (statusData.orderId && statusData.status) {
        updateOrderStatus(statusData.orderId, statusData.status);
        
        // If order status changed from NEW, remove it from new orders
        if (statusData.status !== "NEW") {
          removeOrder(statusData.orderId);
        }
      }
    };

    window.addEventListener('newOrder', handleNewOrder);
    window.addEventListener('orderStatusUpdate', handleStatusUpdate);

    return () => {
      window.removeEventListener('newOrder', handleNewOrder);
      window.removeEventListener('orderStatusUpdate', handleStatusUpdate);
    };
  }, [addNewOrder, updateOrderStatus, removeOrder]);

  const hasOrders = filteredOrders && filteredOrders.length > 0;

  return (
    <div className="w-full">
      {!hasOrders ? (
        <NoNewOrders />
      ) : (
        <div className="relative">
          <OrderTable orderDetails={filteredOrders} />
          <div className="mt-4 mb-6 font-poppins text-center">
            <div className="text-sm text-gray-600">
              Showing {filteredOrders.length} new order{filteredOrders.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealTimeOrders; 