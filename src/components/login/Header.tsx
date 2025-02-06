import React from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <div className="px-24 h-[68px] font-poppins bg-white flex-shrink-0 flex justify-between overflow-hidden">
      <Link href="/">
        <Image
          src={"/Logo.jpg"}
          width={143}
          height={60}
          alt={"logo"}
          className="flex items-center justify-center cursor-pointer"
        />
      </Link>
      <div className="flex gap-10">
        <Link
          href="/about"
          className="text-black text-lg my-auto font-semibold hover:underline duration-300 hover:duration-300"
        >
          About Us
        </Link>
        <Link
          href="/pricing"
          className="text-black text-lg my-auto font-semibold hover:underline duration-300 hover:duration-300"
        >
          Pricing
        </Link>
      </div>
    </div>
  );
};

export default Header;
