"use client"
import React from "react";

type MenuItem = {
  id: number;
  title: string;
  imageUrl: string;
  category?: string;
  // Add other menu item properties as needed
};

type OrderItem = {
  id: number;
  menuItem: MenuItem;
  quantity: number;
  totalItemPrice: number;
};

type OrderDetails = {
  id: number;
  orderNote: string;
  customerArrivingTime: string;
  type: string;
  orderItems: OrderItem[];
  status: string;
  createdAt: string;
  updatedAt: string;
  carDelivery: boolean;
  carModel: string | null;
  carNumber: string | null;
  carColor: string | null;
  tableNo: string | null;
  rejectionReason: string | null;
  coupon: any | null;
  subtotal: number;
  gst: number;
  platformFees: number;
  total: number;
  amountDetails: {
    subtotal: number;
    gst: number;
    platformFees: number;
    total: number;
  };
};

type ItemsOrderedProps = {
  orderDetails: OrderDetails;
  preparationMinutes: number;
  setPreparationMinutes: (minutes: number) => void;
  tableNo: string;
  setTableNo: (table: string) => void;
  viewButton: "accept" | "preparing" | "ready" | "completed";
};

const ItemsOrdered: React.FC<ItemsOrderedProps> = ({ 
  orderDetails, 
  preparationMinutes, 
  setPreparationMinutes, 
  tableNo, 
  setTableNo, 
  viewButton 
}) => {
  
  const totalAmount = orderDetails?.orderItems?.reduce(
    (sum, item) => sum + item.totalItemPrice,
    0
  ) || 0;

  return (
    <div className="p-4 mx-auto font-poppins w-1/2">
      {/* Input fields for NEW orders */}
      {viewButton === "accept" && (
        <div className="mb-6">
          <div className="bg-white p-6 border border-borderColor rounded-[30px] space-y-6">
            {/* Food Preparation Time */}
            <div>
              <label className="block font-poppins font-semibold text-sm font-medium text-gray-700 mb-2">
                Set food preparation time
              </label>
              <div className="flex items-center justify-center bg-white border border-gray-300 rounded-lg px-4 py-3 shadow-sm">
                <button
                  type="button"
                  onClick={() => setPreparationMinutes(Math.max(1, preparationMinutes - 1))}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  disabled={preparationMinutes <= 1}
                >
                  <span className="text-lg font-semibold text-gray-600">−</span>
                </button>
                <div className="mx-6 text-center">
                  <span className="text-lg font-semibold text-gray-800">{preparationMinutes} mins</span>
                </div>
                <button
                  type="button"
                  onClick={() => setPreparationMinutes(Math.min(30, preparationMinutes + 1))}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  disabled={preparationMinutes >= 30}
                >
                  <span className="text-lg font-semibold text-gray-600">+</span>
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Customer Arriving time can be extended by a maximum of 30 minutes
              </p>
            </div>

            {/* Table Number */}
            {orderDetails.type === "DINEIN" && (
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
            )}
          </div>
        </div>
      )}

      <div className="bg-white p-4 border border-borderColor rounded-[30px]">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left pb-2">Items</th>
              <th className="text-right pb-2">Quantity</th>
              <th className="text-right pb-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails?.orderItems?.map((item, index) => (
              <tr key={item.id || index} className="border-b last:border-b-0">
                {/* Product Details */}
                <td className="flex items-center space-x-4 py-4">
                  <img
                    className="w-16 h-16 object-cover rounded-lg"
                    alt={item.menuItem.title}
                    src={item.menuItem.imageUrl}
                  />
                  <div>
                    <span className="text-xs text-blue-500 font-medium">
                      {item.menuItem.category || "Item"}
                    </span>
                    <h4 className="text-lg font-semibold">{item.menuItem.title}</h4>
                  </div>
                </td>
                {/* Quantity */}
                <td className="text-center">{item.quantity}x</td>
                {/* Price */}
                <td className="text-right">₹{item.totalItemPrice}</td>
              </tr>
            )) || []}
          </tbody>
          <tfoot>
            <tr>
              <td className="text-right font-semibold py-4" colSpan={2}>
                Subtotal:
              </td>
              <td className="text-right font-bold text-lg">₹{orderDetails?.subtotal || 0}</td>
            </tr>
            <tr>
              <td className="text-right font-semibold py-2" colSpan={2}>
                GST:
              </td>
              <td className="text-right font-bold">₹{orderDetails?.gst || 0}</td>
            </tr>
            <tr>
              <td className="text-right font-semibold py-2" colSpan={2}>
                Platform Fees:
              </td>
              <td className="text-right font-bold">₹{orderDetails?.platformFees || 0}</td>
            </tr>
            <tr>
              <td className="text-right font-semibold py-4 border-t" colSpan={2}>
                Total Amount:
              </td>
              <td className="text-right font-bold text-lg border-t">₹{orderDetails?.total || 0}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ItemsOrdered;
