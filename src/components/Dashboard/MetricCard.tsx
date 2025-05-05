"use client";
import React from "react";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface MetricCardProps {
  title: string;
  value: string;
  percentage: string;
  stroke: string;
}

const data = [
  { month: "Jan", income: 0, expenses: 2400 },
  { month: "Feb", income: 0, expenses: 3000 },
  { month: "Mar", income: 0, expenses: 3100 },
  { month: "Apr", income: 0, expenses: 3200 },
  { month: "May", income: 0, expenses: 3500 },
  { month: "Jun", income: 0, expenses: 4000 },
  { month: "Jul", income: 0, expenses: 4200 },
  { month: "Aug", income: 0, expenses: 4300 },
  { month: "Sep", income: 0, expenses: 4500 },
  { month: "Oct", income: 0, expenses: 4700 },
  { month: "Nov", income: 0, expenses: 4900 },
  { month: "Dec", income: 0, expenses: 5200 },
];

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  percentage,
  stroke,
}) => {
  return (
    <div className="bg-white rounded-[24px] shadow-md text-center flex-[1] font-poppins">
      <h4 className="text-gray-600 text-start py-6 px-3 text-[16px] font-semibold">
        {title}
      </h4>

      <div className="border border-borderColor rounded-[24px] bg-borderColor pt-4 px-4 pb-2">
        <ResponsiveContainer width="100%" height={150}>
          <LineChart data={data} margin={{ right: 20, left: 20 }}>
            {/* XAxis with hidden labels by default */}
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: "#888" }}
              axisLine={false}
              tickLine={false}
              interval={0}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" // Hide on default, show on hover
            />
            <YAxis hide />
            <CartesianGrid stroke="#f5f5f5" vertical={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #cccccc",
                borderRadius: "8px",
              }}
              formatter={(value: any, name: string) =>
                name === "income"
                  ? [`${value.toLocaleString()}`, "Income"]
                  : [`${value.toLocaleString()}`, "Expenses"]
              }
              labelFormatter={(label: string) => `Month: ${label}`}
            />
            <Line
              type="monotone"
              dataKey="income"
              stroke={stroke}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex justify-between items-center p-4">
          <div className="text-start px-4">
            <p className="font-semibold text-[22px]">{value}</p>
            <p className="font-bold text-[14px]">{title}</p>
          </div>
          <p className="text-[#00C17C] border border-LightGreen rounded-[12px] text-[14px] p-[2px] bg-[#d7eae8]">
            {percentage}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
