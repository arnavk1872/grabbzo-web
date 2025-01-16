"use client";
import FileUpload from "@/components/Details/FileUpload";
import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { Label } from "@/components/UI/Label";
import { RadioGroup, RadioGroupItem } from "@/components/UI/Radio";
import useRestaurantDocStore from "@/store/restrauntDocStore";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const DocPage = () => {
  const { docDetailsData, setDocDetailsData } = useRestaurantDocStore();
  const router = useRouter();

  const [isGstRegistered, setIsGstRegistered] = useState<string>("no");

  const handleGstRegistrationChange = (value: string) => {
    setIsGstRegistered(value);
    const gst = value === "yes";
    setDocDetailsData("IsGst", gst);
  };

  const handleInputChange = (name: string, value: string) => {
    setDocDetailsData(name, value);
  };

  const handleAccountValidation = (value: string) => {
    if (docDetailsData.BankAccountNumber !== value) {
      // console.log("Account is not same!");
    }
    setDocDetailsData("ReBankAccountNumber", value);
  };

  const handleFileChange = (file: File | null, field: string) => {
    setDocDetailsData(field, file);
    if (file) {
      // console.log(`${field} file uploaded:`, file.name);
    } else {
      // console.log(`No file selected for ${field}`);
    }
  };

  const handleClick = () => {
    // console.log(docDetailsData);
    router.push("/details/menu");
  };

  const isFormComplete =
    docDetailsData.panNumber &&
    docDetailsData.panName &&
    docDetailsData.panFile &&
    docDetailsData.FssaiNumber &&
    // docDetailsData.FssaiExpiry &&
    docDetailsData.FssaiFile &&
    docDetailsData.BankAccountNumber &&
    docDetailsData.ReBankAccountNumber &&
    docDetailsData.BankIfscCode &&
    (!docDetailsData.IsGst ||
      (docDetailsData.GstNumber && docDetailsData.GstFile));

  return (
    <div className="font-poppins ml-10 min-w-[750px]">
      <div className="flex justify-between items-center mb-1">
        <h2 className="font-semibold text-4xl">Restaurant Document</h2>
        <Image
          src="/Restaurant-Documents.png"
          width={114}
          height={73}
          alt="document"
          className="object-contain max-w-full max-h-full"
        />
      </div>
      <div className="bg-white rounded-3xl border border-black border-opacity-25 px-5 py-8 flex flex-col gap-8 shadow-xl">
        <div>
          <h3 className="text-zinc-800 text-xl font-extrabold">
            Enter PAN Details
          </h3>
          <span className="text-neutral-400 text-sm font-light">
            We will verify the legal entity with this information
          </span>
        </div>
        <Input
          placeholder="PAN Number*"
          onChange={(e) => handleInputChange("panNumber", e.target.value)}
          value={docDetailsData.panNumber}
        />
        <Input
          placeholder="Full Name As Per PAN*"
          onChange={(e) => handleInputChange("panName", e.target.value)}
          value={docDetailsData.panName}
        />
        <FileUpload
          onFileChange={(file) => handleFileChange(file, "panFile")}
        />
      </div>

      <div className="bg-white rounded-3xl border border-black border-opacity-25 px-5 py-8 flex flex-col gap-6 shadow-xl mt-12">
        <div>
          <h3 className="text-zinc-800 text-xl font-extrabold">
            GST Information
          </h3>
          <span className="text-neutral-400 text-sm font-light">
            This will help us in calculate your taxes, verify PAN to proceed
          </span>
        </div>
        <div className="">
          <h4 className="text-zinc-800 font-bold text-lg">
            Are you GST registered?
          </h4>
          <RadioGroup
            className="flex gap-16 mt-4"
            onValueChange={handleGstRegistrationChange}
            value={isGstRegistered}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="yes" />
              <Label htmlFor="yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="no" color="" />
              <Label htmlFor="no">No</Label>
            </div>
          </RadioGroup>
        </div>
        {isGstRegistered === "yes" && (
          <>
            <Input
              placeholder="GST Number*"
              onChange={(e) => handleInputChange("GstNumber", e.target.value)}
            />
            <FileUpload
              onFileChange={(file) => handleFileChange(file, "GstFile")}
            />
          </>
        )}
      </div>
      <div className="bg-white rounded-3xl border border-black border-opacity-25 px-5 py-8 flex flex-col gap-8 shadow-xl mt-12">
        <div>
          <h3 className="text-zinc-800 text-xl font-extrabold">
            FSSAI Certificate
          </h3>
          <span className="text-neutral-400 text-sm font-light">
            This is required to comply with regulations on food safety
          </span>
        </div>
        <Input
          placeholder="FSSAI Certificate Number*"
          onChange={(e) => handleInputChange("FssaiNumber", e.target.value)}
          value={docDetailsData.FssaiNumber}
        />
        {/* <Input
          placeholder="Full Name As Per PAN*"
          onChange={(e) => handleInputChange("FssaiExpiry", e.target.value)}
          value={docDetailsData.FssaiExpiry}
        /> */}
        <FileUpload
          onFileChange={(file) => handleFileChange(file, "FssaiFile")}
        />
      </div>

      <div className="bg-white rounded-3xl border border-black border-opacity-25 px-5 py-8 flex flex-col gap-8 shadow-xl mt-12">
        <div>
          <h3 className="text-zinc-800 text-xl font-extrabold">Bank details</h3>
          <span className="text-neutral-400 text-sm font-light">
            Let us know where to deposit your money
          </span>
        </div>
        <Input
          placeholder="Bank Account Number*"
          onChange={(e) =>
            handleInputChange("BankAccountNumber", e.target.value)
          }
          value={docDetailsData.BankAccountNumber}
        />
        <Input
          placeholder="Re-Enter Account Number*"
          onChange={(e) => handleAccountValidation(e.target.value)}
          value={docDetailsData.ReBankAccountNumber}
        />
        <Input
          placeholder="Bank IFSC Code*"
          onChange={(e) => handleInputChange("BankIfscCode", e.target.value)}
          value={docDetailsData.BankIfscCode}
        />
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

export default DocPage;
