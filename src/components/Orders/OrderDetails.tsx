"use client";
import { useParams } from "next/navigation";

import React from "react";
import { Button } from "../UI/Button";

const OrderDetails = () => {
  const { slug } = useParams();
  console.log(slug, "123");

  return (
    <div className="w-full px-6">
      <section className="flex justify-between items-center w-full">
        <div className="font-poppins text-[44px] font-semibold text-[#1663DE]">
          ORDER ID #{slug}
        </div>
        <div className="px-12 flex gap-x-4">
          <Button
            variant={"outline"}
            className="bg-Red hover:bg-red-700 text-[18px] px-10 py-6 text-white"
          >
            Cancel
          </Button>
          <Button
            variant={"secondary"}
            className="bg-green-600 hover:bg-green-800 text-[18px] px-10 py-6 text-white"
          >
            Accept
          </Button>
        </div>
      </section>
    </div>
  );
};

export default OrderDetails;
