import Dashboard from "@/components/Dashboard/Dashboard";
import Image from "next/image";
import Illustration from "public/Dashboard.png";

const page = () => {
  return (
    <>
      {false ? (
        <div className="w-[100vw]  text-[30px] flex flex-col justify-center items-center font-poppins h-[100vh]">
          <Image src={Illustration} width={220} height={220} alt="Temporary Illustration"/>
          No data to display at the moment!
        </div>
      ) : (
        <Dashboard />
      )}
    </>
  );
};

export default page;
