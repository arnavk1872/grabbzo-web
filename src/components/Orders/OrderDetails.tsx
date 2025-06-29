"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Button } from "../UI/Button";
import { MoveLeftIcon } from "lucide-react";
import { changeOrderStatus } from "@/helpers/api-utils";
import { acceptOrder,rejectOrder } from "@/helpers/api-utils";


const OrderDetails = ({ orderDetails }: { orderDetails: any }) => {
  const { slug } = useParams();
  const router = useRouter();
  
  // Determine the button view based on the actual order status from API
  const getButtonViewFromStatus = (status: string): "accept" | "preparing" | "ready" | "completed" => {
    switch (status) {
      case "NEW":
        return "accept";
      case "PREPARING":
        return "preparing";
      case "READY":
        return "ready";
      case "COMPLETED":
        return "completed";
      default:
        return "accept";
    }
  };
  
  const [viewButton, setViewButton] = useState<"accept" | "preparing" | "ready" | "completed">(
    orderDetails ? getButtonViewFromStatus(orderDetails.status) : "accept"
  );
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectInput, setShowRejectInput] = useState(false);
  const [customerArrivingTime, setCustomerArrivingTime] = useState("");
  const [tableNo, setTableNo] = useState("");
  const [originalArrivingTime, setOriginalArrivingTime] = useState("");

  // Update button view when orderDetails.status changes
  useEffect(() => {
    if (orderDetails && orderDetails.status) {
      setViewButton(getButtonViewFromStatus(orderDetails.status));
    }
  }, [orderDetails?.status]);

  // Initialize input fields with orderDetails values
  useEffect(() => {
    if (orderDetails) {
      const originalTime = orderDetails.customerArrivingTime || "";
      setOriginalArrivingTime(originalTime);
      setCustomerArrivingTime(originalTime);
      setTableNo(orderDetails.tableNo || "");
    }
  }, [orderDetails]);

  // Calculate maximum allowed time (original + 30 minutes)
  const getMaxArrivingTime = () => {
    if (!originalArrivingTime) return "";
    const originalDate = new Date(originalArrivingTime);
    const maxDate = new Date(originalDate.getTime() + 30 * 60 * 1000); // Add 30 minutes
    return maxDate.toISOString().slice(0, 16); // Format for datetime-local input
  };

  // Format original time for datetime-local input
  const formatDateTimeLocal = (isoString: string) => {
    if (!isoString) return "";
    return new Date(isoString).toISOString().slice(0, 16);
  };
  const buttonConfig = {
    accept: {
      status: "NEW",
      buttons: [
        {
          text: "Reject",
          className: `bg-red-600 hover:bg-red-700 ${!rejectionReason.trim() ? 'opacity-50 cursor-not-allowed' : ''}`,
          disabled: !rejectionReason.trim(),
          onClick: async () => {
            if (!rejectionReason.trim()) return;
            
            try {
              const response = await rejectOrder(String(slug), rejectionReason);
              if (response && response.status === 200) {
                router.push("/dashboard/orders");
              }
            } catch (error) {
              console.error("Error rejecting order:", error);
            }
          },
        },
        {
          text: "Accept",
          className: "bg-green-600 hover:bg-green-800",
          disabled: false,
          onClick: async () => {
            try {
              const payload = {
                orderId: parseInt(String(slug)),
                customerArrivingTime: customerArrivingTime || new Date().toISOString(),
                tableNo: tableNo ? parseInt(tableNo) : null
              };
              
              const response = await acceptOrder(payload);
              if (response && response.status === 200) {
                setViewButton("preparing");
              }
            } catch (error) {
              console.error("Error accepting order:", error);
            }
          },
        },
      ],
    },
    preparing: {
      status: "PREPARING",
      buttons: [
        {
          text: "Ready",
          className: "bg-green-600 hover:bg-green-800",
          disabled: false,
          onClick: () => {
            changeOrderStatus("READY", slug);
            setViewButton("ready");
          },
        },
      ],
    },
    ready: {
      status: "READY",
      buttons: [
        {
          text: "Picked Up",
          className: "bg-yellow-600 hover:bg-yellow-700",
          disabled: false,
          onClick: () => {
            changeOrderStatus("COMPLETED", slug);
            setViewButton("completed");
          },
        },
      ],
    },
    completed: {
      status: "COMPLETED",
      buttons: [
        {
          text: "Completed",
          className: "bg-green-800 hover:bg-green-900",
          disabled: false,
          onClick: () => {},
        },
      ],
    },
  };

  return (
    <div className="w-full px-8">
      <section className="flex justify-between items-center w-full">
        <div className="flex items-center gap-x-4">
          <MoveLeftIcon
            className="cursor-pointer text-blue-700"
            size={42}
            onClick={() => router.back()} 
          />
          <h1 className="font-poppins text-[38px] font-semibold text-[#1663DE]">
            ORDER ID #{slug}
          </h1>
        </div>

        <div className="px-12 flex gap-x-4">
          {buttonConfig[viewButton].buttons.map(({ text, className, onClick, disabled }) => (
            <Button
              key={text}
              variant="secondary"
              onClick={onClick}
              disabled={disabled}
              className={`${className} text-[18px] px-10 py-6 text-white`}
            >
              {text}
            </Button>
          ))}
        </div>
      </section>
      
      {/* Input fields for NEW orders */}
      {viewButton === "accept" && (
        <div className="mt-6 px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
            {/* Rejection Reason */}
            <div>
              <label htmlFor="rejectionReason" className="block font-poppins font-semibold text-sm font-medium text-gray-700 mb-2">
                Rejection Reason (Required to reject order)
              </label>
              <input
                id="rejectionReason"
                type="text"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Enter reason for rejection..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            {/* Customer Arriving Time */}
            <div>
              <label htmlFor="customerArrivingTime" className="block font-poppins font-semibold text-sm font-medium text-gray-700 mb-2">
                Customer Arriving Time
              </label>
              <input
                id="customerArrivingTime"
                type="datetime-local"
                value={formatDateTimeLocal(customerArrivingTime)}
                min={formatDateTimeLocal(originalArrivingTime)}
                max={getMaxArrivingTime()}
                onChange={(e) => setCustomerArrivingTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              {originalArrivingTime && (
                <p className="text-xs text-gray-500 mt-1">
                  Can be increased by maximum 30 minutes from original time ({new Date(originalArrivingTime).toLocaleString()})
                </p>
              )}
            </div>

            {/* Table Number */}
            <div>
              <label htmlFor="tableNo" className="block font-poppins font-semibold text-sm font-medium text-gray-700 mb-2">
                Table Number
              </label>
              <input
                id="tableNo"
                type="number"
                value={tableNo}
                onChange={(e) => setTableNo(e.target.value)}
                placeholder="Enter table number..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
