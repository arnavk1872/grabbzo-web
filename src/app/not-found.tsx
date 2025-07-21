"use client";
import Center from "@/components/Icons/Center";
import Four from "@/components/Icons/Four";
import Image from "next/image";
import BackToHome from "@/components/BackToHome";
import { S3_BASE_URL } from "@/lib/constants";
import Header from "@/components/Details/Header";

export default function Custom404() {
  return (
    <div>
      <Header />
      <div className="flex items-center justify-center mt-28 relative">
        <Four />
        <div className="relative">
          <Center />

          <Image
            src={`${S3_BASE_URL}/public/pizza.png`}
            height={500}
            width={500}
            alt="not found image"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>
        <Four />
      </div>
      <div className="flex items-center justify-center text-[64px] text-[#29246B] font-semibold">
        PAGE NOT FOUND
      </div>
      <div className="flex items-center justify-center text-[20px] text-center">
        This page seems to be missing, perhaps it's <br /> time to go back home.
      </div>
      <div className="flex justify-center text-center">
        <BackToHome />
      </div>
    </div>
  );
}
