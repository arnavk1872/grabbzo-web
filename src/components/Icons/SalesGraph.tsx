"use client";
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// const data = [
//   { name: 'Page A', Sales: 4000, Revenue: 2400, amt: 2400 },
//   { name: 'Page B', Sales: 3000, Revenue: 1398, amt: 2210 },
//   { name: 'Page C', Sales: 2000, Revenue: 9800, amt: 2290 },
//   { name: 'Page D', Sales: 2780, Revenue: 3908, amt: 2000 },
//   { name: 'Page E', Sales: 1890, Revenue: 4800, amt: 2181 },
//   { name: 'Page F', Sales: 2390, Revenue: 3800, amt: 2500 },
//   { name: 'Page G', Sales: 3490, Revenue: 4300, amt: 2100 },
// ];

const data = [
  { name: 'January', Sales: 0, Revenue: 0, amt: 0 },
  { name: 'February', Sales: 0, Revenue: 0, amt: 0 },
  { name: 'March', Sales: 0, Revenue: 0, amt: 0 },
  { name: 'April', Sales: 0, Revenue: 0, amt: 0 },
  { name: 'May', Sales: 0, Revenue: 0, amt: 0 },
  { name: 'June', Sales: 0, Revenue: 0, amt: 0 },
  { name: 'July', Sales: 0, Revenue: 0, amt: 0 },
];


const SalesGraph = () => {
  return (
    <div style={{ width: "full", height: 300 }} className='max-w-[800px] px-4 py-4 border border-borderColor bg-borderColor rounded-[30px]  '>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="natural" dataKey="Revenue" stroke="#FFCC00" activeDot={{ r: 8 }} />
          <Line type="natural" dataKey="Sales" stroke="#FF6961" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesGraph;
