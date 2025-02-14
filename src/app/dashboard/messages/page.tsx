import MessageBox from "@/components/Messages/MessageBox";
import Sidebar from "@/components/Messages/Sidebar";
import React from "react";

const page = () => {
  return (
    <div className="flex justify-center w-full mt-80 font-poppins text-[24px]">
      <div className="flex">
        <Sidebar />
        <MessageBox />
      </div>{" "}
    </div>
  );
};

export default page;
