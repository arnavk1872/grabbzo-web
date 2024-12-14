import Header from "@/components/Dashboard/Header";
import Center from "@/components/Icons/Center";
import Four from "@/components/Icons/Four";

export default function Custom404() {
  return (
    <div >
      <Header />
      <div className="flex items-center justify-center mt-28">
        <Four />
        <Center />
        <Four />
      </div>
      <div className="flex items-center justify-center text-[64px] text-[#29246B] font-semibold">PAGE NOT FOUND</div>
      <div className="flex items-center justify-center text-[20px] text-center  ">This page seems to be missing, perhaps it's <br/> time to go back home.</div>
    </div>
  );
}
