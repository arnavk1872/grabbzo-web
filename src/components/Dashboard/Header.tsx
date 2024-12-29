import React from "react";
import { Input } from "../UI/Input";
import Image from "next/image";
import Search from "../Icons/Search";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { DatePickerDemo } from "./DatePicker";
import Settings from "../Icons/Settings";
import Bell from "../Icons/Bell";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/UI/Popover";
import Notifications from "../Messages/Notifications";

const Header = () => {
  return (
    <section className="m-6 px-4 h-[98px] font-poppins rounded-[30px] border bg-white border-borderColor flex-shrink-0 flex items-center justify-between">
      <div className="flex items-center gap-x-24">
        {" "}
        <Image
          src={"/logo.jpg"}
          width={143}
          height={70}
          alt={"logo"}
          className="flex items-center justify-center pb-2"
        />
        {/* <div className="relative w-96">
          <Input
            className="w-full h-12 rounded-3xl bg-bgGray pl-10 pr-4 !font-poppins shadow-none !text-[18px] !font-normal"
            placeholder="Search by OrderId"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div> */}
      </div>
      <div className="flex gap-x-4 items-center">
        {/* <DatePickerDemo /> */}
        <Settings className="cursor-pointer" />
        <Popover>
          <PopoverTrigger>
            <Bell className="cursor-pointer" />
          </PopoverTrigger>
          <PopoverContent className="mr-72 "><Notifications/></PopoverContent>
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
