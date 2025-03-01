import Header from "@/components/Dashboard/Header";
import ActiveDiscounts from "@/components/discounts/ActiveDiscounts";
import OffersDiscounts from "@/components/discounts/OffersDiscounts";
import SwapType from "@/components/discounts/SwapType";
import React from "react";
import GrossSales from "@/components/Icons/GrossSales";
import OrdersDelivered from "@/components/Icons/OrdersDelivered";
import EffectiveDiscount from "@/components/Icons/EffectiveDiscount";
import DiscountGiven from "@/components/Icons/DiscountGiven";

const Page = () => {
  const offerStats = [
    { id: 1, amount: "\u20B90", label: "Gross sales", icon: <GrossSales /> },
    {
      id: 2,
      amount: "0",
      label: "Orders delivered",
      icon: <OrdersDelivered />,
    },
    {
      id: 3,
      amount: "\u20B90",
      label: "Discount given",
      icon: <DiscountGiven />,
    },
    {
      id: 4,
      amount: "0%",
      label: "Effective discount",
      icon: <EffectiveDiscount />,
    },
  ];

  const activeOffers = [
    {
      id: "offer-1",
      title: "30% off up to \u20B975",
      startDate: "7 February, 2025",
      expiry: "22 days",
      applicable: "All users",
      minOrderValue: "\u20B9150",
    },
    {
      id: "offer-2",
      title: "20% off up to \u20B950",
      startDate: "15 February, 2025",
      expiry: "30 days",
      applicable: "New users",
      minOrderValue: "\u20B9200",
    },
  ];

  return (
    <div className="px-2 font-poppins">
      <Header />
      <div className="px-8 py-4">
        <OffersDiscounts />
        <SwapType />
      </div>

      <div className="mt-2 mx-12">
        {/* Offer Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6 w-4/6">
          {offerStats.map((stat) => (
            <OfferStat
              key={stat.id}
              amount={stat.amount}
              label={stat.label}
              icon={stat.icon}
            />
          ))}
        </div>

        <h2 className="text-xl font-semibold">Active Offers</h2>

        {/* Active Offers */}
        <ActiveDiscounts activeOffers={activeOffers} />
      </div>
    </div>
  );
};

export default Page;

const OfferStat = ({
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
        <div className="mb-2">{icon}</div>
      </div>
    </div>
  );
};
