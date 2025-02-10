import React from "react";
import SearchBar from "./SearchBar";
import UserBtn from "./UserBtn";

const Sidebar = () => {
  const OrderHistory: any[] = [
    {
      orderNumber: 5521,
      date: "January 27, 2025 at 9:25 PM",
      amount: 505.21,
    },
    {
      orderNumber: 5522,
      date: "January 26, 2025 at 6:15 PM",
      amount: 215.01,
    },
    {
      orderNumber: 5523,
      date: "January 26, 2025 at 3:46 PM",
      amount: 455.01,
    },
    {
      orderNumber: 5554,
      date: "January 25, 2025 at 10:10 PM",
      amount: 145.0,
    },
    {
      orderNumber: 5558,
      date: "January 25, 2025 at 4:55 PM",
      amount: 511.47,
    },
    {
      orderNumber: 5567,
      date: "January 25, 2025 at 1:58 PM",
      amount: 741.61,
    },
    {
      orderNumber: 5601,
      date: "January 25, 2025 at 12:03 PM",
      amount: 55.91,
    },
  ];
  return (
    <div className="min-w-[350px] ml-12 bg-white rounded-3xl min-h-[75vh]">
      <h3 className="text-center font-medium text-xl border-b-2 py-5 mb-8 ">
        Order History
      </h3>
      <SearchBar />
      <div className="">
        <h2 className="text-xl font-semibold text-center mt-20">
          No Orders Fulfiled Yet
        </h2>
      </div>
      {/* <div className="my-5">
        {OrderHistory.map((item, key) => (
          <UserBtn
            key={key}
            orderNumber={item.orderNumber}
            date={item.date}
            amount={item.amount}
          />
        ))}
      </div> */}
    </div>
  );
};

export default Sidebar;
