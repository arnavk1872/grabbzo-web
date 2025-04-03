import Header from "@/components/Details/Header";
import Crown from "@/components/Icons/Crown";
import Faq from "@/components/login/Faq";
import CompareFeatures from "@/components/Pricing/CompareFeatures";
import FeatureSection from "@/components/Pricing/FeatureSection";
import PricingPlans from "@/components/Pricing/PricingPlans";
import React from "react";

const Page = () => {
  return (
    <div className=" pb-10">
      {/* <Header /> */}
      <div className="flex flex-col items-center justify-center my-8 font-poppins text-center relative pt-24">
        <div className="relative">
          <Crown className="absolute -top-28 -left-28 rotate-[-20deg]" />
          <span className="text-[48px] font-extrabold pl-4">
            See Grabbzo Plans
          </span>
        </div>
        <div className="mt-2">
          Choose the plan that best fits your needs and enjoy seamless dining
          experiences with <br /> Grabbzo’s affordable and flexible pricing
          options.
        </div>
      </div>
      <FeatureSection />
      <div className="font-poppins text-center font-semibold text-[48px] my-8">
        Pick a plan to enjoy premium features
      </div>
      <PricingPlans />
      <CompareFeatures />
      <Faq />
    </div>
  );
};

export default Page;
