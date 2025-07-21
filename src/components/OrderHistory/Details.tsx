import React from "react";
import { Order } from "../../../types/type";

interface DetailsProps {
  selectedOrder: Order | null;
}

const Details: React.FC<DetailsProps> = ({ selectedOrder }) => {
  if (!selectedOrder) return <div className="p-6">Select an order to see details</div>;

  // Assuming service fee is 9% of subtotal
  const serviceFee = Number((selectedOrder.subtotal * 0.09).toFixed(2));
  const deliveryCharge = 1.0;
  const driverTip = 1.0;
  const finalTotal = selectedOrder.subtotal + deliveryCharge + driverTip + serviceFee;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full">
      <h2 className="text-xl font-bold mb-4">Order #{selectedOrder.id}</h2>

      <div className="space-y-4">
        {selectedOrder.orderItems.map((item) => (
          <div key={item.id}>
            <div className="flex justify-between font-semibold">
              <span className="text-md font-bold">{item.menuItem.title}</span>
              <span className="text-blue-600">${item.totalItemPrice.toFixed(2)}</span>
            </div>
            <p className="text-sm text-gray-500 ml-2">
              Size: {item.size || "N/A"}<br />
              Additional Ingredients: {item.additionalIngredients || "None"}<br />
              No. of pieces: {item.quantity}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t pt-4 space-y-1 text-sm">
        <p className="flex justify-between">
          <span>Sub Total</span>
          <span>${selectedOrder.subtotal.toFixed(2)}</span>
        </p>
        <p className="flex justify-between">
          <span>Delivery Charge</span>
          <span>${deliveryCharge.toFixed(2)}</span>
        </p>
        <p className="flex justify-between">
          <span>Driver Tip</span>
          <span>${driverTip.toFixed(2)}</span>
        </p>
        <p className="flex justify-between">
          <span>Service Fee (9%)</span>
          <span>${serviceFee.toFixed(2)}</span>
        </p>

        <p className="flex justify-between font-bold text-lg pt-2 border-t mt-3">
          <span>Total</span>
          <span>${finalTotal.toFixed(2)}</span>
        </p>
      </div>

      {selectedOrder.carDelivery && (
        <div className="mt-6">
          <h3 className="text-md font-semibold mb-2">Car Delivery Info</h3>
          <p><strong>Model:</strong> {selectedOrder.carModel}</p>
          <p><strong>Number:</strong> {selectedOrder.carNumber}</p>
          <p><strong>Color:</strong> {selectedOrder.carColor}</p>
        </div>
      )}

      {selectedOrder.coupon && (
        <div className="mt-4 text-sm">
          <strong>Coupon Used:</strong> {selectedOrder.coupon}
        </div>
      )}

      <div className="mt-6 text-sm text-gray-600">
        <p><strong>Order Note:</strong> {selectedOrder.orderNote}</p>
        <p><strong>Created At:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
        <p><strong>OTP:</strong> {selectedOrder.otp}</p>
      </div>
    </div>
  );
};

export default Details;
