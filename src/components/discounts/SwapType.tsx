"use client";

import { useRouter, usePathname } from "next/navigation";

const SwapType = () => {
  const router = useRouter();
  const pathname = usePathname();

  const options = [
    { label: "Create Offers", value: "discounts" },
    { label: "Track Offers", value: "track-discounts" },
  ];

  const activeIndex = pathname.split("/").pop() || "discounts";

  const handleClick = (value: string) => {
    router.push(`/growth/${value}`);
  };

  return (
    <div className="flex bg-white rounded-full whitespace-nowrap border border-borderColor p-2 gap-x-4 mt-4 font-poppins max-w-[375px]">
      {options.map(({ label, value }) => (
        <div
          key={value}
          onClick={() => handleClick(value)}
          className={`cursor-pointer rounded-full py-2 px-4 md:py-4 md:px-8 ${
            activeIndex === value ? "bg-blue-500 text-white" : ""
          }`}
        >
          {label}
        </div>
      ))}
    </div>
  );
};

export default SwapType;
