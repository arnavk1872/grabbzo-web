import Header from "@/components/Dashboard/Header";
import OffersDiscounts from "@/components/discounts/OffersDiscounts";
import SetCustomDiscount from "@/components/discounts/CustomDiscount";

const Page = () => {
  return (
    <div className="px-2">
      <Header />
      <div className="font-poppins px-8 py-4">
        <OffersDiscounts />
        <SetCustomDiscount/>
      </div>
    </div>
  );
};

export default Page;
