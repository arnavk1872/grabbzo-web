import BlogPost from "@/components/aboutus/BlogPost";
import React from "react";
import Image from "next/image";
import { S3_BASE_URL } from "@/lib/constants";


const page = () => {
  return (
    <div>
      <div className="relative w-full h-[40vh] font-poppins">
        <Image
          src={`${S3_BASE_URL}/public/image.png`}
          fill
          alt="home-main"
          className="absolute inset-0 w-full h-full pointer-events-none"
        />
      </div>
      <BlogPost />
    </div>
  );
};

export default page;
