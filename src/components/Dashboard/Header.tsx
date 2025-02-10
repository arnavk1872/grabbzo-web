"use client";

import React from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/UI/Popover";
import Notifications from "../Messages/Notifications";
import Bell from "../Icons/Bell";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/UI/Sheet";
import { X } from "lucide-react";
import { ChevronRight } from "lucide-react";
import Settings from "../Icons/Settings";
import Link from "next/link";
const Header = () => {
  const Routes: any[] = [
    {
      name: "Order History",
      route: "/order-history",
    },
    {
      name: "Wallet",
      route: "/wallet",
    },
    {
      name: "Customer Issues",
      route: "dashboard/reviews",
    },
    {
      name: "Support",
      route:
        "https://mail.google.com/mail/?view=cm&fs=1&to=support@grabbzo.com&su=Support%20Request&body=Hello%20Grabbzo%20Support%20Team",
    },
  ];

  return (
    <section className="mx-6 my-3 px-4 h-[82px] font-poppins rounded-[30px] border bg-white border-borderColor flex-shrink-0 flex items-center justify-between">
      <div className="flex items-center gap-x-24">
        <Link href={"/dashboard"}>
          <Image
            src="/grabbzo.png"
            width={170}
            height={140}
            alt="logo"
            className="flex items-center justify-center pb-2 cursor-pointer"
            quality={100}
          />
        </Link>
      </div>
      <div className="flex gap-x-4 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <button className="cursor-pointer flex items-center justify-center w-12 h-12">
              <Settings className="w-12 h-12" />{" "}
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[400px] p-0">
            {/* Top bar with Close button and Settings title */}
            <div className="relative p-4 border-b flex justify-center">
              <SheetClose asChild>
                <button className="absolute top-4 left-4">
                  <X size={25} />
                </button>
              </SheetClose>
              <SheetHeader>
                <SheetTitle className="text-lg font-semibold">
                  Settings
                </SheetTitle>
              </SheetHeader>
            </div>
            {/* Avatar Section */}
            <div className="flex items-center gap-4 p-4 border-b">
              <div className="w-[80px] h-[80px] overflow-hidden">
                <Avatar className="w-full h-full rounded-md">
                  <AvatarImage
                    src="/settings_sheet_image.jpg"
                    className="object-cover"
                  />
                  <AvatarFallback>TM</AvatarFallback>
                </Avatar>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Taj Mahal Hotel</h2>
                <Link href={"/edit-details"} className="text-sm text-blue-500">
                  View Account Details
                </Link>
              </div>
            </div>
            {/* Settings Options */}
            <div className="p-4 space-y-2">
              {Routes.map((item, index) => (
                <Link
                  href={item.route}
                  key={index}
                  className="flex items-center justify-between p-3 border-b cursor-pointer hover:bg-gray-100"
                >
                  <span className="text-md">{item.name}</span>
                  <ChevronRight size={20} />
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        <Popover>
          <PopoverTrigger>
            <Bell className="cursor-pointer" />
          </PopoverTrigger>
          <PopoverContent className="mr-72">
            <Notifications />
          </PopoverContent>
        </Popover>

        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>You</AvatarFallback>
        </Avatar>
      </div>
    </section>
  );
};

export default Header;
