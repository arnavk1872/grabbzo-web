"use client";
import { formatDate } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";

interface Order {
  id: string;
  createdAt: string;
  customerName: string;
  customerArrivingTime: string;
  amount: string;
  status: string;
}

interface OrderTableProps {
  orderDetails: Order[];
}

const OrderTable: React.FC<OrderTableProps> = ({ orderDetails }) => {
  const router = useRouter();

  const checkOrderDetails = (orderId: string) => {
    router.push(`/dashboard/${orderId}`);
  };

  function formatDate(apiDate: string): string {
    const date = new Date(apiDate);

    const day = date.getDate();
    const month = date.getMonth() + 1; 
    const year = date.getFullYear() % 100; 
  
    let hours = date.getHours();
    const minutes = date.getMinutes();
  
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; 
  
    const formattedMinutes = minutes.toString().padStart(2, "0");
  
    return `${day}-${month}-${year} ${hours}:${formattedMinutes}${period}`;
  }
  

  return (
    <div className="flex justify-center items-center overflow-x-auto border border-gray-300 md:mx-8 my-2 font-poppins rounded-[30px]">
      <table className="md:min-w-full">
        <thead className="bg-[#1663DE] text-white rounded-[30px] block py-2 my-2 mx-1">
          <tr className="flex justify-between rounded-[24px] px-4 py-2 m-2">
            <th className="flex-1 text-center">Order ID</th>
            <th className="flex-1 text-center xl:block hidden">Date</th>
            <th className="flex-1 text-center">Customer Name</th>
            <th className="flex-1 text-center xl:block hidden">ETA</th>
            <th className="flex-1 text-center">Amount</th>
            <th className="flex-1 text-center">Order Status</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails.map((order) => (
            <tr
              onClick={() => checkOrderDetails(order.id)}
              key={order.id}
              className="flex gap-x-2 xl:px-2 py-4 cursor-pointer"
            >
              <td className="flex-1 text-center">{order.id}</td>
              <td className="flex-1 text-center xl:block hidden">{formatDate(order.createdAt)}</td>
              <td className="flex-1 text-center">{order.customerName}</td>
              <td className="flex-1 text-center xl:block hidden">
                {formatDate(order.customerArrivingTime)}
              </td>
              <td className="flex-1 text-center">{order.amount}</td>
              <td className="flex-1 text-center">
                <span
                  className={`rounded-full text-white text-sm min-w-[100px] inline-block ${
                    order.status.toLowerCase() === "ready"
                      ? "bg-LightGreen px-3 py-1"
                      : order.status.toLowerCase() === "cancelled"
                      ? "bg-Red px-3 py-1"
                      : order.status.toLowerCase() === "pickup"
                      ? "bg-Orange px-3 py-1"
                      : "bg-Purple px-3 py-1"
                  }`}
                >
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
