import AdCreditTop from "@/components/adCredits/AdCreditTop";
import BuyAdCredits from "@/components/adCredits/BuyAdCredits";
import Header from "@/components/Dashboard/Header";
import EffectiveDiscount from "@/components/Icons/EffectiveDiscount";
import MenuVisits from "@/components/Icons/MenuVisits";
import OrdersDelivered from "@/components/Icons/OrdersDelivered";
import Reach from "@/components/Icons/Reach";
import React from "react";

const adStats = [
  { id: 1, amount: "\u20B90", label: "Menu Visits", icon: <MenuVisits /> },
  {
    id: 2,
    amount: "0",
    label: "Orders",
    icon: <OrdersDelivered />,
  },
  {
    id: 3,
    amount: "\u20B90",
    label: "Reach",
    icon: <Reach />,
  },
  {
    id: 4,
    amount: "0",
    label: "Sales",
    icon: <EffectiveDiscount />,
  },
];

const page = () => {
  return (
    <div>
      <Header storeStatus={false} />
      <AdCreditTop />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 w-4/6 mx-12 mt-4">
        {adStats.map((ad) => (
          <AdStats
            key={ad.id}
            amount={ad.amount}
            label={ad.label}
            icon={ad.icon}
          />
        ))}
      </div>

      <div className="font-poppins px-12">
        <p className="font-semibold">Set budget amount</p>
        <p>Select the amount you want to spend on this ad</p>
      </div>
      <BuyAdCredits />
    </div>
  );
};

export default page;

const AdStats = ({
  amount,
  label,
  icon,
}: {
  amount: string;
  label: string;
  icon?: React.ReactNode;
}) => {
  return (
    <div className="border border-[#1DBF73] flex flex-col justify-center items-center h-[100px] rounded-lg ">
      <h3 className="text-xl font-semibold">{amount}</h3>
      <div className="flex justify-between items-end w-full px-4">
        <p className="text-gray-600">{label}</p>
        <div>{icon}</div>
      </div>
    </div>
  );
};
