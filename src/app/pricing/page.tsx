import Header from "@/components/Details/Header";
import Crown from "@/components/Icons/Crown";
import CrownMobile from "@/components/Icons/CrownMobile";
import Faq from "@/components/login/Faq";
import CompareFeatures from "@/components/Pricing/CompareFeatures";
import FeatureSection from "@/components/Pricing/FeatureSection";
import PricingPlans from "@/components/Pricing/PricingPlans";
import React from "react";

const Page = () => {
  return (
    <div className=" pb-10">
      <Header/>
      <h1 className="hidden">Pricing Page</h1>
      {/* <Header /> */}
      <div className="flex flex-col -mt-8 items-center justify-center my-8 font-poppins text-center relative pt-24">
        
        <div className="relative">
          <Crown className="absolute -top-28 -left-28 rotate-[-20deg] max-sm:hidden" />
          <CrownMobile className="absolute -top-14 -left-8 rotate-[-20deg] sm:hidden block"/>
          <span className="text-[34px] sm:text-[48px] font-semibold pl-4">
            See Grabbzo Plans
          </span>
        </div>
        <div className="mt-2 max-sm:text-[14px] max-sm:w-[330px]">
          Choose the plan that best fits your needs and enjoy seamless dining
          experiences with <br /> Grabbzo’s affordable and flexible pricing
          options.
        </div>
      </div>
      <FeatureSection />
      <div className="font-poppins text-center font-semibold text-[32px] sm:text-[48px] my-8">
        Pick a plan to enjoy premium features
      </div>
      <PricingPlans />
      <CompareFeatures />
      <Faq />
    </div>
  );
};

export default Page;
