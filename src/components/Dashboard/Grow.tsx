import React from "react";
import { Button } from "../UI/Button";
import Link from "next/link";

const Grow = () => {
  return (
    <div className="bg-white rounded-[30px] p-6 shadow-md h-[350px] w-[48%] font-poppins">
      <div className="font-semibold">Grow</div>
      <span className="text-[12px]">CHOOSE HOW TO GROW YOUR BUSINESS</span>
      <div
        className="bg-blue-600 text-white rounded-lg shadow-md p-6 flex flex-col justify-between min-h-[240px] my-4"
        style={{
          background: "linear-gradient(282deg, #1AA1C7 0%, #0033A2 100%)",
        }}
      >
        <div>
          <h2 className="text-lg font-semibold">Offers and discounts</h2>
          <p className="text-sm mt-1 max-w-[350px]">
            Enable discounts, promote with ads, and expand your business.
          </p>
        </div>
        <div className="flex justify-between">
          <Link href="/growth">
            <Button className="bg-white text-blue-600 hover:bg-blue-100 mt-4 px-6">
              Explore now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Grow;
