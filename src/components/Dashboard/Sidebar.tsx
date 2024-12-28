"use client";

import React, { useState } from "react";
import DashboardIcon from "../Icons/DashboardIcon";
import MenuIcon from "../Icons/MenuIcon";
import FoodIcon from "../Icons/FoodIcon";
import UploadMenuIcon from "../Icons/UploadMenuIcon";
import CustomerRevIcon from "../Icons/CustomerRevIcon";
import MessagesIcon from "../Icons/MessagesIcon";
import RocketIcon from "../Icons/RocketIcon";
import HelpIcon from "../Icons/HelpIcon";
import LogoutIcon from "../Icons/LogoutIcon";
import Link from "next/link";
import { Button } from "../UI/Button";
import { changeStatus } from "@/helpers/api-utils";

type MenuItem = {
  href: string;
  name: string;
  icon: JSX.Element;
};

const Sidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>("Dashboard");
  const [isOnline, setIsOnline] = useState(true);

  const handleToggle = () => {
    setIsOnline(!isOnline);
    changeStatus(isOnline);
  };

  // Function to handle item click
  const handleItemClick = (itemName: string) => {
    setActiveItem(itemName);
  };

  // Main navigation items
  const menuItems: MenuItem[] = [
    {
      name: "Dashboard",
      icon: <DashboardIcon />,
      href: "/dashboard",
    },
    { name: "Orders", icon: <MenuIcon />, href: "/dashboard/orders" },
    {
      name: "Menus",
      icon: <FoodIcon />,
      href: "/dashboard/menus/availableItems",
    },
    // {
    //   name: "Upload Menu",
    //   icon: <UploadMenuIcon />,
    //   href: "/dashboard/",
    // },
    {
      name: "Customers Reviews",
      icon: <CustomerRevIcon />,
      href: "/dashboard/reviews",
    },
    {
      name: "Messages (0)",
      icon: <MessagesIcon />,
      href: "/dashboard/messages",
    },
  ];

  return (
    <div className="flex flex-col max-w-[320px] h-screen bg-white border-borderColor border p-4 mx-4 rounded-3xl font-poppins">
      {/* Dashboard and Menu Links */}
      <div className="space-y-4">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => handleItemClick(item.name)}
            className={`flex items-center space-x-6 p-[5px] font-medium text-[16px] whitespace-nowrap ${
              activeItem === item.name
                ? "bg-blue-600 text-white !space-x-10"
                : "text-gray-600 hover:bg-gray-100"
            } rounded-lg`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </div>

      {/* Online/Offline Toggle */}
      <div
        onClick={handleToggle}
        className={`flex items-center p-1 w-full rounded-xl mt-8 h-[56px] cursor-pointer ${"bg-bgGray"}`}
      >
        <div
          className={`flex justify-center items-center h-[46px] w-1/2 p-2 rounded-xl transition-all duration-300 ${
            isOnline ? " bg-LightGreen text-white" : "text-[[#8A8A8F]"
          }`}
        >
          Online
        </div>
        <div
          className={`flex justify-center items-center h-[46px] text-[#8A8A8F] w-1/2 p-2 rounded-xl transition-all duration-300 ${
            !isOnline ? "bg-Red text-white " : ""
          }`}
        >
          Offline
        </div>
      </div>

      {/* Premium Upgrade Section */}
      <div className="mt-auto space-y-3">
        <div className="mt-8 p-4 bg-black text-white rounded-3xl text-center">
          <RocketIcon />
          <p className="mt-2 text-left text-[24px]">
            Updating your plan for Premium!
          </p>
          <Button className="mt-4 xl:px-16 px-10 font-semibold whitespace-nowrap py-2 hover:bg-yellow-600 bg-yellow-500 text-black rounded-full">
            Upgrade Now
          </Button>
        </div>

        {/* Bottom Links */}
        <div className="flex flex-col ">
          <a
             href="https://mail.google.com/mail/?view=cm&fs=1&to=support@grabbzo.com&su=Support%20Request&body=Hello%20Grabbzo%20Support%20Team," target="_blank"
            className="flex items-center space-x-6 p-6 text-[18px] text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <HelpIcon />
            <span>Get Help</span>
          </a>

          <a
            href="#"
            className="flex items-center space-x-2 p-2 text-[18px] text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <LogoutIcon />
            <span>Logout</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
