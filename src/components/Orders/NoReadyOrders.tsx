import React from "react";
import Image from "next/image";
import orderReady from "public/order-ready.png";

const NoReadyOrders = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-[500px]">
        <Image
          src={orderReady}
          height={200}
          width={200}
          alt="No ready Orders"
        />
        <div className="font-poppins">No Orders Ready!</div>
      </div>
    </div>
  );
};

export default NoReadyOrders;
