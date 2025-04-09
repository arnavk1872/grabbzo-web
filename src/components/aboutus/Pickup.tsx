import { S3_BASE_URL } from "@/lib/constants";
import React from "react";
import Image from "next/image";

const Pickup = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6 font-poppins">
        <div className="w-2/3 ">
          <Image
            src={`${S3_BASE_URL}/public/takeaway_aboutus.png`}
            height={1000}
            width={1000}
            alt="home-main"
            className="absolute inset-0 w-3/4 h-full pointer-events-none"
          />
        </div>

        <div className="w-full md:w-1/2 bg-green-50 rounded-lg shadow-lg p-6 z-40 h-[350px]">
          <p className="text-gray-500 uppercase text-sm">Food Pickup</p>
          <h2 className="text-2xl font-semibold mt-2">
            {" "}
            Save money and Enjoy food at your convenience.
          </h2>
          {/* <p className="text-green-600 font-medium mt-1">Ipsum ipsum</p> */}
          <p className="text-gray-600 mt-2">
            Simply order, grab, and go—no more waiting in long queues in hot
            summers or for your food to be ready. Order food through grabbzo and
            save money by avoiding delivery costs, you can be sure that your
            food will be hot and fresh when you come and pick it up!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pickup;
