"use client";

import { useRouter, usePathname } from "next/navigation";

const SwapType = () => {
  const router = useRouter();
  const pathname = usePathname();

  const options = [
    { label: "Menu Overview", value: "availableItems" },
    { label: "Menu Editor", value: "editor" },
  ];

  const activeIndex = pathname.split("/").pop() || "availableItems";

  const handleClick = (value: string) => {
    router.push(`/dashboard/menus/${value}`);
  };

  return (
    <div className="flex bg-white rounded-full whitespace-nowrap border border-borderColor p-2 gap-x-4 font-poppins max-w-[375px]">
      {options.map(({ label, value }) => (
        <div
          key={value}
          onClick={() => handleClick(value)}
          className={`cursor-pointer rounded-full py-4 px-8 ${
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
