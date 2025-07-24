"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/OrderHistory/Sidebar";
import Details from "@/components/OrderHistory/Details";
import { Order } from "../../../types/type";
import { fetchCompletedOrders } from "@/helpers/orderAction";

const Page = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const getOrders = async () => {
      const result = await fetchCompletedOrders();
      setOrders(result);
    };
    getOrders();
  }, []);

  return (
    <div className="flex mt-12">
      <Sidebar orders={orders} setSelectedOrder={setSelectedOrder} />
      <Details selectedOrder={selectedOrder} />
    </div>
  );
};

export default Page;

