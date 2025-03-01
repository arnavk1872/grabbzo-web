"use client";

import Header from "@/components/Dashboard/Header";
import React, { useState } from "react";
import { Slider } from "@/components/discounts/Slider";
import { Button } from "@/components/UI/Button";
import { useRouter } from "next/navigation";
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
import OffersDiscounts from "@/components/discounts/OffersDiscounts";

const Page = () => {
  const [discount, setDiscount] = useState(20);
  const [maxCap, setMaxCap] = useState<number | "No max cap">(100);

  const [customerType, setCustomerType] = useState("All customers");
  const discountCaps: (number | "No max cap")[] = [
    "No max cap",
    50,
    75,
    100,
    150,
    200,
  ];

  const customerOptions = ["All customers", "New customers"];
  const router = useRouter();
  return (
    <div className="px-2">
      <Header />
      <div className="font-poppins px-8 py-4">
        {/* Header */}

        <OffersDiscounts />

        {/* Select Discount */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Select your discount</h2>
          <Slider
            value={[discount]}
            onValueChange={(value) => setDiscount(value[0])}
            className="h-10 cursor-pointer"
          />

          <p className="text-lg font-semibold mt-2">
            {discount}% off{" "}
            {maxCap === "No max cap" ? "" : `up to ${maxCap} Rs`}
          </p>

          {/* Max Cap Selection */}
          <div className="flex gap-2 mt-4">
            {discountCaps.map((cap, index) => (
              <Button
                key={index}
                className={`px-4 py-2 border ${
                  maxCap === cap
                    ? "bg-blue-600 text-white"
                    : "bg-white text-blue-600 border-blue-600"
                }`}
                onClick={() => setMaxCap(cap ?? Infinity)}
              >
                {cap === null ? "No max cap" : `₹${cap}`}
              </Button>
            ))}
          </div>
        </div>

        {/* Applicable for */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Applicable for</h2>
          <div className="flex gap-2 mt-2">
            {customerOptions.map((option, index) => (
              <Button
                key={index}
                className={`px-4 py-2 border ${
                  customerType === option
                    ? "bg-blue-600 text-white"
                    : "bg-white text-blue-600 border-blue-600"
                }`}
                onClick={() => setCustomerType(option)}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>

        {/* Mealtime Selection */}
        {/* <div className="mt-6">
          <h2 className="text-lg font-semibold">Mealtime</h2>
          <div className="flex gap-2 mt-2">
            {mealtimeOptions.map((meal, index) => (
              <Button
                key={index}
                className={`px-4 py-2 border ${mealtime === meal ? "bg-blue-600 text-white" : "bg-white text-blue-600 border-blue-600"}`}
                onClick={() => setMealtime(meal)}
              >
                {meal}
              </Button>
            ))}
          </div>
        </div> */}

        {/* Duration Selection */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Duration</h2>
          <div className="flex gap-4 mt-2">
            <Button className="bg-blue-100 text-gray-500 px-6 py-2 ">
              Start At
            </Button>
            <Button className="bg-blue-100 text-gray-500 px-6 py-2 ">
              End At
            </Button>
          </div>
        </div>

        {/* Confirm Button */}
        <div className="mt-6">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="bg-blue-600 text-white px-6 py-3 min-w-[150px]">
                Confirm
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="font-poppins">
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmation</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to publish this offer? Once confirmed,
                  it will be visible to customers as per the selected time and
                  conditions.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="text-white">
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export default Page;
