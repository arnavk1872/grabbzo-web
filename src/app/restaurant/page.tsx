import InputBox from "@/components/login/InputBox";
import Image from "next/image";
import React from "react";
import logo from "public/logo-white.png";
import PartnerBox from "@/components/login/PartnerBox";
import WhyGrabbzo from "@/components/login/WhyGrabbzo";
import Faq from "@/components/login/Faq";
import { S3_BASE_URL } from "@/lib/constants";

const page = () => {
  return (
    <div className="font-poppins">
      <div className="relative">
        <Image
         //Height and width in these specify how clear they look
          src={`${S3_BASE_URL}/public/home-main.png`}
          width={1000}
          height={1000}
          alt={"home-main"}
          className="h-[80vh] w-full object-cover"
        />
        <Image
          src={logo}
          alt={"logo"}
          width={1000}
          height={1000}
          className="absolute left-1/2 top-[20%] transform -translate-x-1/2 -translate-y-1/2 w-[26rem] h-[9rem]"
        />
        <InputBox />
      </div>
      <div className="flex justify-center relative">
        <Image
         width={10000}
         height={1000}
         src={`${S3_BASE_URL}/public/home-footer.png`}
          alt={"home-footer"}
          className="h-[45vh] object-cover"
        />
        <div>
          <PartnerBox />
        </div>
      </div>
      <WhyGrabbzo />
      <div className="px-16 mb-10">
        <div className="w-full bg-gradient-to-r from-[#6793DA] via-blue-300 to-[#D4DFFF] p-8 mx-auto rounded-3xl">
          <Faq />
        </div>
      </div>
    </div>
  );
};

export default page;
