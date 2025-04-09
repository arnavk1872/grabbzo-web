import { S3_BASE_URL } from "@/lib/constants";
import React from "react";
import Image from "next/image";

const Dining = () => {
  return (
    <div>
      <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6 p-6 font-poppins">
        <div className="w-2/3 ">
          <Image
            src={`${S3_BASE_URL}/public/dinein_aboutus.jpeg`}
            height={1000}
            width={1000}
            alt="home-main"
            priority
            className=" w-full h-full pointer-events-none"
          />
        </div>

        <div className=" absolute right-0 w-1/3 top-12 md:w-2/5 bg-green-50 rounded-lg shadow-lg p-6 z-40 h-[320px]">
          <p className="text-gray-500 uppercase text-sm">Pre Dine-In</p>
          <h2 className="text-2xl font-semibold mt-2">
            {" "}
            Reserve Your Table in Advance
          </h2>
          {/* <p className="text-green-600 font-medium mt-1">Ipsum ipsum</p> */}
          <p className="text-gray-600 mt-2">
            Lengthy and tiring wait periods for a table?Pre-book your table for
            on the Grabbzo's pre-dine-in service, which guarantees a hassle-free
            dining experience. Your table will be ready when you arrive, saving
            you time and improving the eating experience whether you're
            organizing a business meeting, a family outing, or a dinner date.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dining;
