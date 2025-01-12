"use client";
import AddressSidebar from "@/components/Details/AddressSidebar";
import { Button } from "@/components/UI/Button";
import { Checkbox } from "@/components/UI/Checkbox";
import { Input } from "@/components/UI/Input";
import { Label } from "@/components/UI/Label";
import { RadioGroup, RadioGroupItem } from "@/components/UI/Radio";
import Image from "next/image";
import React, { useState } from "react";

const InfoPage = () => {
  const [formData, setFormData] = useState({
    OwnerFullName: "",
    RestaurantName: "",
    EmailAddress: "",
    MobileNumber: "",
    ShopNo: "",
    Floor: "",
    Area: "",
    City: "",
    Lankmark: "",
    SameNumber: false,
    FoodCarDeliviry: "",
  });

  const handleInputChange = (name: string, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="font-poppins ml-10 min-w-[750px]">
      <div className="flex justify-between items-center mb-1">
        <h2 className="font-semibold text-4xl">Restaurant Information</h2>
        <Image
          src="/Restaruant-Information.png"
          width={114}
          height={73}
          alt="information"
          className="object-contain max-w-full max-h-full"
        />
      </div>
      <div className="bg-white rounded-3xl border border-black border-opacity-25 px-5 py-8 flex flex-col gap-8 shadow-xl">
        <h3 className="text-zinc-800 text-xl font-extrabold">Basic Details</h3>
        <Input
          placeholder="Owner Full Name*"
          onChange={(e) => handleInputChange("OwnerFullName", e.target.value)}
        />
        <Input
          placeholder="Restaurant Name*"
          onChange={(e) => handleInputChange("RestaurantName", e.target.value)}
        />
        <Input
          placeholder="Email Address"
          onChange={(e) => handleInputChange("EmailAddress", e.target.value)}
        />
        <Input
          placeholder="Mobile Number*"
          onChange={(e) => handleInputChange("MobileNumber", e.target.value)}
        />
        <AddressSidebar />
        <div>
          <h6 className="text-zinc-800 font-medium text-base">
            Restaurant's primary contact number
          </h6>
          <span className="text-neutral-400 text-sm font-light">
            Customers and Grabbzo may call on this number for order support
          </span>
          <div className="flex space-x-2 border border-neutral-300 w-fit p-4 rounded shadow-lg mt-3">
            <Checkbox id="same" />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="same"
                className="text-sm text-neutral-500 font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Same as Owner's Mobile Number
              </label>
            </div>
          </div>
        </div>
      </div>

      <Button className="my-6 w-full text-white font-medium text-lg" disabled>
        Proceed
      </Button>
    </div>
  );
};

export default InfoPage;
