type Plan = {
  name: string;
  duration: string;
  originalCost: string;
  cost: string;
  features: string[];
  buttonBg: string;
  btnText: string;
  border: string;
};

export const plans: Plan[] = [
  {
    name: "SILVER",
    duration: "1 month",
    originalCost: "₹360.00",
    cost: "₹299.00",
    features: [
      "Join for ₹10/day",
      "4% commission on pre dine-in orders",
      "24x7 restaurant support",
      "Standard analytics tools",
      "Customer feedback",
      "Order History",
    ],
    buttonBg:
      "bg-gray-400 hover:bg-gray-800 text-white border border-gray-400 font-semibold rounded-full",
    btnText: "Enjoy 3 months FREE",
    border: "border-borderColor rounded-md mt-8",
  },
  {
    name: "GOLD",
    duration: "3 months",
    originalCost: "₹1000.00",
    cost: "₹749.00",
    features: [
      "Join for ₹9/day",
      "3% commission on pre dine-in orders",
      "Priority email support",
      "Enhanced promotional options",
    ],
    buttonBg:
      "bg-amber-600 hover:bg-amber-800 text-white font-semibold rounded-full",
    btnText: "Join GOLD",
    border: "border-blue-600 rounded-b-[20px]",
  },
  {
    name: "DIAMOND",
    duration: "6 months",
    originalCost: "₹2100.00",
    cost: "₹1499.00",
    features: [
      "Join for ₹8/day",
      "₹500 ad credits",
      "2.5% commission on pre dine-in orders",
      "Help with menu setup",
      "Comprehensive analytics",
      "Predictive insights",
    ],
    buttonBg:
      "bg-blue-600 text-white border border-gray-400 font-semibold rounded-full",
    btnText: "Join DIAMOND",
    border: "border-borderColor rounded-md mt-8",
  },
  {
    name: "PLATINUM",
    duration: "12 months",
    originalCost: "₹4999.00",
    cost: "₹2499.00",
    features: [
      "Join for ₹6.5/day",
      "₹750 ad credits",
      "1.5% commission on pre dine-in orders",
      "Professional shoot for menu setup",
      "Personalized marketing strategies",
    ],
    buttonBg:
      "bg-green-600 hover:bg-green-900 text-white font-semibold rounded-full",
    btnText: "Join PLATINUM",
    border: "border-borderColor rounded-md mt-8",
  },
];
