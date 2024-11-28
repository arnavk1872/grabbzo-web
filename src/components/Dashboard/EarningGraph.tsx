"use client";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { year: 2020, income: 37, expenses: 14 },
  { year: 2021, income: 45, expenses: 16 },
  { year: 2022, income: 50, expenses: 30 },
  { year: 2023, income: 70, expenses: 55 },
];

const EarningGraph: React.FC = () => {
  return (
    <div className="bg-white rounded-[30px] p-6 shadow-md h-[350px] w-1/2">
      <div className="flex  justify-between items-center mb-4 px-2"> <h3 className="text-xl font-semibold ">Earning Graph</h3>
      <select className="bg-borderColor font-poppins border-borderColor rounded-[16px] p-1 text-[14px]">
          <option>Yearly</option>
          <option>Monthly</option>
        </select></div>
     
      <div className="h-[250px]">
        {/* Use ResponsiveContainer to handle width automatically */}
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="green" stopOpacity={0.8} />
                <stop offset="95%" stopColor="green" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="red" stopOpacity={0.8} />
                <stop offset="95%" stopColor="red" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="year" />
            <Tooltip />
            <CartesianGrid stroke="#f5f5f5" />
            <Area
              type="monotone"
              dataKey="income"
              stroke="green"
              fillOpacity={1}
              fill="url(#colorIncome)"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="red"
              fillOpacity={1}
              fill="url(#colorExpenses)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EarningGraph;
