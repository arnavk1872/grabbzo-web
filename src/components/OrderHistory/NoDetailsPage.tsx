import React from "react";
import Image from "next/image";
import { S3_BASE_URL } from "@/lib/constants";

const NoDetailsPage = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Image  src={`${S3_BASE_URL}/public/OrderHistoryImage.png`} alt="OrderHistoryImage" />
      <p className="text-blue-600 text-lg">View Order History Here</p>
    </div>
  );
};

export default NoDetailsPage;
