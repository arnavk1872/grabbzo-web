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
import { uploadDocuments } from "@/helpers/api-utils";
import { useSnackbar } from "notistack";

const MenuPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { currentPage, setCurrentPage, Franchise,canNavigateTo } = usePageStore();
  const lastSegment: string = pathname.split("/").pop() || "information";
  const { menuDetailsData, setMenuDetailsData, initializeIsVeg } =
    useRestaurantMenuStore();

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
    initializeIsVeg();
  }, []);

  const {enqueueSnackbar} = useSnackbar();

  const handleRadioChange = (name: string, value: boolean | string) => {
    setMenuDetailsData(name, value);
  };


    const handleFileChange = async (file: File | null, documentType: string) => {
      if (!file) return;
    
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("documentType", documentType);
       
        const response = await uploadDocuments(formData);
  
        enqueueSnackbar("File successfully Added", {
          variant: "success",
          className: "font-poppins",
        });
  
        if (response?.documentUrl) {
          setMenuDetailsData(documentType, file);
        }
      } catch (error) {
        console.error("File upload failed:", error);
      }
    };

  const isFormComplete =
  menuDetailsData.deliveryToCars !== null && 
  menuDetailsData.serviceType &&
  (Franchise
    ? true
    : menuDetailsData.image &&
      menuDetailsData.foodType);

  const handleProceed = () => {
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
          value={menuDetailsData.foodType === true ? "veg" : "nonveg"}
          onValueChange={(value) =>
            handleRadioChange("foodType", value == "veg" ? true : false)
          }
          className="flex gap-20 mt-5"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="veg" id="veg" disabled={Franchise} />
            <Label htmlFor="veg">Veg</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="nonveg" id="nonveg" disabled={Franchise} />
            <Label htmlFor="nonveg">Veg / Non-Veg</Label>
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
            <RadioGroupItem value="PICKUP" id="PICKUP" />
            <Label htmlFor="pickup">Pickup</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="DINEIN" id="DINEIN" />
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
          value={menuDetailsData.deliveryToCars == true ? "yes" : "no"}
          onValueChange={(value) =>
            handleRadioChange("deliveryToCars", value == "yes" ? true : false)
          }
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
      <div
        className={`bg-white rounded-3xl border border-black border-opacity-25 px-5 py-8 flex flex-col gap-8 shadow-xl mt-12 ${
          Franchise ? "hidden" : "block"
        }`}
      >
        <div>
          <h3 className="text-zinc-800 text-xl font-extrabold">
            Add Restaurant Image
          </h3>
          <span className="text-neutral-400 text-sm font-light">
            Upload at least one entrance image of your restaurant.
          </span>
        </div>
        <FileUpload
          onFileChange={(file) => handleFileChange(file, "image")}
        />
      </div>
      <div
        className={`bg-white rounded-3xl border border-black border-opacity-25 px-5 py-8 flex flex-col gap-8 shadow-xl mt-12 ${
          Franchise ? "hidden" : "block"
        }`}
      >
        <div>
          <h3 className="text-zinc-800 text-xl font-extrabold">
            Add delivery menu image
          </h3>
          <span className="text-neutral-400 text-sm font-light">
            These will be used verify the item prices.
          </span>
        </div>
        <FileUpload
          onFileChange={(file) => handleFileChange(file, "image")}
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
