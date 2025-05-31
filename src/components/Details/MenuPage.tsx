"use client";
import FileUpload from "@/components/Details/FileUpload";
import { Button } from "@/components/UI/Button";
import { Label } from "@/components/UI/Label";
import { RadioGroup, RadioGroupItem } from "@/components/UI/Radio";
import useRestaurantMenuStore from "@/store/restrauntMenuStore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { usePageStore } from "@/store/CurrentPage";
import { S3_BASE_URL } from "@/lib/constants";
import { getCuisines, uploadDocuments } from "@/helpers/api-utils";
import { useSnackbar } from "notistack";
import { Badge } from "../UI/Badge";
import { X } from "lucide-react";

type Cuisine = {
  id: string;
  name: string;
};

const MenuPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [cuisineList, setCuisineList] = useState<Cuisine[]>([]);
  const [selectedCuisine, setSelectedCuisine] = useState<string>("");
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const { currentPage, setCurrentPage, Franchise, canNavigateTo } =
    usePageStore();
  const lastSegment: string = pathname.split("/").pop() || "information";
  const { menuDetailsData, setMenuDetailsData, initializeIsVeg } =
    useRestaurantMenuStore();

  useEffect(() => {
    const getCuisineList = async () => {
      const data = await getCuisines();
      setCuisineList(data);
    };
    getCuisineList();
  }, []);

  useEffect(
    () => setMenuDetailsData("cuisineId", selectedCuisines),
    [selectedCuisines]
  );

  const handleAddCuisine = () => {
    if (
      selectedCuisine &&
      !selectedCuisines.includes(selectedCuisine) &&
      selectedCuisines.length < 4
    ) {
      const updated = [...selectedCuisines, selectedCuisine];
      setSelectedCuisines(updated);
      setSelectedCuisine("");
    }
  };

  const handleRemoveCuisine = (cuisineId: string) => {
    const updated = selectedCuisines.filter((id) => id !== cuisineId);
    setSelectedCuisines(updated);
  };

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

  const { enqueueSnackbar } = useSnackbar();

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
    (Franchise ? true : menuDetailsData.image && menuDetailsData.foodType);

  const handleProceed = () => {
    setCurrentPage("contract");
    router.push("/details/contract");
  };

  return (
    <div className="font-poppins sm:ml-32 md:ml-10 md:min-w-[750px] max-md:-mt-10">
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
      <section className="bg-white rounded-3xl border border-black border-opacity-25 px-4 max-sm:mx-4 shadow-xl py-6">
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

        <div className="mt-4">
          <label className="font-medium mb-1 mt-6 block">
            Select up to 4 cuisines that you serve
          </label>
          <div className="flex items-center gap-2">
            <select
              value={selectedCuisine}
              onChange={(e) => setSelectedCuisine(e.target.value)}
              className="border w-full h-[40px] rounded-xl px-2"
            >
              <option value="">Select Cuisine</option>
              {cuisineList.map((cuisine) => (
                <option
                  key={cuisine.id}
                  value={cuisine.id}
                  disabled={selectedCuisines.includes(cuisine.id)}
                >
                  {cuisine.name}
                </option>
              ))}
            </select>
            <button
              onClick={handleAddCuisine}
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm disabled:opacity-50 h-[40px]"
              disabled={!selectedCuisine || selectedCuisines.length >= 4}
            >
              Add
            </button>
          </div>

          <div className="flex gap-2 flex-wrap mt-2">
            {selectedCuisines.map((cuisineId) => {
              const cuisine = cuisineList.find((c) => c.id == cuisineId);
              return (
                <Badge
                  key={cuisineId}
                  className="flex items-center gap-1 bg-gray-200 text-gray-800 px-2 py-1"
                >
                  {cuisine?.name}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => handleRemoveCuisine(cuisineId)}
                  />
                </Badge>
              );
            })}
          </div>
        </div>
      </section>

      <div className="bg-white rounded-3xl border border-black border-opacity-25 px-5 shadow-xl py-6 mt-12">
        <h4 className="text-zinc-800 font-bold text-xl">
          Select the options you are providing
        </h4>
        <RadioGroup
          className="flex gap-20 mt-5"
          value={menuDetailsData.serviceType}
          onValueChange={(value) => handleRadioChange("serviceType", value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="TAKEAWAY" id="TAKEAWAY" />
            <Label htmlFor="pickup">Pickup</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="DINEIN" id="DINEIN" />
            <Label htmlFor="dining">Dining</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="BOTH" id="BOTH" />
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
        <FileUpload onFileChange={(file) => handleFileChange(file, "image")} />
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
        <FileUpload onFileChange={(file) => handleFileChange(file, "menu")} />
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
