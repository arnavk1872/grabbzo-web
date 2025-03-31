"use client"
import React from "react";
import NotFoundArrow from "@/components/Icons/NotFoundArrow";
import { useRouter } from "next/navigation";

const BackToLogin = () => {
  const router = useRouter();

  const goHome = () => {
    router.push("/restaurant");
  };

  return (
    <div
      className="flex items-center justify-center my-6 gap-x-4 bg-[#d4f1ff] rounded-full px-4 py-2 w-fit border border-[#29246B] cursor-pointer"
      onClick={goHome}
    >
      <span className="font-semibold block text-[24px]   text-[#29246B]">
        BACK TO LOGIN{" "}
      </span>
      <div className="bg-[#29246B] rounded-full p-4 ">
        <NotFoundArrow />
      </div>
    </div>
  );
};

export default BackToLogin;
