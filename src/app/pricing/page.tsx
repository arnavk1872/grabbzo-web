import PricingPlans from "@/components/PricingPlans";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center my-8 font-poppins ">
        <span className="text-[48px] font-poppins font-extrabold ">
          See Grabbzo Plans
        </span>
        <div className="text-center">
          Choose the plan that best fits your needs and enjoy seamless dining
          experiences with<br/> Grabbzo’s affordable and flexible pricing options.
        </div>
      </div>
      <PricingPlans/>
      <div></div>
    </div>
  );
};

export default page;
