"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { S3_BASE_URL } from "@/lib/constants";

interface OrderStatus {
  image: string;
  count: number;
  label: string;
  color: string;
  route: string;
}

const orderStatuses: OrderStatus[] = [
  { image: `${S3_BASE_URL}/public/New.png`, count: 0, label: "NEW", color: "text-Red", route: "/dashboard/orders" },
  { image: `${S3_BASE_URL}/public/Prep.png`, count: 0, label: "PREPARING", color: "text-Purple", route: "/dashboard/orders/preparing" },
  { image: `${S3_BASE_URL}/public/ready.png`, count: 0, label: "READY", color: "text-LightGreen", route: "/dashboard/orders/ready" },
  { image: `${S3_BASE_URL}/public/pickedup.png`, count: 0, label: "PICKED UP", color: "text-Orange", route: "/dashboard/orders/pickedup" },
];

const OrderStatusCard: React.FC<
  OrderStatus & { isSelected: boolean; onClick: () => void }
> = ({ image, count, label, color, route, isSelected, onClick }) => {
  return (
    <div
      className={`flex  cursor-pointer border-2  px-4 py-2 sm:p-8 ${
        isSelected ? "border-blue-300 rounded-full h-[120px] items-center bg-blue-50" : "border-transparent rounded-lg "
      }`}
      onClick={onClick}
    >
      <span className="sm:block hidden"><Image src={image} height={95} width={85} alt={label} /></span>
      <div className="flex flex-col justify-center text-center md:text-left">
        <span className={`${color}  text-[16px]   sm:text-[32px] font-bold font-sans`}>{count}</span>
        <div className="text-[10px] sm:text-[16px] font-semibold">{label}</div>
      </div>
    </div>
  );
};

const Orders: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);
  const router = useRouter();

  const handleCardClick = (index: number, route: string) => {
    setSelectedIndex(index);
    router.push(route); 
  };

  return (
    <div className="bg-white rounded-[30px] max-w-[1108px] w-full mx-2 my-2 flex sm:h-[160px] gap-x-2 whitespace-nowrap sm:pl-8 items-center">
      {orderStatuses.map((status, index) => (
        <OrderStatusCard
          key={index}
          image={status.image}
          count={status.count}
          label={status.label}
          color={status.color}
          route={status.route}
          isSelected={selectedIndex === index} 
          onClick={() => handleCardClick(index, status.route)} 
        />
      ))}
    </div>
  );
};

export default Orders;
