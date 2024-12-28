import Dashboard from "@/components/Dashboard/Dashboard";

const page = () => {
  return (
    <>
      {true ? (
        <div className="w-[100vw]  text-[30px] flex justify-center items-center font-poppins h-[100vh]">
          No data to show yet!
        </div>
      ) : (
        <Dashboard />
      )}
    </>
  );
};

export default page;
