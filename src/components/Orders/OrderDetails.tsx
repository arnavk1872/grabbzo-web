"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "../UI/Button";
import { MoveLeftIcon } from "lucide-react";
import { changeOrderStatus } from "@/helpers/api-utils";


const OrderDetails = () => {
  const { slug } = useParams();
  const router = useRouter();
  const [viewButton, setViewButton] = useState<"accept" | "preparing" | "ready" | "completed">("accept");

  const buttonConfig = {
    accept: {
      status: "NEW",
      buttons: [
        {
          text: "Cancel",
          className: "bg-red-600 hover:bg-red-700",
          onClick: () => changeOrderStatus("CANCELLED", slug),
        },
        {
          text: "Accept",
          className: "bg-green-600 hover:bg-green-800",
          onClick: () => {
            changeOrderStatus("PREPARING", slug);
            setViewButton("preparing");
          },
        },
      ],
    },
    preparing: {
      status: "PREPARING",
      buttons: [
        {
          text: "Ready",
          className: "bg-green-600 hover:bg-green-800",
          onClick: () => {
            changeOrderStatus("READY", slug);
            setViewButton("ready");
          },
        },
      ],
    },
    ready: {
      status: "READY",
      buttons: [
        {
          text: "Picked Up",
          className: "bg-yellow-600 hover:bg-yellow-700",
          onClick: () => {
            changeOrderStatus("COMPLETED", slug);
            setViewButton("completed");
          },
        },
      ],
    },
    completed: {
      status: "COMPLETED",
      buttons: [
        {
          text: "Completed",
          className: "bg-green-800 hover:bg-green-900",
          onClick: () => {},
        },
      ],
    },
  };

  return (
    <div className="w-full px-8">
      <section className="flex justify-between items-center w-full">
        <div className="flex items-center gap-x-4">
          <MoveLeftIcon
            className="cursor-pointer text-blue-700"
            size={42}
            onClick={() => router.back()} 
          />
          <h1 className="font-poppins text-[38px] font-semibold text-[#1663DE]">
            ORDER ID #{slug}
          </h1>
        </div>

        <div className="px-12 flex gap-x-4">
          {buttonConfig[viewButton].buttons.map(({ text, className, onClick }) => (
            <Button
              key={text}
              variant="secondary"
              onClick={onClick}
              className={`${className} text-[18px] px-10 py-6 text-white`}
            >
              {text}
            </Button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default OrderDetails;
