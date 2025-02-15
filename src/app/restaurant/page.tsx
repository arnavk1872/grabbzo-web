import InputBox from "@/components/login/InputBox";
import Image from "next/image";
import React from "react";
import homeImage from "public/home-main.png";
import logo from "public/logo-white.png";
import homeFooterImage from "public/home-footer.png";
import PartnerBox from "@/components/login/PartnerBox";
import WhyGrabbzo from "@/components/login/WhyGrabbzo";
import Faq from "@/components/login/Faq";

const page = () => {
  return (
    <div className="font-poppins">
      <div className="relative">
        <Image
          src={homeImage}
          alt={"home-main"}
          className="h-[80vh] object-cover"
        />
        <Image
          src={logo}
          alt={"logo"}
          className="absolute left-1/2 top-[20%] transform -translate-x-1/2 -translate-y-1/2 w-[26rem] h-[9rem]"
        />
        <InputBox />
      </div>
      <div className="flex justify-center relative">
        <Image
          src={homeFooterImage}
          alt={"home-footer"}
          className="h-[45vh] object-cover"
        />
        <div>
          <PartnerBox />
        </div>
      </div>
      <WhyGrabbzo />
      <div className="px-16 mb-10">
        <div className="w-full bg-gradient-to-r from-blue-50 via-blue-200 to-blue-50 p-8 mx-auto rounded-3xl">
          <Faq />
        </div>
      </div>
    </div>
  );
};

export default page;
