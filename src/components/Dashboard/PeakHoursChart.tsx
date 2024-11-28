"use client";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const data = [
  { hour: "10:00", current: 30, lastDay: 20 },
  { hour: "11:00", current: 50, lastDay: 35 },
  { hour: "12:00", current: 60, lastDay: 45 },
  { hour: "13:00", current: 80, lastDay: 70 },
  { hour: "14:00", current: 75, lastDay: 65 },
  { hour: "15:00", current: 90, lastDay: 85 },
  { hour: "16:00", current: 70, lastDay: 55 },
];

const PeakHoursChart: React.FC = () => {
  return (
    <div className="bg-white rounded-[30px] border border-borderColor p-6 max-w-[752px] flex-[2]">
      <div className="flex  justify-between lg:px-4 items-center mb-4">
        {" "}
        <h3 className="text-xl font-semibold">Peak Hours</h3>
        <select className="bg-borderColor font-poppins text-[#666] font-[14px] border-borderColor rounded-[16px] p-1 text-[14px]">
          <option>Last 12h</option>
          <option>Last 24h</option>
          <option>Last 48h</option>
        </select>
      </div>

      <BarChart width={700} height={300} data={data}>
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="hour" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="current" fill="#FF5A1F" name="Current" />
        <Bar dataKey="lastDay" fill="#FFCA28" name="Last Day" />
      </BarChart>
    </div>
  );
};

export default PeakHoursChart;
