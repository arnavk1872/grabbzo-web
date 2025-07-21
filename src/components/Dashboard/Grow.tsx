import React from "react";
import { Button } from "../UI/Button";
import Link from "next/link";
import Image from "next/image";
import { S3_BASE_URL } from "@/lib/constants";

const Grow = () => {
  return (
    <div className="bg-white rounded-[30px] p-6 shadow-md h-[350px] md:w-[48%] font-poppins">
        <div className="font-semibold text-[18px]">Grow</div>
      <span className="text-[12px]">CHOOSE HOW TO GROW YOUR BUSINESS</span>
      <div
        className="bg-blue-600 text-white rounded-3xl pb-2 shadow-md p-6 flex flex-col justify-between min-h-[240px] my-4"
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
            <Button className="bg-white text-blue-600 hover:bg-blue-100 mt-20 px-6">
              Explore now
            </Button>
          </Link>
          <Image
            src={`${S3_BASE_URL}/public/growth_dashboard.png`}
            height={180}
            width={132}
            alt="Growth Illustration"
          />
        </div>
      </div>
    </div>
  );
};

export default Grow;
