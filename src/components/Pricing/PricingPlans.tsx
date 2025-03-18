"use client";
import React from "react";
import { Button } from "../UI/Button";
import Tick from "../Icons/Tick";
import { ArrowLeft } from "lucide-react";
import { paymentRequest } from "@/helpers/api-utils";
import { useSnackbar } from "notistack";
import { plans } from "@/helpers/paymentPlans";

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
      {plans.map((plan, index) => (
        <div className="flex flex-col" key={index}>
          {plan.name === "GOLD" && (
            <div className="bg-blue-600 text-center font-poppins font-semibold p-1 text-[14px] text-white rounded-t-xl">
              MOST POPULAR
            </div>
          )}
          <div
            key={plan.name}
            className={`relative w-64 border-2 h-[600px] overflow-hidden p-4 flex flex-col  ${plan.border}`}
          >
            {plan.name && (
              <div className="absolute top-0 -right-1 bg-red-600 text-white px-3 py-1 rounded-b-md text-sm font-bold">
                {/* {{
                  SILVER: "20% Discount",
                  GOLD: "30% Discount",
                  DIAMOND: "40% Discount",
                  PLATINUM: "50% Discount",
                }[plan.name] || ""} */}
                50% Discount
              </div>
            )}

            <div>
              <div>Premium</div>
              <h3 className="text-[22px] font-extrabold">{plan.name}</h3>
              <div className="text-gray-500 line-through text-center text-[16px]">
                {plan.originalCost}
              </div>{" "}
              <p className="text-center text-[46px] font-bold">{plan.cost}</p>
              <p className="text-center text-[18px]">{plan.duration}</p>
            </div>

            <Button
              className={`mt-4 py-2 px-4 rounded-[12px] hover:opacity-90  ${plan.buttonBg}`}
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
                <div key={index} className="flex items-start mt-2">
                  <div className="min-w-6">
                    <Tick />
                  </div>
                  <p className="ml-2">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PricingPlans;
