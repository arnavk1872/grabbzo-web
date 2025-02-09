import React from "react";
import OrderHistoryImage from "public/OrderHistoryImage.png";
import Image from "next/image";

const NoDetailsPage = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Image src={OrderHistoryImage} alt="OrderHistoryImage" />
      <p className="text-blue-600 text-lg">View Order History Here</p>
    </div>
  );
};

export default NoDetailsPage;
