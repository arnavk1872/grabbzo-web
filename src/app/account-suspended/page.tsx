"use client";
import { S3_BASE_URL } from "@/lib/constants";
import React from "react";
import Image from "next/image";
import Header from "@/components/Details/Header";
import { Button } from "@/components/UI/Button";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  return (
    <div className="bg-white h-screen">
      <Header />
      <div className="flex items-center flex-col justify-center font-poppins -mt-6 ">
        {" "}
        <Image
          src={`${S3_BASE_URL}/public/account-suspended.png`}
          height={300}
          width={200}
          alt="No ready Orders"
        />
        <div className="flex flex-col text-center justify-center items-center">
          <div className="text-[#29246B] text-[40px] font-extrabold mt-6">
            Account Suspended!
          </div>{" "}
          <div className="my-2 max-w-[1000px]">
            {" "}
            We've detected some unusual activity on your account and have
            temporarily suspended it as a precaution. If you believe this was an
            error, please contact our support team to review the issue and help
            you restore access.
          </div>
          <Button
            onClick={() => {
              router.push(
                `https://mail.google.com/mail/?view=cm&fs=1&to=support@grabbzo.com&su=Support%20Request&body=Hello%20Grabbzo%20Support%20Team`
              );
            }}
            className="text-white font-semibold text-[16px] px-8 py-6 mt-4"
          >
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
