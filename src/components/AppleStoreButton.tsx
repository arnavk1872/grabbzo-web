"use client";

import Image from "next/image";
import Link from "next/link";
import { S3_BASE_URL } from "@/lib/constants";

const AppleStoreButton = () => {
  return (
    <Link 
      href="https://apps.apple.com/ca/app/grabbzo/id6748091093"
      target="_blank"
      className="cursor-pointer transform hover:scale-105 transition-transform duration-200 mt-[10px]"
    >
      <Image
        src={`${S3_BASE_URL}/public/app_store.png`}
        height={145}
        width={145}
        alt="Download Grabbzo on the App Store"
      />
    </Link>
  );
};

export default AppleStoreButton; 