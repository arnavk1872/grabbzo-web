"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import DashboardIcon from "../Icons/DashboardIcon";
import MenuIcon from "../Icons/MenuIcon";
import FoodIcon from "../Icons/FoodIcon";
import CustomerRevIcon from "../Icons/CustomerRevIcon";
import MessagesIcon from "../Icons/MessagesIcon";
import RocketIcon from "../Icons/RocketIcon";
import LogoutIcon from "../Icons/LogoutIcon";
import { Button } from "../UI/Button";
import { changeStatus } from "@/helpers/api-utils";
import { useRouter } from "next/navigation";

type MenuItem = {
  href: string;
  name: string;
  icon: JSX.Element;
};

interface SidebarProps {
  storeStatus: any;
}

const Sidebar: React.FC<SidebarProps> = ({ storeStatus }) => {
  const pathname = usePathname(); // Get the current route path
  const status = storeStatus === "offline" ? false : true;
  const [isOnline, setIsOnline] = useState(status);
  const router = useRouter();

  const handleToggle = () => {
    setIsOnline(!isOnline);
    changeStatus(isOnline);
  };

  const handleLogout = async () => {
    const response = await changeStatus(true);
    if (response) {
      document.cookie =
        "AuthToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      router.push("/restaurant");
    }
  };

  const menuItems: MenuItem[] = [
    { name: "Dashboard", icon: <DashboardIcon />, href: "/dashboard" },
    { name: "Orders", icon: <MenuIcon />, href: "/dashboard/orders" },
    { name: "Menu", icon: <FoodIcon />, href: "/dashboard/menus/availableItems" },
    { name: "Messages (0)", icon: <MessagesIcon />, href: "/dashboard/messages" },
    { name: "Customers Reviews", icon: <CustomerRevIcon />, href: "/dashboard/reviews" },
  ];

  return (
    <div className="flex flex-col h-fit sticky top-0 max-w-[320px] bg-white border border-borderColor p-4 mx-4 rounded-3xl font-poppins">
      <div className="space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center space-x-6 p-[5px] font-semibold text-[16px] whitespace-nowrap ${
              pathname === item.href
                ? "bg-blue-600 text-white !space-x-8"
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
        className="flex items-center p-1 w-full rounded-xl mt-2 h-[56px] cursor-pointer bg-bgGray"
      >
        <div
          className={`flex justify-center items-center h-[46px] w-1/2 p-2 rounded-xl transition-all duration-300 ${
            isOnline ? "bg-LightGreen text-white" : "text-[#8A8A8F]"
          }`}
        >
          Online
        </div>
        <div
          className={`flex justify-center items-center h-[46px] text-[#8A8A8F] w-1/2 p-2 rounded-xl transition-all duration-300 ${
            !isOnline ? "bg-Red text-white" : ""
          }`}
        >
          Offline
        </div>
      </div>

      {/* Premium Upgrade Section */}
      <div className="space-y-1">
        <div className="mt-1 p-3 bg-black text-white rounded-3xl text-center">
          <RocketIcon />
          <p className="mt-1 text-left text-[20px]">Invest in the Best: Get Premium</p>
          <Button
            onClick={() => router.push("/pricing")}
            className="mt-2 xl:px-16 px-10 font-semibold whitespace-nowrap py-2 hover:bg-yellow-600 bg-yellow-500 text-black rounded-full"
          >
            Get Premium
          </Button>
        </div>

        {/* Bottom Links */}
        <div className="flex flex-col">
          <a
            href="#"
            onClick={handleLogout}
            className="flex items-center space-x-6 px-[5px] text-[16px] font-semibold text-gray-600 hover:bg-gray-100 rounded-lg whitespace-nowrap"
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
