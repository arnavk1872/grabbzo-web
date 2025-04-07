"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const data = [
  { hour: "10:00", current: 0, lastDay: 0 },
  { hour: "11:00", current: 0, lastDay: 0 },
  { hour: "12:00", current: 0, lastDay: 0 },
  { hour: "13:00", current: 0, lastDay: 0 },
  { hour: "14:00", current: 0, lastDay: 0 },
  { hour: "15:00", current: 0, lastDay: 0 },
  { hour: "16:00", current: 0, lastDay: 0 },
];

interface PeakHoursChartProps {
  planDetails: {
    Plan: string;
    [key: string]: any; 
  };
}

const PeakHoursChart: React.FC<PeakHoursChartProps> = ({planDetails}) => {
  const router = useRouter();
  const unlockedPlans = ["GOLD","PLATINUM", "DIAMOND"];
  const shouldBlur = !unlockedPlans.includes(planDetails?.Plan?.toUpperCase());

  return (
    <div className="relative bg-white rounded-[30px] font-poppins border border-borderColor p-6 max-w-[702px] flex-[2]">
      <div className="flex justify-between lg:px-4 items-center mb-4">
        <h3 className="text-xl font-semibold">Peak Hours</h3>
        <select className="bg-borderColor font-poppins text-[#666] font-[14px] border-borderColor rounded-[16px] p-1 text-[14px]">
          <option>Last 12h</option>
          <option>Last 24h</option>
          <option>Last 48h</option>
        </select>
      </div>

      {/* Chart Wrapper */}
      <div className="relative">
        <div
          className={`transition-all duration-300 ${
            shouldBlur ? "backdrop-blur-md opacity-50 pointer-events-none" : ""
          }`}
        >
          <BarChart width={650} height={300} data={data}>
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="current" fill="#FF5A1F" name="Current" />
            <Bar dataKey="lastDay" fill="#FFCA28" name="Last Day" />
          </BarChart>
        </div>

        {/* Upgrade Plan Overlay */}
        {shouldBlur && (
          <div className="absolute font-poppins inset-0 flex flex-col items-center justify-center bg-white bg-opacity-80 rounded-[30px]">
            <p className="text-lg font-semibold text-gray-800 mb-2">
              Upgrade to <span className="text-yellow-500">GOLD</span> to unlock detailed insights
            </p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer font-medium hover:bg-blue-700 transition" onClick={()=>{router.push('/pricing')}}>
              Upgrade Plan
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PeakHoursChart;
