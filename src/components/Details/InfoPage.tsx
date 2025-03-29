"use client";
import { Button } from "@/components/UI/Button";
import { Checkbox } from "@/components/UI/Checkbox";
import { Input } from "@/components/UI/Input";
import useRestaurantInfoStore from "@/store/restrauntInfoStore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BasicFormSchema } from "./formSchema";
// import { City, ICity, State } from "country-state-city";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../UI/Select";
import MapComponent from "./MapComponent";
import { usePageStore } from "@/store/CurrentPage";
import { usePathname } from "next/navigation";
import { S3_BASE_URL } from "@/lib/constants";
import { cities, days, states } from "./data";
import { TimePickerDemo } from "./TimePicker";
import { Label } from "../UI/Label";

const InfoPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { currentPage, setCurrentPage, Franchise } = usePageStore();
  const lastSegment: string = pathname.split("/").pop() || "information";

  const initialize = async () => {
    await usePageStore.getState().initializeFranchise();
  };

  const { basicDetailsData, setBasicDetailsData, initializeRestaurantName } =
    useRestaurantInfoStore();

  useEffect(() => {
    if (currentPage.page != lastSegment) {
      router.push(`/details/${currentPage.page}`);
    }
    initialize();
    initializeRestaurantName();
  }, []);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [city, setCity] = useState<string[]>([]);
  const validateForm = () => {
    const validationResult = BasicFormSchema.safeParse(basicDetailsData);
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


  const setDateWrapper = (date: Date | undefined) => {
    setBasicDetailsData("closingTime", date);
  };

  const handleStateChange = (value: string) => {
    setBasicDetailsData("state", value);
    const state = states.find((state) => state.key == value);
    if (state) {
      setBasicDetailsData("state", state.name);
    }
    setCity(cities[value]);
  };

  const handleClick = () => {
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0 && isFormComplete) {
      setCurrentPage("document");
      router.push("/details/document");
    }
  };
  const isFormComplete =
    basicDetailsData.ownerName &&
    basicDetailsData.restaurantName &&
    basicDetailsData.closedDay &&
    basicDetailsData.email &&
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
          src={`${S3_BASE_URL}/public/Restaruant-Information.png`}
          width={114}
          height={73}
          alt="information"
          className="object-contain max-w-full max-h-full"
        />
      </div>
      <div className="bg-white rounded-3xl border border-black border-opacity-25 px-5 py-8 flex flex-col gap-8 shadow-xl">
        <h3 className="text-zinc-800 text-xl font-extrabold">Basic Details</h3>
        <div>
          <Input
            placeholder="Owner Full Name*"
            onChange={(e) => {
              setBasicDetailsData("ownerName", e.target.value);
              setErrors((prev) => ({ ...prev, ownerName: "" }));
            }}
            value={basicDetailsData.ownerName}
          />
          <div className="ml-2 text-red-500 text-[14px]">
            {errors.ownerName}
          </div>
        </div>
        <div>
          <Input
            placeholder="Restaurant Name*"
            onChange={(e) => {
              setBasicDetailsData("restaurantName", e.target.value);
              setErrors((prev) => ({ ...prev, restaurantName: "" }));
            }}
            value={basicDetailsData.restaurantName}
            disabled={Franchise}
          />

          <div className="ml-2 text-red-500 text-[14px]">
            {errors.restaurantName}
          </div>
        </div>
        <div>
          <Input
            placeholder="Email Address"
            onChange={(e) => {
              setBasicDetailsData("email", e.target.value);
              setErrors((prev) => ({ ...prev, email: "" }));
            }}
            value={basicDetailsData.email}
          />
          <div className="ml-2 text-red-500 text-[14px]">{errors.email}</div>
        </div>
        {/* <div>
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
        </div> */}
        <Select
          value={basicDetailsData.closedDay || "Select Closed Day"}
          onValueChange={(value) => setBasicDetailsData("closedDay", value)}
        >
          <SelectTrigger className="text-gray-800">
            <SelectValue>
              {basicDetailsData.closedDay || "Select Closed Day"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {days.map((option) => (
              <SelectItem key={option.key} value={option.name}>
                {option.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div>
          <Label className="pl-2 text-base font-medium">
            Set Your Closing Time
          </Label>
          <TimePickerDemo
            date={basicDetailsData.closingTime}
            setDate={setDateWrapper}
          />
        </div>
      </div>
      <div className="bg-white rounded-3xl border border-black border-opacity-25 px-5 py-8 flex flex-col gap-6 shadow-xl mt-12">
        <h3 className="text-zinc-800 text-xl font-extrabold">
          Restaurant Location
        </h3>
        <div className="grid gap-8 py-4">
          <div>
            <Input
              placeholder="Shop No. / Building No.*"
              onChange={(e) => {
                setBasicDetailsData("shopNo", e.target.value);
                setErrors((prev) => ({ ...prev, shopNo: "" }));
              }}
              value={basicDetailsData.shopNo}
            />
            <div className="ml-2 text-red-500 text-[14px]">{errors.shopNo}</div>
          </div>
          <div>
            <Input
              placeholder="Floor / Tower"
              onChange={(e) => {
                setBasicDetailsData("floor", e.target.value);
                setErrors((prev) => ({ ...prev, floor: "" }));
              }}
              value={basicDetailsData.floor}
            />
            <div className="ml-2 text-red-500 text-[14px]">{errors.floor}</div>
          </div>
          <div>
            <Input
              placeholder="Area / Sector /Locality*"
              onChange={(e) => {
                setBasicDetailsData("area", e.target.value);
                setErrors((prev) => ({ ...prev, area: "" }));
              }}
              value={basicDetailsData.area}
            />
            <div className="ml-2 text-red-500 text-[14px]">{errors.area}</div>
          </div>
          <Select
            value={basicDetailsData.state || "Select State"}
            onValueChange={handleStateChange}
          >
            <SelectTrigger className="text-gray-800">
              <SelectValue>
                {basicDetailsData.state || "Select State"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {states.map((option) => (
                <SelectItem key={option.key} value={option.key}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={basicDetailsData.city || ""}
            onValueChange={(value) => setBasicDetailsData("city", value)}
          >
            <SelectTrigger className="text-gray-800">
              <SelectValue placeholder="City*" />
            </SelectTrigger>
            <SelectContent>
              {city?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div>
            <Input
              placeholder="PinCode"
              onChange={(e) => {
                setBasicDetailsData("pinCode", e.target.value);
                setErrors((prev) => ({ ...prev, pinCode: "" }));
              }}
              value={basicDetailsData.pinCode}
            />
            <div className="ml-2 text-red-500 text-[14px]">
              {errors.pinCode}
            </div>
          </div>
          <Input
            placeholder="Add Any Nearby Landmark (Optional)"
            onChange={(e) => {
              setBasicDetailsData("landmark", e.target.value);
            }}
            value={basicDetailsData.landmark}
          />

          <MapComponent />
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
