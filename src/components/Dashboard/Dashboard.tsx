"use client" 
import React from "react";
import Feedback from "@/components/Dashboard/Feedback";
import dynamic from "next/dynamic";
import RecentOrders from "@/components/Dashboard/RecentOrders";
import SalesOverview from "@/components/Dashboard/SalesOverview";

const EarningGraph= dynamic(()=>import ("@/components/Dashboard/EarningGraph"),{ssr:false});
const PeakHoursChart= dynamic(()=>import ("@/components/Dashboard/PeakHoursChart"),{ssr:false});
const MetricCard= dynamic(()=>import ("@/components/Dashboard/MetricCard"),{ssr:false});

const Dashboard = () => {
  return (
    <section className="w-full overflow-hidden">
    <div className="flex">
      {" "}
      <SalesOverview />
      <Feedback />
    </div>
    <div className="flex p-4 justify-between ">
      {" "}
      <div className="flex p-4 gap-x-4 w-1/2 justify-center items-center">
        <MetricCard
          title="Customers"
          value="724,928"
          percentage="+12%"
          stroke="#FF6961"
        />
        <MetricCard
          title="Customer Growth"
          value="834,257"
          percentage="+17%"
          stroke="#FC0"
        />
      </div>
      <EarningGraph />
    </div>
    <div className="flex  pb-4 pl-4 gap-x-4">
      {" "}
      <PeakHoursChart />
      <RecentOrders />
    </div>
  </section>
  )
}

export default Dashboard
