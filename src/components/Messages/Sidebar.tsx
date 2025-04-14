import React from "react";
// import SearchBar from "./SearchBar";
import UserBtn from "./UserBtn";

const Sidebar = () => {
  const OrderHistory: any[] = [
    {
      name: "Harsh",
      lastMessage: "Hi, how much time it ...",
      time: "5 min",
      newMessageCount: 1,
    },
    {
      name: "Purnika",
      lastMessage: "Hi, how much time it ...",
      time: "15 min",
      newMessageCount: 1,
    },
    {
      name: "Shreesh",
      lastMessage: "Hi, how much time it ...",
      time: "25 min",
      newMessageCount: 1,
    },
    {
      name: "Arnav",
      lastMessage: "Hi, how much time it ...",
      time: "35 min",
      newMessageCount: 1,
    },
    {
      name: "Mankaran",
      lastMessage: "Hi, how much time it ...",
      time: "1 hour",
      newMessageCount: 1,
    },
    {
      name: "Ahmad",
      lastMessage: "Hi, how much time it ...",
      time: "1 hour",
      newMessageCount: 1,
    },
    {
      name: "Faizal",
      lastMessage: "Hi, how much time it ...",
      time: "4 hour",
      newMessageCount: 1,
    },
  ];
  return (
    <div className="min-w-[350px] ml- bg-white rounded-t-3xl pr-2 min-h-[50vh] font-poppins">
      <h3 className="text-center font-medium text-xl border-b-2 pb-5 mb-8 pt-2">
        Messages
      </h3>
      {/* <SearchBar /> */}
      {/* <div className="min-h-full">
        <h2 className="text-xl font-semibold text-center mt-20">
          No Orders Fulfiled Yet
        </h2>
      </div> */}
      <div className="my-5">
        {OrderHistory.map((item, key) => (
          <UserBtn
            key={key}
            name={item.name}
            lastMessage={item.lastMessage}
            time={item.time}
            newMessageCount={item.newMessageCount}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
