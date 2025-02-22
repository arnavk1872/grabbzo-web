import Dashboard from "@/components/Dashboard/Dashboard";
import { S3_BASE_URL } from "@/lib/constants";
import Image from "next/image";

const page = () => {
  return (
    <>
      {false ? (
        <div className="w-[100vw]  text-[30px] flex flex-col justify-center items-center font-poppins h-[100vh]">
          <Image src={`${S3_BASE_URL}/public/Dashboard.png`} width={220} height={220} alt="Temporary Illustration"/>
          No data to display at the moment!
        </div>
      ) : (
        <Dashboard />
      )}
    </>
  );
};

export default page;
