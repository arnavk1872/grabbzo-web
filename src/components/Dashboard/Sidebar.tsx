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
  href: string | string[];
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


  const menuItems: MenuItem[] = [
    { name: "Dashboard", icon: <DashboardIcon />, href: "/dashboard" },
    {
      name: "Orders",
      icon: <MenuIcon />,
      href: [
        "/dashboard/orders",
        "/dashboard/orders/preparing",
        "/dashboard/orders/ready",
        "/dashboard/orders/pickedup",
      ],
    },
    {
      name: "Menu",
      icon: <FoodIcon />,
      href: ["/dashboard/menus/availableItems", "/dashboard/menus/editor"],
    },
    {
      name: "Messages (0)",
      icon: <MessagesIcon />,
      href: "/dashboard/messages",
    },
    {
      name: "Customer Reviews",
      icon: <CustomerRevIcon />,
      href: "/dashboard/reviews",
    },
  ];

  return (
    <div className="flex flex-col h-fit sticky top-0 md:max-w-[320px] bg-white border border-borderColor p-4 md:mx-4 rounded-3xl font-poppins">
      <div className="space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={Array.isArray(item.href) ? item.href[0] : item.href}
            className={`flex items-center ${
              item.name === "Menu" ? " max-sm:hidden" : ""
            } space-x-6 p-[5px] font-semibold text-[16px] whitespace-nowrap ${
              (
                Array.isArray(item.href)
                  ? item.href.includes(pathname)
                  : pathname === item.href
              )
                ? "bg-blue-600 text-white !space-x-8"
                : "text-gray-600 hover:bg-gray-100"
            } rounded-lg`}
          >
            {item.icon}
            <span>
              {item.name === "Customer Reviews" ? (
                <>
                  <span className="hidden sm:inline">Customer Reviews</span>
                  <span className="sm:hidden">Reviews</span>
                </>
              ) : (
                item.name
              )}
            </span>
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
        <div className="mt-2 p-3 bg-black text-white rounded-3xl text-center">
          <RocketIcon />
          <p className="mt-1 text-left text-[20px]">
            Invest in the Best: Get Premium
          </p>
          <Button
            onClick={() => router.push("/pricing")}
            className="mt-2 xl:px-16 px-10 font-semibold whitespace-nowrap py-2 hover:bg-yellow-600 bg-yellow-500 text-black rounded-full"
          >
            Get Premium
          </Button>
        </div>

        {/* Bottom Links */}
        {/* <div className="flex flex-col justify-center">
          <a
            href="#"
            onClick={handleLogout}
            className="flex items-center space-x-6 p-[5px] text-[16px] font-semibold text-gray-600 hover:bg-gray-100 rounded-lg whitespace-nowrap"
          >
            <LogoutIcon />
            <span className="inline-block mt-3">Logout</span>
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default Sidebar;
