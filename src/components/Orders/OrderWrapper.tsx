"use client";
import React, { useState } from "react";
import OrderDetails from "./OrderDetails";
import ItemsOrdered from "./ItemsOrdered";
import CustomerDetails from "./CustomerDetails";

type OrderWrapperProps = {
  orderDetails: any;
};

const OrderWrapper: React.FC<OrderWrapperProps> = ({ orderDetails }) => {
  // State for the form inputs
  const [rejectionReason, setRejectionReason] = useState("");
  const [preparationMinutes, setPreparationMinutes] = useState(10);
  const [tableNo, setTableNo] = useState("");
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  
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

  return (
    <div className="w-full">
      <OrderDetails 
        orderDetails={orderDetails}
        rejectionReason={rejectionReason}
        setRejectionReason={setRejectionReason}
        preparationMinutes={preparationMinutes}
        setPreparationMinutes={setPreparationMinutes}
        tableNo={tableNo}
        setTableNo={setTableNo}
        viewButton={viewButton}
        setViewButton={setViewButton}
        showRejectDialog={showRejectDialog}
        setShowRejectDialog={setShowRejectDialog}
      />
      <div className="flex w-full justify-between items-start 2xl:px-12">
        <CustomerDetails orderDetails={orderDetails} />
        <ItemsOrdered 
          orderDetails={orderDetails}
          preparationMinutes={preparationMinutes}
          setPreparationMinutes={setPreparationMinutes}
          tableNo={tableNo}
          setTableNo={setTableNo}
          viewButton={viewButton}
        />
      </div>
    </div>
  );
};

export default OrderWrapper; 