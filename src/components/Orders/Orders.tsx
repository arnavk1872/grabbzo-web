"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image, { StaticImageData } from "next/image";
import newOrder from "@public/New.png";
import prep from "@public/Prep.png";
import pickedUp from "@public/pickedup.png";
import ready from "@public/ready.png";

interface OrderStatus {
  image: StaticImageData;
  count: number;
  label: string;
  color: string;
  route: string;
}

const orderStatuses: OrderStatus[] = [
  { image: newOrder, count: 62, label: "New", color: "text-Red", route: "/dashboard/orders" },
  { image: prep, count: 44, label: "Preparing", color: "text-Purple", route: "/dashboard/orders/preparing" },
  { image: ready, count: 33, label: "Ready", color: "text-LightGreen", route: "/dashboard/orders/ready" },
  { image: pickedUp, count: 11, label: "Picked Up", color: "text-Orange", route: "/dashboard/orders/pickedup" },
];

const OrderStatusCard: React.FC<
  OrderStatus & { isSelected: boolean; onClick: () => void }
> = ({ image, count, label, color, route, isSelected, onClick }) => {
  return (
    <div
      className={`flex  cursor-pointer border-2 p-8 ${
        isSelected ? "border-blue-500 rounded-[29px] h-[120px] items-center bg-blue-50" : "border-transparent rounded-lg "
      }`}
      onClick={onClick}
    >
      <Image src={image} height={95} width={85} alt={label} />
      <div className="flex flex-col justify-center text-left">
        <span className={`${color} text-[32px] font-bold font-sans`}>{count}</span>
        <div className="text-[16px] font-semibold">{label}</div>
      </div>
    </div>
  );
};

const Orders: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const router = useRouter();

  const handleCardClick = (index: number, route: string) => {
    setSelectedIndex(index);
    router.push(route); 
  };

  return (
    <div className="bg-white rounded-[30px] max-w-[1108px] w-full mx-8 my-2 flex h-[160px] gap-x-16 pl-8 items-center">
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
