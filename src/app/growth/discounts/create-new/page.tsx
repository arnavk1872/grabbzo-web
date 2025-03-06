import Header from "@/components/Dashboard/Header";
import { useRouter } from "next/navigation";
import OffersDiscounts from "@/components/discounts/OffersDiscounts";
import CustomDiscount from "@/components/discounts/CustomDiscount";

const Page = () => {
  return (
    <div className="px-2">
      <Header />
      <div className="font-poppins px-8 py-4">
        <OffersDiscounts />
        <CustomDiscount />
      </div>
    </div>
  );
};

export default Page;
