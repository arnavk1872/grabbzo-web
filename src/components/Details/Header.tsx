import React from "react";
import Image from "next/image";
import logo from "public/Logo.jpg";
import Link from "next/link";

const Header = () => {
  return (
    <div className="px-24 h-[68px] font-poppins bg-white flex-shrink-0 blur-0 mb-24 overflow-hidden sticky top-0 z-20">
      <Link href={"/login"}>
        <Image
          src={logo}
          width={143}
          height={60}
          alt={"logo"}
          className="flex items-center justify-center cursor-pointer"
        />
      </Link>
    </div>
  );
};

export default Header;
