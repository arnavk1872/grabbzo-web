"use client";
import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import useRestaurantInfoStore from "@/store/restrauntInfoStore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BasicFormSchema } from "./formSchema";
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
import { Label } from "../UI/Label";
import TimePicker from "./TimePicker";

const InfoPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { currentPage, setCurrentPage, Franchise, canNavigateTo } =
    usePageStore();
  const lastSegment: string = pathname.split("/").pop() || "information";
  const [loading, setLoading] = useState(false);

  const initialize = async () => {
    await usePageStore.getState().initializeFranchise();
  };

  const { basicDetailsData, setBasicDetailsData, initializeRestaurantName } =
    useRestaurantInfoStore();

  useEffect(() => {
    const loadRestaurantName = async () => {
      if (Franchise) {
        setLoading(true);
        await initializeRestaurantName();
        setLoading(false);
      }
    };

    if (canNavigateTo(lastSegment)) {
      setCurrentPage(lastSegment);
    } else {
      router.push(`/details/${currentPage.page}`);
    }

    initialize();
    loadRestaurantName();
  }, []);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [city, setCity] = useState<string[]>([]);
  const [sameAsOwner, setSameAsOwner] = useState(true);

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

  const setDateWrapper = (date: string | undefined, value: string) => {
    if (value === "openingTime") {
      setBasicDetailsData("openingTime", date);
    } else {
      setBasicDetailsData("closingTime", date);
    }
  };

  const handleStateChange = (value: string) => {
    setBasicDetailsData("state", value);
    const state = states.find((state) => state.key == value);
    if (state) {
      setBasicDetailsData("state", state.name);
    }
    setCity(cities[value]);
  };

  const handleCheckboxChange = (e: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setSameAsOwner(e.target.checked);
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
    <div className="font-poppins max-md:mx-6 sm:ml-32 md:ml-10  md:min-w-[750px] max-md:-mt-10">
      <div className="flex justify-between items-center mb-1">
        <h2 className="font-semibold text-2xl sm:text-4xl">
          Restaurant Information
        </h2>
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
        <div className="relative">
          <Input
            placeholder="Restaurant Name*"
            onChange={(e) => {
              setBasicDetailsData("restaurantName", e.target.value);
              setErrors((prev) => ({ ...prev, restaurantName: "" }));
            }}
            value={basicDetailsData.restaurantName}
            // disabled={Franchise}
          />
          {loading && (
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
              ⏳
            </span>
          )}
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
        <div>
          <h6 className="text-zinc-800 font-medium text-base">
            Restaurant's primary contact number
          </h6>
          <span className="text-neutral-400 text-sm font-light">
            Customers and Grabbzo may call on this number for order support
          </span>
          <div className="flex space-x-2  w-fit mt-3">
            <input
              type="checkbox"
              id="sameAsOwner"
              checked={sameAsOwner}
              onChange={handleCheckboxChange}
              className="p-2 cursor-pointer"
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="same"
                className="text-sm text-neutral-500 font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Same as Owner's Mobile Number
              </label>
            </div>
          </div>
          {!sameAsOwner && (
            <input
              type="tel"
              value={basicDetailsData.primaryMobileNo}
              onChange={(e) =>
                setBasicDetailsData("primaryMobileNo", e.target.value)
              }
              placeholder="Enter primary contact number"
              className="w-full p-2 mt-4 border rounded-md"
            />
          )}
        </div>
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
        <div className="flex justify-around">
          {" "}
          <div>
            <Label className="text-sm font-medium">
              Set Opening Time{" "}
              <span className="text-[12px]">(24hr format)</span>
            </Label>

            <TimePicker
              date={basicDetailsData.openingTime}
              setDate={(date) => setDateWrapper(date, "openingTime")}
              value={"openingTime"}
            />
          </div>
          <div>
            <Label className="text-sm font-medium">
              Set Closing Time{" "}
              <span className="text-[12px]">(24hr format)</span>
            </Label>

            <TimePicker
              date={basicDetailsData.closingTime}
              setDate={(date) => setDateWrapper(date, "closingTime")}
              value={"closingTime"}
            />
          </div>
        </div>
      </div>
      {/*LOCATION SECTION*/}
      <div className="bg-white rounded-3xl border border-black border-opacity-25 px-5 py-8 flex flex-col gap-6 shadow-xl mt-12">
        <h3 className="text-zinc-800 text-xl font-extrabold">
          Restaurant Location
        </h3>
        <MapComponent />
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
            <SelectTrigger
              className="text-gray-800"
              disabled={!basicDetailsData.state}
            >
              <SelectValue>{basicDetailsData.city || "City"}</SelectValue>
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
