"use client";

import React, { useState } from "react";
import { Slider } from "@/components/discounts/Slider";
import { Button } from "@/components/UI/Button";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/UI/Dropdown";
import { Input } from "@/components/UI/Input";
import { addNewDiscount } from "@/helpers/api-utils";
import { useSnackbar } from "notistack";

const CustomDiscount = () => {
  const [discount, setDiscount] = useState(20);
  const [maxCap, setMaxCap] = useState<number | "No max cap">(100);
  const [selectedItem, setSelectedItem] = useState<string>("");
  const couponOptions: string[] = ["TRYNEW", "GRABBIT"];
  const handleSelect = (item: string): void => setSelectedItem(item);

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

  const { enqueueSnackbar } = useSnackbar();

  const handleConfirm = async () => {
    if (!selectedItem) {
      alert("Please select a coupon code.");
      return;
    }

    const payload = {
      discount: {
        percentage: discount,
        maxCap: maxCap === "No max cap" ? null : maxCap,
      },
      coupon: {
        code: selectedItem,
      },
      applicable_for: customerType,
    };

    try {
      const response = await addNewDiscount(payload);
      enqueueSnackbar("Discount added successfully !", {
        variant: "success",
        className: "font-poppins",
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      console.error("Error in Adding Discount:", error);
      enqueueSnackbar(errorMessage, {
        variant: "error",
        className: "font-poppins",
      });
    }
  };

  return (
    <>
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Select your discount</h2>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Input
              type="text"
              value={selectedItem}
              readOnly
              placeholder="Select coupon code"
              className="cursor-pointer mt-2"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {couponOptions.map((option) => (
              <DropdownMenuItem
                className="cursor-pointer"
                key={option}
                onSelect={() => handleSelect(option)}
              >
                {option}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Slider
          value={[discount]}
          onValueChange={(value) => setDiscount(value[0])}
          className="h-10 cursor-pointer"
        />

        <p className="text-lg font-semibold mt-2">
          {discount}% off {maxCap === "No max cap" ? "" : `up to ₹${maxCap}`}
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
                Are you sure you want to publish this offer? Once confirmed, it
                will be visible to customers as per the selected time and
                conditions.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="text-white" onClick={handleConfirm}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
};

export default CustomDiscount;
