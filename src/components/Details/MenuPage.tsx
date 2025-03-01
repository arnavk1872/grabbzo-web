"use client";
import FileUpload from "@/components/Details/FileUpload";
import { Button } from "@/components/UI/Button";
import { Label } from "@/components/UI/Label";
import { RadioGroup, RadioGroupItem } from "@/components/UI/Radio";
import useRestaurantMenuStore from "@/store/restrauntMenuStore";
import Image from "next/image";
import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { usePageStore } from "@/store/CurrentPage";
import { S3_BASE_URL } from "@/lib/constants";

const MenuPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { currentPage, setCurrentPage } = usePageStore();
  const lastSegment: string = pathname.split("/").pop() || "information";
  useEffect(() => {
    if (currentPage.page != lastSegment) {
      router.push(`/details/${currentPage.page}`);
    }
  }, []);

  const { menuDetailsData, setMenuDetailsData } = useRestaurantMenuStore();

  const handleRadioChange = (name: string, value: string) => {
    setMenuDetailsData(name, value);
  };

  const handleFileChange = (file: File | null, field: string) => {
    setMenuDetailsData(field, file);
  };

  const isFormComplete =
    menuDetailsData.foodType &&
    menuDetailsData.deliveryToCars &&
    menuDetailsData.serviceType &&
    menuDetailsData.restaurantImage &&
    menuDetailsData.menuImage;

  const handleProceed = () => {
    // console.log(menuDetailsData);
    setCurrentPage("contract");
    router.push("/details/contract");
  };

  return (
    <div className="font-poppins ml-10 min-w-[750px]">
      <div className="flex justify-between items-center mb-1">
        <h2 className="font-semibold text-4xl">Menu Setup</h2>
        <Image
          src={`${S3_BASE_URL}/public/Menu-Setup.png`}
          width={114}
          height={73}
          alt="menu"
          className="object-contain max-w-full max-h-full"
        />
      </div>
      <div className="bg-white rounded-3xl border border-black border-opacity-25 px-5 py-8shadow-xl py-6">
        <h4 className="text-zinc-800 font-bold text-xl">
          Select the service you want to register
        </h4>
        <RadioGroup
          value={menuDetailsData.foodType}
          onValueChange={(value) => handleRadioChange("foodType", value)}
          className="flex gap-20 mt-5"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="veg" id="veg" />
            <Label htmlFor="veg">Veg</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="nonveg" id="nonveg" />
            <Label htmlFor="nonveg">Non-Veg</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="both" id="both" />
            <Label htmlFor="both">Both</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="bg-white rounded-3xl border border-black border-opacity-25 px-5 py-8shadow-xl py-6 mt-12">
        <h4 className="text-zinc-800 font-bold text-xl">
          Select the options you are providing
        </h4>
        <RadioGroup
          className="flex gap-20 mt-5"
          value={menuDetailsData.serviceType}
          onValueChange={(value) => handleRadioChange("serviceType", value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pickup" id="pickup" />
            <Label htmlFor="pickup">Pickup</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="dining" id="dining" />
            <Label htmlFor="dining">Dining</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="both" id="both" />
            <Label htmlFor="both">Both</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="bg-white rounded-3xl border border-black border-opacity-25 px-5 py-8shadow-xl py-6 mt-12">
        <h4 className="text-zinc-800 font-bold text-xl">
          Do you deliver food to Customer Cars?
        </h4>
        <RadioGroup
          className="flex gap-20 mt-5"
          value={menuDetailsData.deliveryToCars}
          onValueChange={(value) => handleRadioChange("deliveryToCars", value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="yes" />
            <Label htmlFor="yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="no" />
            <Label htmlFor="no">No</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="bg-white rounded-3xl border border-black border-opacity-25 px-5 py-8 flex flex-col gap-8 shadow-xl mt-12">
        <div>
          <h3 className="text-zinc-800 text-xl font-extrabold">
            Add Restaurant Image
          </h3>
          <span className="text-neutral-400 text-sm font-light">
            Upload at least one entrance image of your restaurant.
          </span>
        </div>
        <FileUpload
          onFileChange={(file) => handleFileChange(file, "restaurantImage")}
        />
      </div>
      <div className="bg-white rounded-3xl border border-black border-opacity-25 px-5 py-8 flex flex-col gap-8 shadow-xl mt-12">
        <div>
          <h3 className="text-zinc-800 text-xl font-extrabold">
            Add delivery menu image
          </h3>
          <span className="text-neutral-400 text-sm font-light">
            These will be used verify the item prices.
          </span>
        </div>
        <FileUpload
          onFileChange={(file) => handleFileChange(file, "menuImage")}
        />
      </div>
      <Button
        className="my-6 w-full text-white font-medium text-lg"
        disabled={!isFormComplete}
        onClick={handleProceed}
      >
        Proceed
      </Button>
    </div>
  );
};

export default MenuPage;
