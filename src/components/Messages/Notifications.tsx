"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Notifications = () => {
  const router = useRouter();

  const openMessages = () => {
    router.push("/dashboard/messages");
  };
  return (
    <div>
      <div
        className="cursor-pointer w-full font-semibold font-poppins"
        onClick={openMessages}
      >
        SHOW ALL NOTIFICATIONS
      </div>
    </div>
  );
};

export default Notifications;
