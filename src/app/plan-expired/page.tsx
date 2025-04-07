
import { S3_BASE_URL } from "@/lib/constants";
import React from "react";
import Image from "next/image";
import Header from "@/components/Details/Header";
import GoToPricing from "@/components/GoToPricing";

const page = () => {
  return (
    <div className="bg-white h-screen">
      <Header/>
      <div className="flex items-center flex-col justify-center font-poppins -mt-6 ">
        {" "}
        <Image
          src={`${S3_BASE_URL}/public/plan_expired.jpeg`}
          height={400}
          width={450}
          alt="No ready Orders"
        />
        <div className="flex flex-col text-center justify-center items-center">
          <div className="text-[#29246B] text-[40px] font-extrabold mt-6">Plan Expired !</div>{" "}
          <div className="my-2">
            {" "}
            Don't miss out on seamless service. Renew your plan to continue enjoying all the benefits.
          </div>
          <GoToPricing/>
        </div>
      </div>
    </div>
  );
};

export default page;
