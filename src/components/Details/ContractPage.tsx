"use client";
import { Button } from "@/components/UI/Button";
import { Label } from "@/components/UI/Label";
import { RadioGroup, RadioGroupItem } from "@/components/UI/Radio";
import useRestaurantDocStore from "@/store/restrauntDocStore";
import useRestaurantInfoStore from "@/store/restrauntInfoStore";
import useRestaurantMenuStore from "@/store/restrauntMenuStore";
import axios from "axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { useState } from "react";
import { enqueueSnackbar } from "notistack";

const ContractPage = () => {
  const [agreement, setAgreement] = useState<string>("");
  const { basicDetailsData } = useRestaurantInfoStore();
  const { docDetailsData } = useRestaurantDocStore();
  const { menuDetailsData } = useRestaurantMenuStore();
  const router = useRouter();
  const handleSubmit = async () => {
    // console.log("Button clicked");
    // Do the API call
    const payload = {
      ownerName: basicDetailsData.ownerName,
      restaurantName: basicDetailsData.restaurantName,
      restaurantImage: "baaase64_encoded_image_here",
      emailAddress: basicDetailsData.email,
      mobileNumber: basicDetailsData.mobileNumber,
      latitude: "40.7128",
      longitude: "-74.0060",
      shopNumber: basicDetailsData.shopNo,
      floorOrTower: basicDetailsData.floor,
      areaOrSectorOrLocality: basicDetailsData.area,
      landmark: basicDetailsData.landmark,
      pincode: basicDetailsData.pinCode,
      state: basicDetailsData.state,
      city: basicDetailsData.city,
      isVeg: false,
      rating: 4.5,
      panNumber: docDetailsData.panNumber,
      fssaiNumber: docDetailsData.FssaiNumber,
      gstinNumber: "qwerty",
      restaurantBankDetails: {
        accountHolderName: basicDetailsData.restaurantName,
        accountNumber: docDetailsData.BankAccountNumber,
        ifsc: docDetailsData.BankIfscCode,
        bankName: "HDFC Bank",
      },
    };
    const signupPayload = {
      mobileNumber: basicDetailsData.mobileNumber,
      otp: "123456",
    };
    // console.log(signupPayload, payload);
    // try {
    //   const signupResponse = await axios.post(
    //     "https://api.grabbzo.com/restaurant/auth/signup",
    //     signupPayload
    //   );
    //   console.log(signupResponse);
    const token: string =
      "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwibmFtZSI6IjEiLCJyb2xlcyI6WyJSRVNUQVVSQU5UIl0sInVzZXJJZCI6MSwiaWF0IjoxNzM3MDUzNDk4LCJleHAiOjE3Mzc5MTc0OTh9.LUAzAQ-HklEn8qfidpt03XsZRKCof5AgafIknWgS9Griq0vovjP0rfH-hldx9PhjW1Naz2YUGCbKIrQgf-7W9A";
    setCookie("AuthToken", token);

    //   await axios.post(
    //     "https://api.grabbzo.com/restaurant-admins/update",
    //     payload,
    //     {
    //       headers: {
    //         Authorization: `${token}`,
    //       },
    //     }
    //   );
    const message = "SignUp is Successful";
    // enqueueSnackbar(message, {
    //   preventDuplicate: true,
    //   variant: "success",
    //   autoHideDuration: 5000,
    // });
    router.push("/dashboard");
    // } catch (error) {
    //   // Handle errors
    //   console.error("Error updating data:", error);
    //   alert("Failed to update data, please try again.");
    // }
  };
  return (
    <div className="font-poppins ml-10 min-w-[750px]">
      <div className="flex justify-between items-center mb-1">
        <h2 className="font-semibold text-4xl">Partner Contract</h2>
        <Image
          src="/Partner-Contract.png"
          width={114}
          height={73}
          alt="menu"
          className="object-contain max-w-full max-h-full"
        />
      </div>
      <div className="bg-white rounded-3xl border border-black border-opacity-25 px-5 py-8shadow-xl py-6">
        <iframe
          src={"/GRABBZO CHANNEL PARTNER AGREEMENT.pdf#toolbar=0"}
          width="720"
          height="460"
          loading="lazy"
          allowFullScreen
          frameBorder="0"
        />
        <RadioGroup
          className="flex gap-20 mt-5"
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
