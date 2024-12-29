import React from "react";
import Image from "next/image";

const ComingSoon = () => {
  return (
   <div className="overflow-x-hidden">
        <div className="w-full bg-white">
          <Image
            src={"/Logo.jpg"}
            width={143}
            height={70}
            alt={"logo"}
            className="flex items-center justify-center pb-2 ml-6"
          />
        </div>
        <div
          className="relative w-[100vw] h-[100vh]"
          style={{
            backgroundImage: "url('/Pancake.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute font-poppins 2xl:top-1/4 top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-md w-1/3">
            <h1 className="text-[60px] font-extrabold mb-4">
              We Know You’re Hungry
            </h1>
            <p className="mb-4 text-gray-600 text-xl">
              Don’t worry! We’ll open soon for takeaway and pre-dining.
            </p>
          </div>
        </div>
      </div>
  );
};

export default ComingSoon;
