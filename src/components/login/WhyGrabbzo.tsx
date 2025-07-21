import React from "react";
import { Cards } from "./data";

const WhyGrabbzo = () => {
  return (
    <div className="px-4 sm:px-8 md:px-16 py-12">
      {/* Heading */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-7 mb-10 text-center">
        <div className="h-[1px] w-12 mt-6 sm:w-16 bg-black"></div>
        <h2 className="text-2xl sm:text-3xl font-bold max-sm:mt-10 mt-6">
          Why You Should Partner With Grabbzo
        </h2>
        <div className="h-[1px] w-12 mt-6 sm:w-16 bg-black"></div>
      </div>

      {/* Cards */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-y-12 md:gap-x-14">
        {Cards.map((item, key) => (
          <div
            key={key}
            className="flex flex-col items-center justify-center w-full max-w-xs text-center"
          >
            <item.icon className="w-16 h-16" />
            <h6 className="font-semibold text-lg sm:text-xl mt-6">
              {item.title}
            </h6>
            <p className="text-sm sm:text-base mt-2 text-gray-700 px-2">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyGrabbzo;
