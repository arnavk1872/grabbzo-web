import React from "react";
import Image from "next/image";
import Link from "next/link";
import { S3_BASE_URL } from "@/lib/constants";

const Header = () => {
  return (
    <div className="px-24 h-[68px] font-poppins bg-white flex-shrink-0 blur-0 mb-24 overflow-hidden sticky top-0 z-20">
      <Link href={"/login"}>
        <Image
          src={`${S3_BASE_URL}/public/Grabbzo-main-logo.png`}
          width={150}
          style={{ objectFit: "cover", height: "60px" }} 
          height={60}
          alt={"logo"}
          className="flex items-center justify-center cursor-pointer"
        />
      </Link>
    </div>
  );
};

export default Header;
