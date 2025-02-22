"use client";
import React, { useState } from "react";
import EditPencil from "../Icons/EditPencil";
import LeftArrow from "../Icons/LeftArrow";
import Link from "next/link";
import Image from "next/image";
import { Input } from "../UI/Input";
import { Button } from "../UI/Button";
import { EditFormSchema } from "./formSchema";
import { updateRestaurantDetails } from "@/helpers/api-utils";
import { S3_BASE_URL } from "@/lib/constants";

interface User {
  id: number;
  name: string | null;
  mobileNumber: string;
  email: string | null;
  imageUrl: string | null;
  emailVerified: boolean;
  provider: string;
  providerId: string | null;
  status: string;
  roles: Array<{
    id: number;
    name: string;
  }>;
}

interface RestaurantBankDetails {
  id?: number;
  accountNumber: string;
  ifsc: string;
  accountHolderName?: string;
  bankName?: string;
}

interface RestaurantDetails {
  id?: number;
  user?: User;
  ownerName: string;
  restaurantName: string;
  restaurantImageUrl: string | null;
  emailAddress: string;
  mobileNumber: string;
  latitude: string;
  longitude: string;
  shopNumber: string;
  floorOrTower: string;
  areaOrSectorOrLocality: string;
  landmark: string;
  pincode: string;
  state: string;
  city: string;
  isVeg: boolean;
  rating: number;
  panNumber: string;
  fssaiNumber: string;
  gstinNumber: string;
  isOnline?: boolean;
  restaurantBankDetails: RestaurantBankDetails;
}

interface ResEditProps {
  data: RestaurantDetails;
}

