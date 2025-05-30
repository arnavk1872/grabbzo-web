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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/AlertDialog";
import Bell from "../Icons/Bell";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/UI/Sheet";
import { Wallet, X } from "lucide-react";
import { ChevronRight } from "lucide-react";
import Settings from "../Icons/Settings";
import Link from "next/link";
import { S3_BASE_URL } from "@/lib/constants";
import UserDetailsPopup from "./UserDetailsPopup";
import { usePageStore } from "@/store/CurrentPage";
import { Button } from "../UI/Button";
import Sidebar from "./Sidebar";
import { changeStatus } from "@/helpers/api-utils";
import { useRouter } from "next/navigation";

const Header = ({ storeStatus }: { storeStatus: boolean }) => {
  const { planDetails } = usePageStore();
  const ownerName = planDetails["Owner Name"]?.charAt(0) || "";
  const restaurantName = planDetails["Restaurant Name"] || "Restaurant";
  console.log(restaurantName, planDetails, "planDetails");

  const router = useRouter();

  const handleLogout = async () => {
    const response = await changeStatus(true);
    if (response) {
      document.cookie =
        "AuthToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      router.push("/restaurant");
    }
  };

  const Routes: any[] = [
    {
      name: "Growth",
      route: "/growth",
    },
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
        // "https://mail.google.com/mail/?view=cm&fs=1&to=support@grabbzo.com&su=Support%20Request&body=Hello%20Grabbzo%20Support%20Team",
        "/support",
    },
  ];

  return (
    <section className="mx-6 my-3 px-4 h-[82px] font-poppins rounded-[30px] border bg-white border-borderColor flex-shrink-0 flex items-center justify-between">
      <div className=" items-center ">
        <Link href={"/dashboard"} className="md:block hidden">
          <Image
            src={`${S3_BASE_URL}/public/Grabbzo-main-logo.png`}
            width={170}
            height={140}
            alt="logo"
            className="flex items-center justify-center pb-2 cursor-pointer"
            quality={100}
          />
        </Link>
        {/* Mobile Menu Button */}
        <div className=" items-center justify-center  cursor-pointer md:hidden block">
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
              <Sidebar storeStatus={storeStatus} />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex gap-x-4 items-center">
        <Link href="/wallet">
          <div className="border rounded-full border-borderColor p-2 flex items-center mt-1 justify-center gap-x-2 pr-3 cursor-pointer ">
            <Wallet className="text-[#8a8a8f]" />
            <span className="font-poppins font-medium">₹0 </span>
          </div>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <button className="cursor-pointer flex items-center justify-center w-12 h-12">
              <Settings className="w-12 h-12" />{" "}
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] md:w-[400px] p-0">
            {/* Top bar with Close button and Settings title */}
            <div className="relative p-4 border-b flex justify-center">
              <SheetClose asChild>
                <button className="absolute top-4 left-4">
                  <X size={25} />
                </button>
              </SheetClose>
              <SheetHeader>
                <SheetTitle className="text-lg font-semibold font-poppins">
                  Settings
                </SheetTitle>
              </SheetHeader>
            </div>
            {/* Avatar Section */}
            <div className="flex items-center gap-4 p-4 border-b">
              <div className="w-[80px] h-[80px] overflow-hidden">
                <Avatar className="w-full h-full rounded-md">
                  <AvatarImage
                    src={`${S3_BASE_URL}/public/settings_sheet_image.jpg`}
                    width={1000}
                    height={1000}
                    className="object-cover"
                  />
                  <AvatarFallback>TM</AvatarFallback>
                </Avatar>
              </div>
              <div className="font-poppins">
                <h2 className="text-lg font-semibold">{restaurantName}</h2>
                <Link href={"/edit-details"} className="text-sm text-blue-500">
                  View Account Details
                </Link>
              </div>
            </div>
            {/* Settings Options */}
            <div className="p-4 space-y-2 font-poppins">
              {Routes.map((item, index) => (
                <Link
                  href={item.route}
                  key={index}
                  className={`flex items-center justify-between p-3 border-b cursor-pointer hover:bg-gray-100 ${
                    item.name === "Order History" ? "hidden md:flex" : ""
                  }`}
                >
                  <span className="text-md">{item.name}</span>
                  <ChevronRight size={20} />
                </Link>
              ))}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="w-full text-left flex items-center justify-between p-3 cursor-pointer text-red-500 hover:bg-red-100  font-poppins">
                    <span className="text-md">Logout</span>
                    <ChevronRight size={20} />
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="font-poppins">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirmation</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to Logout ?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="text-white bg-red-500 hover:bg-red-600"
                      onClick={handleLogout}
                    >
                      Logout
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </SheetContent>
        </Sheet>
        <div className="md:block hidden mt-2">
          <Popover>
            <PopoverTrigger>
              <Bell className="cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent className="mr-72">
              <Notifications />
            </PopoverContent>
          </Popover>
        </div>
        <Popover>
          <PopoverTrigger>
            <Avatar>
              <AvatarImage />
              <AvatarFallback className="text-[18px] bg-green-100">
                {ownerName}
              </AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="mr-20">
            <UserDetailsPopup />
          </PopoverContent>
        </Popover>
      </div>
    </section>
  );
};

export default Header;
