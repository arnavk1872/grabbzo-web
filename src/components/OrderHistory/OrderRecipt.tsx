import React from "react";
import Item from "./Item";
import Subtotal from "./Subtotal";

const OrderRecipt = () => {
  const OrderBill = {
    OrderId: 5521,
    items: [
      {
        Item: "Butter Chicken",
        Additional: "Extra Cream",
        No: 1,
        Price: 250,
      },
      {
        Item: "Garlic Naan",
        Additional: "",
        No: 5,
        Price: 150,
      },
      {
        Item: "Gulab Jamun",
        Additional: "",
        No: 2,
        Price: 100,
      },
    ],
    bill: {
      Subtotal: 500,
      Gst: 15.21,
      Platform: 15,
    },
    Total: 530.21,
    type: {
      OrderType: "Takeaway",
      CustomerName: "Harsh Ghai",
      Email: "harshghai22@gmail.com",
      TableNo: "",
      CarModel: "",
      CarNumber: "",
    },
  };
  return (
    <div className="min-w-full pl-12">
      <h3 className="text-xl font-semibold">#{OrderBill.OrderId}</h3>

      <h2 className="text-3xl font-semibold mt-10">Orders Details</h2>
      <div className="mt-12 p-10 bg-blue-50 rounded-3xl">
        <div className="w-[700px]">
          {OrderBill.items.map((item, key) => (
            <Item
              key={key}
              Item={item.Item}
              Additional={item.Additional}
              No={item.No}
              Price={item.Price}
            />
          ))}
        </div>
        <div>
          <Subtotal bill={OrderBill.bill} />
        </div>
        <div className="flex justify-between items-center pt-5">
          <h4 className="text-2xl font-medium">Total</h4>
          <h6 className="text-blue-600 font-bold text-xl">{OrderBill.Total}</h6>
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-3xl font-semibold">{OrderBill.type.OrderType}</h2>
        <div className="my-4 pl-10 py-5 bg-blue-50 rounded-3xl">
          <p className="text-gray-500">{OrderBill.type.CustomerName}</p>
          <p className="text-gray-500">{OrderBill.type.Email}</p>
          {OrderBill.type.CarModel.length > 0 && (
            <p className="text-gray-500">{OrderBill.type.CarModel}</p>
          )}
          {OrderBill.type.CarNumber.length > 0 && (
            <p className="text-gray-500">{OrderBill.type.CarNumber}</p>
          )}
          {OrderBill.type.TableNo.length > 0 && (
            <p className="text-gray-500">{OrderBill.type.TableNo}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderRecipt;