const RestaurantEditPage: React.FC<ResEditProps> = ({ data }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [restaurantData, setRestaurantData] = useState<RestaurantDetails>({
    ownerName: data.ownerName,
    restaurantName: data.restaurantName,
    restaurantImageUrl: data.restaurantImageUrl,
    emailAddress: data.emailAddress,
    mobileNumber: data.mobileNumber,
    latitude: data.latitude,
    longitude: data.longitude,
    shopNumber: data.shopNumber,
    floorOrTower: data.floorOrTower,
    areaOrSectorOrLocality: data.areaOrSectorOrLocality,
    landmark: data.landmark,
    pincode: data.pincode,
    state: data.state,
    city: data.city,
    isVeg: data.isVeg,
    rating: data.rating,
    panNumber: data.panNumber,
    fssaiNumber: data.fssaiNumber,
    gstinNumber: data.gstinNumber,
    restaurantBankDetails: {
      accountNumber: data.restaurantBankDetails.accountNumber,
      ifsc: data.restaurantBankDetails.ifsc,
    },
  });

  const setEditDetailsData = (key: string, value: any) => {
    setRestaurantData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const validateForm = () => {
    const validationResult = EditFormSchema.safeParse(restaurantData);
    const validationErrors: Record<string, string> = {};
    if (!validationResult.success) {
      validationResult.error.errors.forEach((err) => {
        const path = err.path.join(".");
        validationErrors[path] = err.message;
      });
    }
    setErrors(validationErrors);
    return validationErrors;
  };

  const handleBtnClick = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setEdit(false);
      const res = await updateRestaurantDetails(restaurantData);
    }
  };
  return (
    <div className="mx-24">
      <div className="flex items-center justify-between  mt-16">
        <div className="flex items-center">
          <Link href={"/dashboard"}>
            <LeftArrow className="h-12 w-fit cursor-pointer hover:opacity-50" />
          </Link>
          <h2 className="text-3xl font-semibold pr-4">
            Restaurant Information
          </h2>
          <div onClick={() => setEdit(true)}>
            <EditPencil
              className={`cursor-pointer ${edit ? "hidden" : "block"}`}
            />
          </div>
        </div>
        <Button
          className={`${edit ? "block" : "hidden"} text-white`}
          onClick={handleBtnClick}
        >
          Save Changes
        </Button>
      </div>
      <div className="my-12 mx-24 flex gap-10">
        <Image
          src={`${S3_BASE_URL}/public/settings_sheet_image.jpg`}
          width={1000}
          height={1000}
          alt="Restaurant-Image"
          className="h-80 rounded-3xl w-fit"
        />
        <div className="w-full">
          <h3 className="text-xl font-medium mb-5"> Basic Details</h3>
          <div className="flex justify-between">
            <div>
              <p className="mb-3">Owner Name</p>
              <Input
                value={restaurantData.ownerName}
                disabled={!edit}
                onChange={(e) => {
                  setEditDetailsData("ownerName", e.target.value);
                  setErrors((prev) => ({ ...prev, ownerName: "" }));
                }}
                className="pr-10"
              />
              <div className="ml-2 text-red-500 text-[14px]">
                {errors.ownerName}
              </div>
            </div>
            <div>
              <p className="mb-3">Restaurant Name</p>
              <Input
                value={restaurantData.restaurantName}
                disabled
                className="pr-10"
              />
            </div>
          </div>
          <div className="flex justify-between mt-5">
            <div>
              <p className="mb-3">Email Address</p>
              <Input
                value={restaurantData.emailAddress}
                disabled={!edit}
                className="pr-10"
                onChange={(e) => {
                  setEditDetailsData("emailAddress", e.target.value);
                  setErrors((prev) => ({ ...prev, emailAddress: "" }));
                }}
              />
              <div className="ml-2 text-red-500 text-[14px]">
                {errors.emailAddress}
              </div>
            </div>
            <div>
              <p className="mb-3">Mobile Number</p>
              <Input
                value={restaurantData.mobileNumber}
                disabled
                className="pr-10"
              />
            </div>
          </div>
          <div className="mt-10">
            <h3 className="text-xl font-medium"> Location Details</h3>
            <div className="flex justify-between mt-5">
              <div>
                <p>Shop No. / Building No.</p>
                <Input
                  value={restaurantData.shopNumber}
                  disabled={!edit}
                  onChange={(e) => {
                    setEditDetailsData("shopNumber", e.target.value);
                    setErrors((prev) => ({ ...prev, shopNumber: "" }));
                  }}
                  className="pr-10"
                />
                <div className="ml-2 text-red-500 text-[14px]">
                  {errors.shopNumber}
                </div>
              </div>
              <div>
                <p>Floor / Tower</p>
                <Input
                  value={restaurantData.floorOrTower}
                  disabled={!edit}
                  onChange={(e) => {
                    setEditDetailsData("floorOrTower", e.target.value);
                    setErrors((prev) => ({ ...prev, floorOrTower: "" }));
                  }}
                  className="pr-10"
                />
                <div className="ml-2 text-red-500 text-[14px]">
                  {errors.floorOrTower}
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-5">
              <div>
                <p>Area / Sector / Locality</p>
                <Input
                  value={restaurantData.areaOrSectorOrLocality}
                  disabled={!edit}
                  onChange={(e) => {
                    setEditDetailsData(
                      "areaOrSectorOrLocality",
                      e.target.value
                    );
                    setErrors((prev) => ({
                      ...prev,
                      areaOrSectorOrLocality: "",
                    }));
                  }}
                  className="pr-10"
                />
                <div className="ml-2 text-red-500 text-[14px]">
                  {errors.areaOrSectorOrLocality}
                </div>
              </div>
              <div>
                <p>Pincode</p>
                <Input
                  value={restaurantData.pincode}
                  disabled
                  className="pr-10"
                />
              </div>
            </div>
            <div className="flex justify-between mt-5">
              <div>
                <p>State</p>
                <Input
                  value={restaurantData.state}
                  disabled
                  className="pr-10"
                />
              </div>
              <div>
                <p>City</p>
                <Input value={restaurantData.city} disabled className="pr-10" />
              </div>
            </div>
            <div className="mt-5">
              <p>Landmark</p>
              <Input
                value={restaurantData.landmark}
                disabled={!edit}
                onChange={(e) => {
                  setEditDetailsData("landmark", e.target.value);
                  setErrors((prev) => ({ ...prev, landmark: "" }));
                }}
                className="w-fit pr-10"
              />
              <div className="ml-2 text-red-500 text-[14px]">
                {errors.landmark}
              </div>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-xl font-medium"> Bank Details</h3>
            <div className="flex justify-between mt-5">
              <div>
                <p>Bank Account Number</p>
                <Input
                  value={restaurantData.restaurantBankDetails.accountNumber}
                  disabled
                  className="pr-10"
                />
              </div>
              <div>
                <p>Bank IFSC Code</p>
                <Input
                  value={restaurantData.restaurantBankDetails.ifsc}
                  disabled
                  className="pr-10"
                />
              </div>
            </div>
          </div>
          <div className="mt-10">
            <h3 className="text-xl font-medium"> Document Details</h3>
            <div className="flex justify-between mt-5">
              <div>
                <p>GST Number</p>
                <Input
                  value={restaurantData.gstinNumber}
                  disabled
                  className="pr-10"
                />
              </div>
              <div>
                <p>FSSAI Code</p>
                <Input
                  value={restaurantData.fssaiNumber}
                  disabled
                  className="pr-10"
                />
              </div>
            </div>
            <div className="mt-5">
              <p>PAN Number</p>
              <Input
                value={restaurantData.panNumber}
                disabled
                className="w-fit pr-10"
              />
            </div>
          </div>
        </div>
      </div>
      <p className="text-end mb-5">
        Want to change the disabled fields. Write a mail to us
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=support@grabbzo.com&su=Support%20Request&body=Hello%20Grabbzo%20Support%20Team,"
          target="_blank"
          className="text-blue-600 font-medium pl-3 hover:underline"
        >
          Click Here
        </a>
      </p>
    </div>
  );
};

export default RestaurantEditPage;
