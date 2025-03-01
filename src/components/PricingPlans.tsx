"use client";
import React from "react";
import { Button } from "./UI/Button";
import Tick from "./Icons/Tick";
import { ArrowLeft } from "lucide-react";
import { paymentRequest } from "@/helpers/api-utils";
import { useSnackbar } from "notistack";

type Plan = {
  name: string;
  duration: string;
  cost: string;
  features: string[];
  buttonBg: string;
  btnText: string;
};

const plans: Plan[] = [
  {
    name: "SILVER",
    duration: "1 month",
    cost: "₹299.00",
    features: [
      "Join for ₹10/day",
      "₹100 ad credits",
      "4% commission on pre dine-in orders",
      "24x7 restaurant support",
      "Standard analytics tools",
      "Customer feedback",
      "Order History",
    ],
    buttonBg:
      "bg-gray-400 hover:bg-gray-800 text-white border border-gray-400 font-semibold",
    btnText: "Enjoy 1 month FREE",
  },
  {
    name: "GOLD",
    duration: "3 months",
    cost: "₹749.00",
    features: [
      "Join for ₹9/day",
      "₹300 ad credits",
      "3% commission on pre dine-in orders",
      "Priority email support",
      "Enhanced promotional options",
      "Targeted campaigns",
    ],
    buttonBg: "bg-amber-600 hover:bg-amber-800 text-white font-semibold",
    btnText: "Join GOLD",
  },
  {
    name: "DIAMOND",
    duration: "6 months",
    cost: "₹1499.00",
    features: [
      "Join for ₹8/day",
      "₹500 ad credits",
      "2.5% commission on pre dine-in orders",
      "Help with menu setup",
      "Comprehensive analytics",
      "Predictive insights",
      "24-hour dedicated reply",
    ],
    buttonBg: "bg-blue-600 text-white border border-gray-400 font-semibold",
    btnText: "Join DIAMOND",
  },
  {
    name: "PLATINUM",
    duration: "12 months",
    cost: "₹2499.00",
    features: [
      "Join for ₹6.5/day",
      "₹750 ad credits",
      "1.5% commission on pre dine-in orders",
      "Professional shoot for menu setup",
      "Personalized marketing stratergies",
      "Full-service support ",
    ],
    buttonBg: "bg-green-700 hover:bg-green-900 text-white font-semibold",
    btnText: "Join PLATINUM",
  },
];

const PricingPlans: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();

  const handlePayment = async (e: any) => {
    e.preventDefault();
    try {
      const data: any = {
        customerName: "Ashish Kumar",
        email: "ashishak063@gmail.com",
        phoneNumber: "8871357166",
        amount: "299",
      };
      const response = await paymentRequest(data);
      console.log(response);
      if (response.status == 401) {
        enqueueSnackbar("Login First to Buy a Plan !", {
          variant: "warning",
          className: "font-poppins",
        });
        return;
      }

      const options = {
        key: response.secretId,
        amount: parseFloat("299") * 100,
        currency: "INR",
        name: "Grabbzo Pvt. Ltd.",
        description: "Test Transaction",
        order_id: response.razorpayOrderId,
        prefill: {
          name: "Ashish Kumar",
          email: "ashishak063@gmail.com",
          contact: "8871357166",
        },
        theme: {
          color: "#1DBF73",
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error("Error in payment:", err);
      enqueueSnackbar("Something Went Wrong!", {
        variant: "error",
        className: "font-poppins",
      });
    }
  };
  return (
    <div className="flex flex-wrap justify-center gap-12 font-poppins">
      {plans.map((plan) => (
        <div
          key={plan.name}
          className="relative w-64 border-2 min-h-fit overflow-hidden border-borderColor rounded-lg p-4 flex flex-col "
        >
          <div>
            <h3 className="text-[24px] font-bold text-center">{plan.name}</h3>
            <p className="text-center text-[46px] font-bold">{plan.cost}</p>
            <p className="text-center text-[18px]">{plan.duration}</p>
          </div>

          <Button
            className={`mt-4 py-2 px-4 rounded-[12px] hover:opacity-90 ${plan.buttonBg}`}
            onClick={handlePayment}
          >
            {plan.btnText}
          </Button>

          {plan.name !== "SILVER" && (
            <div className="flex mt-5 gap-x-1">
              <ArrowLeft />
              <div>
                Everything included in{" "}
                <span className="font-semibold">
                  {
                    plans[plans.findIndex((p) => p.name === plan.name) - 1]
                      ?.name
                  }
                </span>
                , plus...
              </div>
            </div>
          )}

          <div className="mt-3 min-h-[400px]">
            {plan.features.map((feature, index) => (
              <div key={index} className="flex items-center mt-2">
                <Tick />
                <p className="ml-2">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PricingPlans;
