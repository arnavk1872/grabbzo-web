import React from "react";
import Image from "next/image";
import { S3_BASE_URL } from "@/lib/constants";

const NoReadyOrders = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-[500px]">
        <Image
          src={`${S3_BASE_URL}/public/order-ready.png`}
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
