import Details from "@/components/OrderHistory/Details";
import Sidebar from "@/components/OrderHistory/Sidebar";
import React from "react";

const page = () => {
  return (
    <div className="flex mt-12">
      <Sidebar />
      <Details />
    </div>
  );
};

export default page;
