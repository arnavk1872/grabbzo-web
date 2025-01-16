"use client";
import React from "react";
import Image from "next/image";
import logo from "public/grabbzo.png";
import background from "public/Pancake.png";

const ComingSoon = () => {
  return (
    <div className="overflow-x-hidden">
      <div className="w-full bg-white">
        <Image
          src={logo}
          width={100}
          height={70}
          alt={"logo"}
          className="flex items-center h-[92px] w-[120px] justify-center -mt-2  ml-6"
        />
      </div>

      <div className="relative w-[100vw] h-[100vh]">
        <Image
          src={background}
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          alt="background"
        />

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
