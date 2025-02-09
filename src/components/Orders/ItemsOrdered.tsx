import React from "react";

type OrderItem = {
  category: string;
  itemName: string;
  rating: number;
  reviews: number;
  quantity: number;
  price: number;
};

type ItemsOrderedProps = {
  orderDetails: OrderItem[];
};

const ItemsOrdered: React.FC<ItemsOrderedProps> = ({ orderDetails }) => {
  const totalAmount = orderDetails.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

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
            {orderDetails.map((item, index) => (
              <tr key={index} className="border-b last:border-b-0">
                {/* Product Details */}
                <td className="flex items-center space-x-4 py-4">
                  <img
                    className="w-16 h-16 bg-gray-400 object-cover rounded-lg"
                  />
                  <div>
                    <span className="text-xs text-blue-500 font-medium">
                      {item.category}
                    </span>
                    <h4 className="text-lg font-semibold">{item.itemName}</h4>
                  </div>
                </td>
                {/* Quantity */}
                <td className="text-center">{item.quantity}x</td>
                {/* Price */}
                <td className="text-right">₹{item.price}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="text-right font-semibold py-4" colSpan={2}>
                Total Amount:
              </td>
              <td className="text-right font-bold text-lg">₹{totalAmount}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ItemsOrdered;
