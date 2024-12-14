"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface Order {
  id: string;
  date: string;
  customerName: string;
  location: string;
  amount: string;
  status: string;
}

const OrderTable: React.FC = async ({}) => {
  const router = useRouter();
 
  const checkOrderDetails = (orderid: any) => {
    router.push(`/dashboard/${orderid}`);
  };
  // Dummy data
  const orders: Order[] = [
    {
      id: "33145",
      date: "24 Dec 2024, 12:32 PM",
      customerName: "Harsh Ghai",
      location: "181101, Jammu",
      amount: "₹150",
      status: "Ready",
    },
    {
      id: "13445",
      date: "24 Dec 2024, 12:32 PM",
      customerName: "Arnav Khajuria",
      location: "181101, Canal Road",
      amount: "₹2508",
      status: "Cancelled",
    },
    {
      id: "33441",
      date: "24 Dec 2024, 12:32 PM",
      customerName: "Shreesh Jain",
      location: " Canal Road, Jammu",
      amount: "₹2450",
      status: "Pickup",
    },
    {
      id: "33445",
      date: "24 Dec 2024, 12:32 PM",
      customerName: "Harsh Ghai",
      location: "181101, Canal Road, Jammu",
      amount: "₹50",
      status: "Preparing",
    },
  ];

  return (
    <div className="flex justify-center items-center overflow-x-auto border border-gray-300 md:mx-8 my-2 font-poppins rounded-[30px] ">
      <table className="md:min-w-full ">
        <thead className="bg-[#1663DE] text-white rounded-[30px] block py-2 my-2 mx-1 ">
          <tr className="flex justify-between rounded-[24px] px-4 py-2 m-2">
            <th className="flex-1 text-center">Order ID</th>
            <th className="flex-1 text-center xl:block hidden">Date</th>
            <th className="flex-1 text-center">Customer Name</th>
            <th className="flex-1 text-center xl:block hidden">Location</th>
            <th className="flex-1 text-center">Amount</th>
            <th className="flex-1 text-center">Order Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr
              onClick={() => {
                checkOrderDetails(order.id);
              }}
              key={index}
              className="flex  gap-x-2  xl:px-2 py-4 cursor-pointer"
            >
              <td className="flex-1 text-center">{order.id}</td>
              <td className="flex-1 text-center xl:block hidden">
                {order.date}
              </td>
              <td className="flex-1 text-center">{order.customerName}</td>
              <td className="flex-1 text-center xl:block hidden">
                {order.location}
              </td>
              <td className="flex-1 text-center">{order.amount}</td>
              <td className="flex-1 text-center">
                <span
                  className={`rounded-full text-white text-sm min-w-[100px] inline-block   ${
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
