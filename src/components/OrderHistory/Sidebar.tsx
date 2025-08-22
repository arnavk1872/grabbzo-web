import React from "react";
import { Order } from "../../../types/type";
import UserBtn from "./UserBtn";

interface SidebarProps {
  orders: Order[];
  setSelectedOrder: (order: Order) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ orders, setSelectedOrder }) => {
  return (
    <div className="min-w-[350px] ml-12 bg-white rounded-3xl min-h-[75vh] font-poppins">
      <h3 className="text-center font-medium text-xl border-b-2 py-5 mb-8">
        Order History
      </h3>
      <div className="my-5">
        {orders.map((order) => (
          <div
            key={order.id}
            onClick={() => setSelectedOrder(order)}
          >
            <UserBtn
              orderNumber={order.id}
              date={new Date(order.createdAt).toLocaleString()}
              amount={order.total}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
