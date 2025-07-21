import React from "react";
import PhoneIcon from "../Icons/PhoneIcon";
import ETATimer from "./ETATimer";
import Clock from "../Icons/Clock";

type OrderDetails = {
  id: number;
  orderNote: string;
  customerArrivingTime: string;
  type: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  carDelivery: boolean;
  carModel: string | null;
  carNumber: string | null;
  carColor: string | null;
  tableNo: string | null;
  rejectionReason: string | null;
  customerName?: string; // Optional since it might not be in API response
};

type CustomerDetailsProps = {
  orderDetails: OrderDetails;
};

const CustomerDetails: React.FC<CustomerDetailsProps> = ({ orderDetails }) => {
  return (
    <div className="flex flex-col items-center justify-center w-1/2">
      <div className="bg-white border rounded-[40px] flex flex-col items-center w-full ">
        <div className="py-4">
          <h1 className="font-poppins font-bold text-[22px] mt-4">
            {orderDetails?.customerName || "Customer"}
          </h1>
          <div className="my-2 text-[#1663DE] text-center border border-[#1663DE] bg-[#d0e0f8] rounded-[16px] font-semibold font-poppins px-2 py-1">
            {orderDetails?.type || "Customer"}
          </div>
        </div>

        <div className="w-full">
          <div className="bg-[#3F4354] w-full rounded-t-[16px] p-4">
            <h2 className="text-white font-poppins text-[22px] font-semibold mb-2">
              Order Note
            </h2>
            <p className="text-white font-poppins text-[12px] text-left">
              {orderDetails?.orderNote}
            </p>
          </div>

          <div className="bg-[#FF704D] rounded-b-[30px] p-4">
            <h2 className="text-white font-poppins text-[22px] font-semibold mb-2 text-center">
              Customer Arriving Time
            </h2>
            <p className="text-center text-white font-poppins font-bold">
              {orderDetails?.customerArrivingTime 
                ? new Date(orderDetails.customerArrivingTime).toLocaleString()
                : "Not specified"
              }
            </p>
          </div>
        </div>
      </div>

      {/* Car Delivery Section - Only show if carDelivery is true */}
      {orderDetails?.carDelivery && (
        <div className="border border-borderColor rounded-[24px] w-full my-4 bg-white p-6">
          <h3 className="font-poppins text-[18px] font-semibold mb-4 text-left text-black">
            Car Delivery
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block font-poppins text-[14px] text-gray-600 mb-1">
                Car Number
              </label>
              <div className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 font-poppins text-[14px] text-gray-800">
                {orderDetails.carNumber || "Not provided"}
              </div>
            </div>
            <div>
              <label className="block font-poppins text-[14px] text-gray-600 mb-1">
                Car Model
              </label>
              <div className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 font-poppins text-[14px] text-gray-800">
                {orderDetails.carModel || "Not provided"}
              </div>
            </div>
            <div>
              <label className="block font-poppins text-[14px] text-gray-600 mb-1">
                Car Color
              </label>
              <div className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 font-poppins text-[14px] text-gray-800">
                {orderDetails.carColor || "Not provided"}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* {orderDetails.status === "PREPARING" && (
        <div className="border border-borderColor rounded-[24px] w-full my-4 bg-white flex gap-x-4 items-center justify-center py-4">
          <div className="border border-borderColor rounded-full bg-[#1663DE] p-2 ">
            <PhoneIcon />
          </div>
          <div>
            <span className="font-poppins text-[20px] font-semibold">
              Phone Number
            </span>
            <div className="font-poppins text-[14px]">+91 9879385252</div>
          </div>
        </div>
      )} */}
     {orderDetails?.status !== "COMPLETED" && (
      <div className="border mt-2 mb-6 border-borderColor rounded-[24px] w-full bg-white flex gap-x-4 items-center justify-center py-4">
        <Clock />
        <span className=" font-poppins font-bold">
          <ETATimer targetTime={
            orderDetails?.customerArrivingTime 
              ? new Date(orderDetails.customerArrivingTime).getTime()
              : new Date().getTime() + 1000000
          } />
        </span>
      </div>
     )}
    </div>
  );
};

export default CustomerDetails;
