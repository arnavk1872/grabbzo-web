import React from "react";
import PhoneIcon from "../Icons/PhoneIcon";

const CustomerDetails = () => {
  return (
    <div className="flex flex-col items-center justify-center w-1/2">
      <div className="bg-white border rounded-[40px] flex flex-col items-center w-full ">
        <h1 className="font-poppins font-bold text-[22px] mt-4">Harsh Ghai</h1>
        <div className="my-2 text-[#1663DE] border border-[#1663DE] bg-[#d0e0f8] rounded-[16px] font-semibold font-poppins px-2 py-1">
          Customer
        </div>

        <div className="w-full">
          <div className="bg-[#3F4354] w-full rounded-t-[16px] p-4">
            <h2 className="text-white font-poppins text-[22px] font-semibold mb-2">
              Order Note
            </h2>
            <p className="text-white font-poppins text-[12px] text-left">
              Order ka note
            </p>
          </div>

          <div className="bg-[#FF704D] rounded-b-[30px] p-4">
            <h2 className="text-white font-poppins text-[22px] font-semibold mb-2 text-center">
              Customer Arriving Time
            </h2>
            <p className="text-center text-white font-poppins font-bold">
              12:22AM
            </p>
          </div>
        </div>
      </div>
      <div className="border border-borderColor rounded-[24px] w-full my-4 bg-white flex gap-x-4 items-center justify-center py-4">
        <div className="border border-borderColor rounded-full bg-[#1663DE] p-2 ">
          <PhoneIcon />
        </div>
        <div>
          <span className="font-poppins text-[20px] font-semibold">
            Phone Number
          </span>
          <div className="font-poppins text-[14px]">+91 9879385252</div>
        </div>
      </div>
      <div className="border border-borderColor rounded-[24px] w-full  bg-white flex gap-x-4 items-center justify-center py-4">
        <span className="text-[36px] font-poppins font-bold">5:44</span>
      </div>
    </div>
  );
};

export default CustomerDetails;
