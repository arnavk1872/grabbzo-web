import React from "react";
import { Order } from "../../../types/type";

interface OrderReceiptProps {
  order: Order;
}

const OrderReceipt: React.FC<OrderReceiptProps> = ({ order }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Receipt - Order #{order.id}</h2>

      <div className="text-sm text-gray-700 space-y-2">
        <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
        <p><strong>Subtotal:</strong> ${order.subtotal.toFixed(2)}</p>
        <p><strong>Platform Fees:</strong> ${order.platformFees.toFixed(2)}</p>
        <p className="font-bold text-lg"><strong>Total:</strong> ${order.total.toFixed(2)}</p>
      </div>

      <div className="mt-4">
        <h3 className="text-md font-semibold mb-2">Items</h3>
        <ul className="space-y-1 text-sm">
          {order.orderItems.map((item) => (
            <li key={item.id}>
              • {item.menuItem.title} x {item.quantity} - ${item.totalItemPrice.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>

      {order.coupon && (
        <p className="mt-4 text-sm text-gray-600">
          <strong>Coupon:</strong> {order.coupon}
        </p>
      )}
    </div>
  );
};

export default OrderReceipt;
