import React from "react";
import Tick from "../Icons/Tick";
import Cross from "../Icons/Cross";

const Notification = () => {
  const notifications: any[] = [
    // {
    //   id: 1,
    //   name: "Inverness McKenzie",
    //   message: "A wonderful serenity has taken possession of my entire soul.",
    //   createdAt: "07 Jun 2024, 12:32PM",
    //   isRead: true,
    //   isStarred: false,
    // },
    // {
    //   id: 2,
    //   name: "Gunther Beard",
    //   message: "A wonderful serenity has taken possession of my entire soul.",
    //   createdAt: "28 Jul 2024, 10:48AM",
    //   isRead: false,
    //   isStarred: false,
    // },
    // {
    //   id: 3,
    //   name: "Archibald Northbottom",
    //   message: "A wonderful serenity has taken possession of my entire soul.",
    //   createdAt: "20 Aug 2024, 08:58AM",
    //   isRead: false,
    //   isStarred: true,
    // },
  ];

  return (
    <div className="max-w-[480px] mx-auto  ">
     {notifications.length > 0 ? (
  notifications.map((notification) => (
    <div
      key={notification.id}
      className={`p-2 mt-2 bg-white h-auto flex`}
    >
      <div
        className={`mr-2 text-xl flex items-center justify-center rounded-[30px] ${
          notification.isRead ? "text-green-500" : "text-red-500"
        }`}
      >
        {notification.isRead ? <Tick /> : <Cross />}
      </div>
      <div className="flex items-start flex-col justify-between">
        <div className="flex items-center">
          <h4 className="font-medium text-gray-800">
            {notification.name}
            <span className="mt-2 mx-2 text-[14px] text-gray-600">
              {notification.message}
            </span>
          </h4>
        </div>
        <div className="text-xs text-Red text-[15px] font-bold font-poppins">
          {notification.createdAt}
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center"></div>
    </div>
  ))
) : (
  <div className="text-center m-4 py-4 font-poppins text-gray-600">
    No notifications to show.
  </div>
)}

    </div>
  );
};

export default Notification;
