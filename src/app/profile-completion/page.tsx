import { S3_BASE_URL } from "@/lib/constants";
import React from "react";
import Image from "next/image";
import BackToLogin from "@/components/BacktoLogin";
import Header from "@/components/Details/Header";

const page = () => {
  return (
    <div className="bg-white h-screen">
      <h1 className="hidden">Profile Completion Page</h1>
      <Header />
      <div className="flex items-center flex-col justify-center font-poppins -mt-24">
        {" "}
        <Image
          src={`${S3_BASE_URL}/public/profile-complete.png`}
          height={400}
          width={450}
          alt="No ready Orders"
        />
        <div className="flex flex-col text-center justify-center items-center">
          <div className="text-[#29246B] text-[40px] font-extrabold">
            Thank You
          </div>{" "}
          <div>
            {" "}
            We are reviewing your application and will get back to you within 24
            hours.
          </div>
          <BackToLogin />
        </div>
      </div>
    </div>
  );
};

export default page;
