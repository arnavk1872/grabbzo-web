import React from "react";

type MenuItem = {
  id: number;
  name: string;
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
};

const ItemsOrdered: React.FC<ItemsOrderedProps> = ({ orderDetails }) => {
  console.log(orderDetails, "orderDetails per order");
  
  const totalAmount = orderDetails?.orderItems?.reduce(
    (sum, item) => sum + item.totalItemPrice,
    0
  ) || 0;

  return (
    <div className="p-4 mx-auto font-poppins 2xl:w-[40%]">
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
                    className="w-16 h-16 bg-gray-400 object-cover rounded-lg"
                    alt={item.menuItem.name}
                  />
                  <div>
                    <span className="text-xs text-blue-500 font-medium">
                      {item.menuItem.category || "Food"}
                    </span>
                    <h4 className="text-lg font-semibold">{item.menuItem.name}</h4>
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
