import Image from "next/image";
import React from "react";
import Logo from "public/grabbzo.png";
import { Button } from "./UI/Button";

const DownloadApp = () => {
  return (
    <div className="flex justify-center items-center flex-col h-screen bg-[rgb(222,235,223)] mb-[20px] ">
      <Image src={Logo} height={200} width={200} alt="Logo" className="-mt-10" />
      <div className="text-center font-poppins w-2/3 break-words mb-6 font-semibold ">
        Our app is perfect for portable screens. Takeaway or dine-in with just
        a few taps. Download the app today!
      </div>
      <Button className="bg-[#388E3C] hover font-poppins text-white" variant={"outline"}>Get the App!</Button>
    </div>
  );
};

export default DownloadApp;