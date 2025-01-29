import InputBox from "@/components/login/InputBox";
import Image from "next/image";
import React from "react";
import homeImage from "public/home-main.png";
import logo from "public/logo-white.png";
import homeFooterImage from "public/home-footer.png";

const page = () => {
  return (
    <div>
      <div className="relative">
        <Image
          src={homeImage}
          width={1920}
          height={774}
          alt={"home-main"}
          className="h-[72vh] object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[790px] text-center flex items-center flex-col gap-5">
            <Image
              src={logo}
              width={194}
              height={68}
              alt={"logo"}
              className=""
            />
            <h2 className="text-white text-[64px] font-black font-poppins leading-tight tracking-tight">
              Want to Grow your Business? Join Grabbzo!
            </h2>
            <div className="relative flex items-center justify-center">
              <div className="relative">
                <div className="w-48 h-1.5 bg-[#b3b3b3] rounded-md" />
                <div className="absolute w-20 h-1.5 bg-white rounded-md left-0 top-0" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center relative">
        <InputBox />
        <Image
          src={homeFooterImage}
          width={1920}
          height={296}
          alt={"home-footer"}
          className="h-[28vh] object-cover"
        />
      </div>
    </div>
  );
};

export default page;
