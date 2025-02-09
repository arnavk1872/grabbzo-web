import Image from "next/image";
import React from "react";
import Pancake from "@public/Pancake.png";

const Withdraw = () => {
  return (
    <div className=" h-[150px] bg-blue-300 rounded-md flex items-center px-6 my-2 w-full">
    <div className="flex items-center">
      <Image
        src={Pancake}
        alt="Temp Image"
        height={120}
        width={120}
        className="rounded-full object-cover"
      />
    </div>
      <div className="flex flex-col text-white font-poppins justify-center  px-12">
        <div className="text-[18px] font-semibold">Taj Mahal Hotel</div>
        <div className="text-[10px] pt-4">Total Balance</div>
        <div className="text-[28px]">₹0</div>
      </div>
    </div>
  );
};

export default Withdraw;
