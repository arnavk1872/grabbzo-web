import Link from "next/link";
import React from "react";

const PoliciesSidebar = () => {
  const policies: any[] = [
    {
      name: "Guidelines and Policy",
      url: "/guidelines-and-policy",
    },
    {
      name: "Privacy Policy",
      url: "/privacy-policy",
    },
    {
      name: "Channel Partner Agreement",
      url: "/channel-partner-agreement",
    },
    {
      name: "Terms of Services",
      url: "/terms-of-services",
    },
    {
      name: "Cancellation and Refund Policy",
      url: "/cancellation-and-refund-policy",
    },
  ];
  return (
    <div className="min-w-fit -mt-20">
      {policies.map((policy, key) => (
        <Link className="text-lg w-full" href={policy.url} key={key}>
          <div className="bg-white min-w-full hover:bg-black hover:text-white py-4 px-4">
            {policy.name}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PoliciesSidebar;
