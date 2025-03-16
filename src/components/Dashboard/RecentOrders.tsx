import React from "react";

const orders = [
  {
    orderName: "Chicken & Mushroom",
    customer: "Gerard Fabiano",
    price: "₹6.20",
    status: "Received",
  },
  {
    orderName: "Roast Chicken Salad",
    customer: "Nicole Foster",
    price: "₹3.45",
    status: "Pending",
  },
  {
    orderName: "Turkey Sweet Potatoes",
    customer: "Fernando Agaro",
    price: "₹7.15",
    status: "Canceled",
  },
];

const statusColors: Record<string, string> = {
  Received: "text-green-500",
  Pending: "text-yellow-500",
  Canceled: "text-red-500",
};

const RecentlyPlacedOrders: React.FC = () => {
  return (
    <div className="bg-white rounded-[30px] border font-poppins border-borderColor p-6  flex-[1]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Recently Placed Orders</h3>
        <select className="bg-borderColor text-[#666] font-[14px] border-borderColor rounded-[16px] p-1 text-[14px]">
          <option>Last 12h</option>
          <option>Last 24h</option>
          <option>Last 48h</option>
        </select>
      </div>
      <table className="w-full text-left border-separate border-spacing-0">
        <thead>
          <tr className="bg-gray-100 border border-borderColor rounded-full overflow-hidden">
            <th className="py-2 px-4 font-medium text-gray-600 first:rounded-l-full last:rounded-r-full">
              Name
            </th>
            <th className="py-2 px-4 font-medium text-gray-600">Customer</th>
            <th className="py-2 px-4 font-medium text-gray-600">Price</th>
            <th className="py-2 px-4 font-medium text-gray-600 last:rounded-r-full">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {false ? (
            // {orders.length > 0 ? (
            orders.map((order, index) => (
              <tr key={index} className="text-[15px]">
                <td className="py-2 px-4 flex flex-col ">
                  {order.orderName}
                  <div className="text-Red font-semibold !text-[12px]">
                    {"#1765"}
                  </div>
                </td>
                <td className="py-2 px-4">{order.customer}</td>
                <td className="py-2 px-4">{order.price}</td>
                <td className={`py-2 px-4 ${statusColors[order.status]}`}>
                  {order.status}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="py-4 text-center text-gray-500">
                No Orders Yet!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecentlyPlacedOrders;
