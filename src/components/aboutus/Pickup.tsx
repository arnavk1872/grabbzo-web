import { S3_BASE_URL } from "@/lib/constants";
import React from "react";
import Image from "next/image";

const Pickup = () => {
  return (
    <div className="font-poppins">
      {/* Desktop & Tablet View */}
      <div className="hidden md:flex relative flex-col md:flex-row items-center md:items-start gap-6 p-6">
        <div className="w-2/3">
          <Image
            src={`${S3_BASE_URL}/public/takeaway_aboutus.png`}
            height={1000}
            width={1000}
            alt="home-main"
            className="w-full h-full pointer-events-none"
          />
        </div>

        <div className="absolute right-0 w-full top-8 md:w-1/2 bg-green-50 rounded-lg shadow-lg p-6 z-40 h-[350px]">
          <p className="text-gray-500 uppercase text-sm">Food Pickup</p>
          <h2 className="text-2xl font-semibold mt-2">
            Save money and Enjoy food at your convenience.
          </h2>
          <p className="text-gray-600 mt-2">
            Simply order, grab, and go—no more waiting in long queues in hot
            summers or for your food to be ready. Order food through grabbzo and
            save money by avoiding delivery costs, you can be sure that your
            food will be hot and fresh when you come and pick it up!
          </p>
        </div>
      </div>

      {/* Mobile View */}
      <div className="block md:hidden p-4">
        <div className="w-full relative">
          <Image
            src={`${S3_BASE_URL}/public/takeaway_aboutus.png`}
            height={500}
            width={500}
            alt="home-main"
            className="w-full h-[200px] object-contain rounded-md"
          />
        </div>

        <div className="bg-green-50 rounded-lg shadow-lg px-4 -mt-2">
          <p className="text-gray-500 uppercase text-sm pt-2">Food Pickup</p>
          <h2 className="text-xl font-semibold mt-2 ">
            Save money and Enjoy food at your convenience.
          </h2>
          <p className="text-gray-600 mt-2 text-sm py-4">
            Simply order, grab, and go—no more waiting in long queues in hot
            summers or for your food to be ready. Order food through grabbzo and
            save money by avoiding delivery costs. You can be sure your food will
            be hot and fresh when you come and pick it up!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pickup;
