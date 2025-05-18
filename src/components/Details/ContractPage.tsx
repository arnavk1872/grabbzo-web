"use client";
import { Button } from "@/components/UI/Button";
import { Label } from "@/components/UI/Label";
import { RadioGroup, RadioGroupItem } from "@/components/UI/Radio";
import useRestaurantDocStore from "@/store/restrauntDocStore";
import useRestaurantInfoStore from "@/store/restrauntInfoStore";
import useRestaurantMenuStore from "@/store/restrauntMenuStore";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { usePageStore } from "@/store/CurrentPage";
import { S3_BASE_URL } from "@/lib/constants";
import { postRestaurantDetails } from "@/helpers/api-utils";

interface Payload {
  ownerName: string;
  emailAddress: string;
  franchise: boolean;
  flag: boolean;
  closedDay: string;
  closeTiming: string;
  serviceType: string;
  deliveryToCars: boolean;
  latitude: string;
  longitude: string;
  shopNumber: string;
  floorOrTower: string;
  areaOrSectorOrLocality: string;
  landmark: string;
  pincode: string;
  state: string;
  city: string;
  panNumber: string;
  fssaiNumber: string;
  gstinNumber: string;
  restaurantBankDetails: {
    accountNumber: string;
    ifsc: string;
  };
  restaurantName?: string; // Optional property
  isVeg?: boolean; // Optional property
  primaryMobileNo:string;
  cuisineIds:string[];
}

const ContractPage = () => {
  const [agreement, setAgreement] = useState<string>("");
  const { basicDetailsData } = useRestaurantInfoStore();
  const { docDetailsData } = useRestaurantDocStore();
  const { menuDetailsData } = useRestaurantMenuStore();
  const router = useRouter();
  const pathname = usePathname();
  const { currentPage, Franchise, canNavigateTo, setCurrentPage } =
    usePageStore();
  const lastSegment: string = pathname.split("/").pop() || "information";

  const initialize = async () => {
    await usePageStore.getState().initializeFranchise();
  };

  useEffect(() => {
    if (canNavigateTo(lastSegment)) {
      setCurrentPage(lastSegment);
    } else {
      // Otherwise, block navigation and redirect back to currentPage
      router.push(`/details/${currentPage.page}`);
    }
    initialize();
  }, []);

  // const formatDateToTimeString = (date: Date | undefined) => {
  //   const hours = date?.getHours().toString().padStart(2, "0");
  //   const minutes = date?.getMinutes().toString().padStart(2, "0");
  //   const seconds = date?.getSeconds().toString().padStart(2, "0");

  //   return `${hours}:${minutes}:${seconds}`;
  // };
  const handleSubmit = async () => {
    const payload: Payload = {
      ownerName: basicDetailsData.ownerName,
      emailAddress: basicDetailsData.email,
      franchise: Franchise,
      flag: true,
      closedDay: basicDetailsData.closedDay,
      closeTiming: basicDetailsData.closingTime,
      serviceType: menuDetailsData.serviceType,
      deliveryToCars: menuDetailsData.deliveryToCars,
      latitude: basicDetailsData.latitude,
      longitude: basicDetailsData.longitude,
      shopNumber: basicDetailsData.shopNo,
      floorOrTower: basicDetailsData.floor,
      areaOrSectorOrLocality: basicDetailsData.area,
      landmark: basicDetailsData.landmark,
      pincode: basicDetailsData.pinCode,
      state: basicDetailsData.state,
      city: basicDetailsData.city,
      panNumber: docDetailsData.panNumber,
      fssaiNumber: docDetailsData.FssaiNumber,
      gstinNumber: docDetailsData.GstNumber,
      restaurantBankDetails: {
        accountNumber: docDetailsData.BankAccountNumber,
        ifsc: docDetailsData.BankIfscCode,
      },
      primaryMobileNo:basicDetailsData.primaryMobileNo,
      cuisineIds:menuDetailsData.cuisineIds,
    };

    if (!Franchise) {
      payload.restaurantName = basicDetailsData.restaurantName;
      payload.isVeg = menuDetailsData.foodType;
    }
    const uploadData = await postRestaurantDetails(payload);
    if (uploadData.status == "success") {
      router.push("/profile-completion");
    }
  };
  return (
    <div className="font-poppins md:ml-10 max-md:mx-6 md:min-w-[750px]">
      <div className="flex md:justify-between max-md:gap-x-4 items-center mb-1">
        <h2 className="font-semibold text-4xl">Partner Contract</h2>
        <Image
          src={`${S3_BASE_URL}/public/Partner-Contract.png`}
          width={114}
          height={73}
          alt="menu"
          className="object-contain max-w-full max-h-full"
        />
      </div>
      <div className="bg-white rounded-3xl border border-black border-opacity-25 px-5 shadow-xl py-6">
        <iframe
          src={"/GRABBZO CHANNEL PARTNER AGREEMENT.pdf#toolbar=0"}
          width="720"
          height="460"
          loading="lazy"
          allowFullScreen
          className="md:block hidden"
          frameBorder="0"
        />
        <iframe
          src={"/GRABBZO CHANNEL PARTNER AGREEMENT.pdf#toolbar=0"}
          width="200"
          height="200"
          loading="lazy"
          className="md:hidden block"
          allowFullScreen
          frameBorder="0"
        />
        <RadioGroup
          className="flex md:gap-20 gap-4 mt-5"
          value={agreement}
          onValueChange={(value) => setAgreement(value)}
        >
          <h5 className="font-semibold">Do you Agree these terms</h5>
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
      <Button
        className="my-6 w-full text-white font-medium text-lg"
        disabled={agreement !== "yes"}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  );
};

export default ContractPage;
