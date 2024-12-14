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
    <section className="lg:pr-6">
    <div className="flex gap-x-4">
      {" "}
      <SalesOverview />
      <Feedback />
    </div>
    <div className="flex py-4 gap-x-4 ">
      {" "}
      <div className="flex p-4 gap-x-4 w-1/2 justify-center items-center overflow-hidden">
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
    <div className="flex  pb-4 px-4 gap-x-4">
      {" "}
      <PeakHoursChart />
      <RecentOrders />
    </div>
  </section>
  )
}

export default Dashboard
