"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Notification from "./Notification";
import ArrowRight from "../Icons/ArrowRight";

const Notifications = () => {
  const router = useRouter();

  const openMessages = () => {
    router.push("/dashboard/messages");
  };
  return (
    <div className="bg-borderColor w-[480px] shadow-md">
      <div
        className="cursor-pointer w-full flex justify-between font-semibold font-poppins py-4 px-4 bg-white"
        onClick={openMessages}
      >
        SHOW ALL NOTIFICATIONS
        {/* <ArrowRight/> */}
      </div>
      <Notification/>
    </div>
  );
};

export default Notifications;
