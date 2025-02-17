"use client"
import React from "react";
import dynamic from "next/dynamic";
const SalesGraph= dynamic(()=>import ("../Icons/SalesGraph"),{ssr:false});



const SalesOverview = () => {
  return (
    <div className="bg-white  border border-borderColor mx-4 font-poppins  rounded-[30px] max-w-[750px] flex-[2]">
      <div className="flex justify-between items-center mb-4 pt-6 pb-2 px-6">
        <h2 className="font-semibold text-[18px]">Sales Overview</h2>
        <select className="bg-borderColor border-borderColor rounded-[16px] p-1 text-[14px]">
          <option>Yearly</option>
          <option>Monthly</option>
        </select>
      </div>
      <div className="text-gray-700 mb-4 flex justify-around">
        <p className="flex flex-col  border-r-2 border-borderColor pr-4">
          <span className="text-[14px]">Revenue:</span>{" "}
          <span className="text-[24px] font-bold">
            ₹0 <span className="text-LightGreen text-[16px]">↑ 0%</span>
          </span>
        </p>
        <p className="flex flex-col border-r-2 border-borderColor pr-4">
        <span className="text-[14px]">Total Sales:</span>{" "}
          <span className="text-[24px] font-bold">
            ₹0 <span className="text-Red text-[16px]"> ↓ 0%</span>
          </span>
        </p>
        <p className="flex flex-col ">
        <span className="text-[14px]"> Refunded:</span>{" "}
          <span className="text-[24px] font-bold">
            ₹0 <span className="text-LightGreen text-[16px]">↑ 0%</span>
          </span>
        </p>
      </div>
      <SalesGraph />
    </div>
  );
};

export default SalesOverview;
