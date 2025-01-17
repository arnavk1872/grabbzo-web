"use client";
import { Button } from "@/components/UI/Button";
import { Checkbox } from "@/components/UI/Checkbox";
import { Input } from "@/components/UI/Input";
import useRestaurantInfoStore from "@/store/restrauntInfoStore";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

const InfoPage = () => {
  const router = useRouter();
  const { basicDetailsData, setBasicDetailsData } = useRestaurantInfoStore();

  const handleInputChange = (name: string, value: string) => {
    setBasicDetailsData(name, value);
  };

  const handleClick = () => {
    // console.log(basicDetailsData);
    router.push("/details/document");
  };
  const isFormComplete =
    basicDetailsData.ownerName &&
    basicDetailsData.restaurantName &&
    basicDetailsData.email &&
    // basicDetailsData.mobileNumber &&
    basicDetailsData.shopNo &&
    basicDetailsData.floor &&
    basicDetailsData.area &&
    basicDetailsData.state &&
    basicDetailsData.city &&
    basicDetailsData.pinCode;

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
          onChange={(e) => handleInputChange("ownerName", e.target.value)}
          value={basicDetailsData.ownerName}
        />
        <Input
          placeholder="Restaurant Name*"
          onChange={(e) => handleInputChange("restaurantName", e.target.value)}
          value={basicDetailsData.restaurantName}
        />
        <Input
          placeholder="Email Address"
          onChange={(e) => handleInputChange("email", e.target.value)}
          value={basicDetailsData.email}
        />
        {/* <Input
          placeholder="Mobile Number*"
          onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
          value={basicDetailsData.mobileNumber}
        /> */}
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
      <div className="bg-white rounded-3xl border border-black border-opacity-25 px-5 py-8 flex flex-col gap-6 shadow-xl mt-12">
        <h3 className="text-zinc-800 text-xl font-extrabold">
          Restaurant Location
        </h3>
        <div className="grid gap-8 py-4">
          <Input
            placeholder="Shop No. / Building No.*"
            onChange={(e) => handleInputChange("shopNo", e.target.value)}
            value={basicDetailsData.shopNo}
          />
          <Input
            placeholder="Floor / Tower"
            onChange={(e) => handleInputChange("floor", e.target.value)}
            value={basicDetailsData.floor}
          />
          <Input
            placeholder="Area / Sector /Locality*"
            onChange={(e) => handleInputChange("area", e.target.value)}
            value={basicDetailsData.area}
          />
          <Input
            placeholder="State"
            onChange={(e) => handleInputChange("state", e.target.value)}
            value={basicDetailsData.state}
          />
          <Input
            placeholder="City"
            onChange={(e) => handleInputChange("city", e.target.value)}
            value={basicDetailsData.city}
          />
          <Input
            placeholder="PinCode"
            onChange={(e) => handleInputChange("pinCode", e.target.value)}
            value={basicDetailsData.pinCode}
          />
          <Input
            placeholder="Add Any Nearby Landmark (Optional)"
            onChange={(e) => handleInputChange("landmark", e.target.value)}
            value={basicDetailsData.landmark}
          />
          {/* <MapComponent /> */}
        </div>
      </div>
      <Button
        className="my-6 w-full text-white font-medium text-lg"
        disabled={!isFormComplete}
        onClick={handleClick}
      >
        Proceed
      </Button>
    </div>
  );
};

export default InfoPage;
