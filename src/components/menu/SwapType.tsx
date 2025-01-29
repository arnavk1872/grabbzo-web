"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const SwapType = () => {
  const [activeIndex, setActiveIndex] = useState<string>("availableItems"); 
  const router = useRouter();

  const options = [
    { label: 'Menu Overview', value: 'availableItems' },
    { label: 'Menu Editor', value: 'editor' },
  ];

  const handleClick = (value: string) => {
    setActiveIndex(value);
    router.push(`/dashboard/menus/${value}`);
  };

  return (
    <div className="flex bg-white rounded-full whitespace-nowrap border border-borderColor p-2 gap-x-4 font-poppins max-w-[375px]">
      {options.map(({ label, value }) => (
        <div
          key={value}
          onClick={() => handleClick(value)}
          className={`cursor-pointer  rounded-full py-4 px-8 ${
            activeIndex === value ? 'bg-blue-500 text-white' : ''
          }`}
        >
          {label}
        </div>
      ))}
    </div>
  );
};

export default SwapType;
