import React from "react";
import Image from "next/image";
import { S3_BASE_URL } from "@/lib/constants";

const NoDetailsPage = () => {
  return (
    <div className="flex flex-col justify-center items-center font-poppins">
      <Image  src={`${S3_BASE_URL}/public/OrderHistoryImage.png`} height={1000} width={300} alt="OrderHistoryImage" />
      <p className="text-blue-600 text-lg">View Order History Here</p>
    </div>
  );
};

export default NoDetailsPage;
