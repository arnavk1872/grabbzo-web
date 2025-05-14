import { S3_BASE_URL } from "@/lib/constants";
import React from "react";
import Image from "next/image";

const CarDelivery = () => {
  return (
    <div className="font-poppins">
      {/* Desktop & Tablet View */}
      <div className="hidden md:flex relative flex-col md:flex-row items-center md:items-start gap-6 p-6">
        <div className="w-2/3">
          <Image
            src={`${S3_BASE_URL}/public/Cardelivery_aboutus.jpeg`}
            height={1000}
            width={1000}
            alt="home-main"
            className="w-full h-full pointer-events-none"
          />
        </div>

        <div className="absolute right-0 w-1/3 top-12 md:w-2/5 bg-green-50 rounded-lg shadow-lg p-6 z-40 h-[320px]">
          <p className="text-gray-500 uppercase text-sm">Delivery in Car</p>
          <h2 className="text-2xl font-semibold mt-2">Get Your Order Brought to You</h2>
          <p className="text-gray-600 mt-2">
            In a rush and want your food to be delivered to your car? With Grabbzo’s car delivery service, simply place an order and have your meal delivered straight to your vehicle. Whether you’re in a hurry, have kids in the car, or just want a contactless experience, this option provides ultimate convenience without sacrificing quality.
          </p>
        </div>
      </div>

      {/* Mobile View */}
      <div className="block md:hidden p-4">
        <div className="w-full">
          <Image
            src={`${S3_BASE_URL}/public/Cardelivery_aboutus.jpeg`}
            height={500}
            width={500}
            alt="home-main"
            className="w-full h-[200px] object-cover rounded-md"
          />
        </div>

        <div className="bg-green-50 rounded-lg shadow-lg p-4">
          <p className="text-gray-500 uppercase text-sm">Delivery in Car</p>
          <h2 className="text-xl font-semibold mt-2">Get Your Order Brought to You</h2>
          <p className="text-gray-600 mt-2 text-sm py-4">
            In a rush and want your food to be delivered to your car? With Grabbzo’s car delivery service, simply place an order and have your meal delivered straight to your vehicle. Whether you’re in a hurry, have kids in the car, or just want a contactless experience, this option provides ultimate convenience without sacrificing quality.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarDelivery;
