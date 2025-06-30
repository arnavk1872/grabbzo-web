"use client"

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../Dashboard/Avatar";
import { usePageStore } from "@/store/CurrentPage";

const Withdraw = () => {

  const { walletDetails } = usePageStore();
  const restaurantName = walletDetails?.["Restaurant Name"];
  
  return (
    <div className=" sm:h-[150px] max-sm:py-4 bg-blue-300 rounded-md flex items-center px-6 my-2 w-full ">
    <div className="flex items-center pl-8">

        <Avatar className="h-28 w-28">
                <AvatarImage src="https://images.unsplash.com/photo-1512058564366-18510be2db19" />
                <AvatarFallback>TM</AvatarFallback>
              </Avatar>
    </div>
      <div className="flex flex-col text-white font-poppins justify-center  px-12">
        <div className="text-[18px] font-semibold">{restaurantName}</div>
        <div className="text-[12px] pt-4">Total Balance</div>
        <div className="text-[28px]">₹{walletDetails?.Wallet}</div>
      </div>
    </div>
  );
};

export default Withdraw;
