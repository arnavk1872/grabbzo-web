"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import RestInfoIcon from "../Icons/RestInfoIcon";
import RestDocIcon from "../Icons/RestDocIcon";
import MenuSetupIcon from "../Icons/MenuSetupIcon";
import PartnerContactIcon from "../Icons/PartnerContactIcon";
import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { Label } from "@/components/UI/Label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/UI/Sheet";

type MenuItem = {
  href: string;
  name: string;
  title: string;
  icon: JSX.Element;
};

const Sidebar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const menuItems: MenuItem[] = [
    {
      name: "Restaurant Information",
      title: "Location, Owner details, Closing Day",
      icon: <RestInfoIcon />,
      href: "/details/information",
    },
    {
      name: "Restaurant Documents",
      title: "FSSAI, PAN, GST, and Bank Account",
      icon: <RestDocIcon />,
      href: "/details/document",
    },
    {
      name: "Menu Setup",
      title: "Menu Details, Food Delivery Options",
      icon: <MenuSetupIcon />,
      href: "/details/menu",
    },
    {
      name: "Partner Contract",
      title: "Channel Partnership Contract",
      icon: <PartnerContactIcon />,
      href: "/details/contract",
    },
  ];

  useEffect(() => {
    const index = menuItems.findIndex((item) => item.href === pathname);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  }, [pathname]);

  const SidebarContent = (
    <div className="space-y-8">
      {menuItems.map((item, index) => {
        const bgColor =
          index < currentIndex
            ? "#cff1e1"
            : index === currentIndex
            ? "#fff9c4"
            : "#D9D9D9";
        const borderColor =
          index < currentIndex
            ? "#46b480"
            : index === currentIndex
            ? "#FBC02D"
            : "#8E8E8E";
        return (
          <div
            key={item.name}
            className="flex items-center space-x-6 font-poppins"
          >
            <div className="relative">
              <span className={`relative z-10`}>
                {React.cloneElement(item.icon, {
                  bgColor,
                  borderColor,
                })}
              </span>
              {index < menuItems.length - 1 && (
                <div className="absolute left-[50%] top-[50%] -translate-x-1/2 h-full border border-solid border-black sm:block hidden" />
              )}
            </div>
            <div className="flex flex-col">
              <h6 className="text-xl text-black font-semibold">{item.name}</h6>
              <span className="text-[11px] text-neutral-600">{item.title}</span>
              <Link
                href={item.href}
                className={`text-indigo-700 text-xs font-semibold hover:opacity-70 ${
                  index < currentIndex ? "block" : "hidden"
                }`}
              >
                Edit Info
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col max-w-[466px] h-fit bg-white border-borderColor border rounded-3xl font-poppins ml-32 py-12 pl-12 pr-20 mt-[75px] sticky top-5 z-10">
        {SidebarContent}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-5 left-5 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="font-poppins">
              Menu
            </Button>
          </SheetTrigger>
          <SheetContent className="w-3/4">
            <SheetHeader>
              <div className="hidden">Toggle menu</div>
            </SheetHeader>

            {SidebarContent}
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default Sidebar;
