import Faq from "@/components/login/Faq";
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
      <div className="w-3/4 m-4 font-poppins bg-gradient-to-r from-[#6793DA] via-blue-300 to-[#D4DFFF] p-8 mx-auto rounded-3xl">
          <Faq />
        </div>
    </div>
  );
};

export default page;
