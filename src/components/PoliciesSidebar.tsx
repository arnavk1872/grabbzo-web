"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const PoliciesSidebar = () => {
  const pathname = usePathname();
  const lastSegment: string = pathname.split("/").pop() as string;
  const currentPath = "/policies/" + lastSegment;
  const policies: any[] = [
    {
      name: "Guidelines and Policy",
      url: "/policies/guidelines-and-policy",
    },
    {
      name: "Privacy Policy",
      url: "/policies/privacy",
    },
    {
      name: "Channel Partner Agreement",
      url: "/policies/channel-partner",
    },
    {
      name: "Terms of Services",
      url: "/policies/terms-of-service",
    },
    {
      name: "Cancellation and Refund Policy",
      url: "/policies/cancellation-and-refund",
    },
  ];
  return (
    <div className="min-w-fit -mt-20 sticky top-24 min-h-screen max-h-screen bg-white sm:block hidden">
      {policies.map((policy, key) => (
        <Link className="text-[18px] w-full" href={policy.url} key={key}>
          <div
            className={` min-w-full hover:bg-green-800 hover:text-white py-4 px-4 ${
              currentPath == policy.url
                ? "bg-green-600 text-white"
                : "bg-white text-black"
            }`}
          >
            {policy.name}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PoliciesSidebar;
