import React from "react";
import { Button } from "./UI/Button";

type Plan = {
  name: string;
  duration: string;
  cost: string;
  costPerDay: string;
  credits: string;
  dineIn: string;
  fssaiHelp: boolean;
  restSupport: string;
  dashboardFeatures: string[];
  isRecommended?: boolean;
  buttonBg: string; 
};

const plans: Plan[] = [
  {
    name: "Silver",
    duration: "1 month",
    cost: "₹299",
    costPerDay: "₹10/day",
    credits: "₹100",
    dineIn: "4% commission on each order",
    fssaiHelp: false,
    restSupport: "24 Hours",
    dashboardFeatures: [
      "Standard analytics",
      "Customer feedback",
      "Recently placed orders",
      "General support",
    ],
    buttonBg: "bg-blue-500",
  },
  {
    name: "Gold",
    duration: "3 months",
    cost: "₹749",
    costPerDay: "₹9/day",
    credits: "₹300",
    dineIn: "3% commission on each order",
    fssaiHelp: false,
    restSupport: "24 Hours",
    dashboardFeatures: [
      "Enhanced promotional tools",
      "Targeted campaigns",
      "Priority email support",
    ],
    buttonBg: "bg-green-700",
  },
  {
    name: "Diamond",
    duration: "6 months",
    cost: "₹1499",
    costPerDay: "₹8/day",
    credits: "₹500",
    dineIn: "1.5% commission on each order",
    fssaiHelp: true,
    restSupport: "24 Hours",
    dashboardFeatures: [
      "Comprehensive analytics",
      "Predictive insights",
      "24-hour dedicated reply",
    ],
    isRecommended: true,
    buttonBg: "bg-white text-black border border-gray-400", 
  },
  {
    name: "Platinum",
    duration: "12 months",
    cost: "₹2499",
    costPerDay: "₹6.5/day",
    credits: "₹750",
    dineIn: "No commission charges",
    fssaiHelp: true,
    restSupport: "24 Hours",
    dashboardFeatures: [
      "Full-service support and report",
      "Personalized marketing strategies",
    ],
    buttonBg: "bg-black text-white", 
  },
];

const PricingPlans: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-center gap-12 font-poppins">
      {plans.map((plan) => (
        <div
          key={plan.name}
          className="relative w-64 border-2 border-borderColor rounded-lg  p-4 flex flex-col justify-between"
        >

          {/* {plan.isRecommended && (
            <div className="absolute top-10 -right-2 w-28 bg-red-500 text-white text-xs font-bold transform rotate-45 text-center shadow-lg">
              Recommended
            </div>
          )} */}

          <h3 className="text-xl font-bold text-center">{plan.name}</h3>
          <p className="text-center text-gray-500">{plan.duration}</p>
          <p className="text-center text-[46px] font-bold">{plan.cost}</p>
          <p className="text-center text-sm text-gray-500">{plan.costPerDay}</p>
          <Button
            className={`mt-4 py-2 px-4 rounded hover:opacity-90 ${plan.buttonBg}`}
          >
            Choose {plan.name}
          </Button>
          <p className="mt-4">
            <strong>Credits for Ads:</strong> {plan.credits}
          </p>
          <p>
            <strong>Dine-in:</strong> {plan.dineIn}
          </p>
          <p>
            <strong>FSSAI Help:</strong> {plan.fssaiHelp ? "✔" : "✘"}
          </p>
          <p>
            <strong>Restaurant Support:</strong> {plan.restSupport}
          </p>
          <div className="mt-4">
            <strong>Dashboard Features:</strong>
            <ul className="list-disc pl-5">
              {plan.dashboardFeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PricingPlans;
