import React from "react";
import { Cards } from "./data";

const WhyGrabbzo = () => {
  return (
    <div>
      <div className="flex items-center justify-center -mt-5 gap-7">
        <div className="h-[1px] w-16 bg-black"></div>
        <h2 className="text-3xl font-bold">Why You Should Partner With Grabbzo</h2>
        <div className="h-[1px] w-16 bg-black"></div>
      </div>
      <div className="flex justify-evenly items-center p-12 gap-x-14">
        {Cards.map((item, key) => (
          <div key={key} className="flex flex-col items-center  justify-center w-1/4">
            <item.icon />
            {/* <div className="border-l-2 w-[1px] h-16 border-dotted border-blue-600 my-3"></div> */}
            <h6 className="font-semibold text-[21px] text-center  mt-8 max-w-[250px]">{item.title}</h6>
            <p className="text-center w-[90%] mt-2 text-lg">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyGrabbzo;
