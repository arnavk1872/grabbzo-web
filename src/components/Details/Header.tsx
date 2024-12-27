import React from "react";
import Image from "next/image";


const Header = () => {
  return (
    <div className="px-24 h-[68px] font-poppins bg-white flex-shrink-0 blur-0 mb-24 overflow-hidden">
        <Image
          src={"/logo.jpg"}
          width={143}
          height={60}
          alt={"logo"}
          className="flex items-center justify-center cursor-pointer"
        />
    </div>
  );
};

export default Header;
