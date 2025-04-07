"use client";
import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const SalesGraph = dynamic(() => import("../Icons/SalesGraph"), { ssr: false });

interface SalesOverviewProps {
  planDetails: {
    Plan: string;
    [key: string]: any; 
  };
}

const SalesOverview: React.FC<SalesOverviewProps> = ({ planDetails }) => {

  const unlockedPlans = ["PLATINUM", "DIAMOND"];
  const shouldBlur = !unlockedPlans.includes(planDetails?.Plan?.toUpperCase());
  const router = useRouter();

  return (
    <div className="relative bg-white border border-borderColor mx-4 font-poppins rounded-[30px] max-w-[750px] flex-[2]">
      <div className="flex justify-between items-center mb-4 pt-6 pb-2 px-6">
        <h2 className="font-semibold text-[18px]">Sales Overview</h2>
        <select className="bg-borderColor border-borderColor rounded-[16px] p-1 text-[14px]">
          <option>Yearly</option>
          <option>Monthly</option>
        </select>
      </div>

      <div className="text-gray-700 mb-4 flex justify-around">
        <p className="flex flex-col border-r-2 border-borderColor pr-4">
          <span className="text-[14px]">Revenue:</span>
          <span className="text-[24px] font-bold">
            ₹0 <span className="text-LightGreen text-[16px]">↑ 0%</span>
          </span>
        </p>
        <p className="flex flex-col border-r-2 border-borderColor pr-4">
          <span className="text-[14px]">Total Sales:</span>
          <span className="text-[24px] font-bold">
            ₹0 <span className="text-Red text-[16px]">↓ 0%</span>
          </span>
        </p>
        <p className="flex flex-col">
          <span className="text-[14px]">Refunded:</span>
          <span className="text-[24px] font-bold">
            ₹0 <span className="text-LightGreen text-[16px]">↑ 0%</span>
          </span>
        </p>
      </div>

      <div className="relative">
        <div
          className={`transition-all duration-300 ${
            shouldBlur ? "backdrop-blur-md opacity-50 pointer-events-none" : ""
          }`}
        >
          <SalesGraph />
        </div>

        {shouldBlur && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-80 rounded-[30px]">
            <p className="text-lg font-semibold text-gray-800 mb-2">
              Upgrade to <span className="text-gray-400">DIAMOND </span> to unlock detailed insights
            </p>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
              onClick={() => router.push("/pricing")}
            >
              Upgrade Plan
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesOverview;
