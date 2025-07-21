"use client";

import * as React from "react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/UI/Button";
import { Calendar } from "@/components/UI/Calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/UI/Popover";
import CalendarIcon from "../Icons/CalendarIcon";

export function DatePickerDemo() {
  const [date, setDate] = React.useState<Date>();
  const today = new Date();

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dayOfWeek = dayNames[today.getDay()];
  const day = today.getDate();
  const month = monthNames[today.getMonth()];
  const year = today.getFullYear();

  const formattedDate = `${dayOfWeek}, ${day} ${month} ${year}`;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal rounded-full h-[50px]",
            !date && "text-muted-foreground"
          )}
        >
          <div className="h-8 w-8 bg-bgGray rounded-full flex items-center justify-center">
            <CalendarIcon />
          </div>

          {date ? (
            format(date, "PPP")
          ) : (
            <span className=" text-[14px] font-semibold text-black">
              {formattedDate}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          //   initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
