import Header from "@/components/Details/Header";
import Franchise from "@/components/Franchise/isFranchise";
import React from "react";

const page = () => {
  return (
    <div>
      <Header />
      <h1 className="hidden">Franchise Page</h1>
      <Franchise />
    </div>
  );
};

export default page;
