import React from "react";
import Image from "next/image";
import { S3_BASE_URL } from "@/lib/constants";

const NoPreparingOrders = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[500px]">
      <Image
        src={`${S3_BASE_URL}/public/preparing.png`}
        height={200}
        width={200}
        alt="No preparing Orders"
      />
      <div className="font-poppins">No Orders Being Prepared!</div>
    </div>
  );
};

export default NoPreparingOrders;
