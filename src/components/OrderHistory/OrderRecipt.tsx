import React from "react";
import { Order } from "../../../types/type";

interface OrderReceiptProps {
  order: Order;
}

const OrderReceipt: React.FC<OrderReceiptProps> = ({ order }) => {
  const item = order.orderItems[0];

  // Use defaults if values are missing
  const platformfees = order.platformFees ?? 0
  const gst = order.gst ?? 0


  const calculatedTotal = order.subtotal + platformfees + gst ;

  return (
    <div
      className="bg-white rounded-lg shadow-md flex flex-col justify-between"
      style={{
        minWidth: 400,
        width: 1050,
        height: "100%",
        marginLeft: -50,
        marginTop: 0,
        borderLeft: "1px solid #eee",
        borderRadius: "0 8px 8px 0",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-2">Order #{order.id}</h2>

        <div className="flex justify-between items-start mb-2">
          <div>
            <div className="font-bold text-lg">{item.menuItem.title}</div>
            <div className="text-sm text-gray-600">Size: N/A</div>
            <div className="text-sm text-gray-600">Additional Ingredients: None</div>
            <div className="text-sm text-gray-600">No. of pieces: {item.quantity}</div>
          </div>
          <div className="font-bold text-blue-700 text-lg mt-1">
            ${item.totalItemPrice.toFixed(2)}
          </div>
        </div>

        <hr className="my-3" />

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Sub Total</span>
            <span>${order.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span>Platform Fee</span>
            <span>${platformfees.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span>GST</span>
            <span>${gst.toFixed(2)}</span>
          </div>
          {/* <div className="flex justify-between text-sm mb-1">
            <span>Service Fee</span>
            <span>${serviceFee.toFixed(2)}</span>
          </div> */}
          <div className="flex justify-between font-bold text-lg mt-2">
            <span>Total</span>
            <span>${calculatedTotal.toFixed(2)}</span>
          </div>
        </div>

        {order.carDelivery && (
          <div className="mt-4">
            <div className="font-semibold mb-2">Car Delivery Info</div>
            <div className="text-sm"><strong>Model:</strong> {order.carModel || "N/A"}</div>
            <div className="text-sm"><strong>Number:</strong> {order.carNumber || "N/A"}</div>
            <div className="text-sm"><strong>Color:</strong> {order.carColor || "N/A"}</div>
          </div>
        )}

        <div className="mt-4 text-sm">
          <div><strong>Order Note:</strong> {order.orderNote || "None"}</div>
          <div><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</div>
          <div><strong>OTP:</strong> {order.otp}</div>
        </div>
      </div>
    </div>
  );
};

export default OrderReceipt;
