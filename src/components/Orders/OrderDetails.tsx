"use client";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { Button } from "../UI/Button";

const OrderDetails = () => {
  const { slug } = useParams();
  const [viewButton, setViewButton] = useState<"accept" | "preparing" | "ready">("accept");

  const buttonConfig = {
    accept: {
      buttons: [
        { text: "Cancel", className: "bg-red-600 hover:bg-red-700", onClick: () => {} },
        { text: "Accept", className: "bg-green-600 hover:bg-green-800", onClick: () => setViewButton("preparing") },
      ],
    },
    preparing: {
      buttons: [
        { text: "Ready", className: "bg-green-600 hover:bg-green-800", onClick: () => setViewButton("ready") },
      ],
    },
    ready: {
      buttons: [
        { text: "Picked Up", className: "bg-yellow-600 hover:bg-yellow-700", onClick: () => {} },
      ],
    },
  };

  return (
    <div className="w-full px-8">
      <section className="flex justify-between items-center w-full">
        <h1 className="font-poppins text-[44px] font-semibold text-[#1663DE]">ORDER ID #{slug}</h1>
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
