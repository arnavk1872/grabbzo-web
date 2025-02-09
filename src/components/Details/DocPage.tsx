"use client";
import FileUpload from "@/components/Details/FileUpload";
import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import useRestaurantDocStore from "@/store/restrauntDocStore";
import Image from "next/image";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { DocFormSchema } from "./formSchema";
import docs from "public/Restaurant-Documents.png";
import { usePageStore } from "@/store/CurrentPage";

const DocPage = () => {
  const { docDetailsData, setDocDetailsData } = useRestaurantDocStore();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const router = useRouter();
  const pathname = usePathname();
  const { currentPage, setCurrentPage } = usePageStore();
  const lastSegment: string = pathname.split("/").pop() || "information";

  if (currentPage.page != lastSegment) {
    router.push(`/details/${currentPage}`);
    return;
  }

  const handleAccountValidation = (value: string) => {
    if (docDetailsData.BankAccountNumber !== value) {
      setErrors((prev) => ({
        ...prev,
        ReBankAccountNumber: "Account Number does not match!!",
      }));
    } else {
      setErrors((prev) => ({ ...prev, ReBankAccountNumber: "" }));
    }
    setDocDetailsData("ReBankAccountNumber", value);
  };

  const handleFileChange = (file: File | null, field: string) => {
    setDocDetailsData(field, file);
  };

  const validateForm = () => {
    const validationResult = DocFormSchema.safeParse(docDetailsData);
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

  const handleProceedClick = () => {
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0 && isFormComplete) {
      setCurrentPage("menu");
      router.push("/details/menu");
    }
  };

  const isFormComplete =
    docDetailsData.panNumber &&
    docDetailsData.panName &&
    docDetailsData.panFile &&
    docDetailsData.FssaiNumber &&
    docDetailsData.FssaiFile &&
    docDetailsData.BankAccountNumber &&
    docDetailsData.ReBankAccountNumber &&
    docDetailsData.BankIfscCode &&
    docDetailsData.GstNumber &&
    docDetailsData.GstFile;

  return (
    <div className="font-poppins ml-10 min-w-[750px]">
      <div className="flex justify-between items-center mb-1">
        <h2 className="font-semibold text-4xl">Restaurant Document</h2>
        <Image
          src={docs}
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
        <div>
          <Input
            placeholder="PAN Number*"
            onChange={(e) => {
              setDocDetailsData("panNumber", e.target.value);
              setErrors((prev) => ({ ...prev, panNumber: "" }));
            }}
            value={docDetailsData.panNumber}
          />
          <div className="ml-2 text-red-500 text-[14px]">
            {errors.panNumber}
          </div>
        </div>
        <div>
          <Input
            placeholder="Full Name As Per PAN*"
            onChange={(e) => {
              setDocDetailsData("panName", e.target.value);
              setErrors((prev) => ({ ...prev, panName: "" }));
            }}
            value={docDetailsData.panName}
          />
          <div className="ml-2 text-red-500 text-[14px]">{errors.panName}</div>
        </div>
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
        <div>
          <Input
            placeholder="GST Number*"
            onChange={(e) => {
              setDocDetailsData("GstNumber", e.target.value);
              setErrors((prev) => ({ ...prev, GstNumber: "" }));
            }}
            value={docDetailsData.GstNumber}
          />
          <div className="ml-2 text-red-500 text-[14px]">
            {errors.GstNumber}
          </div>
        </div>
        <FileUpload
          onFileChange={(file) => handleFileChange(file, "GstFile")}
        />
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
        <div>
          <Input
            placeholder="FSSAI Certificate Number*"
            onChange={(e) => {
              setDocDetailsData("FssaiNumber", e.target.value);
              setErrors((prev) => ({ ...prev, FssaiNumber: "" }));
            }}
            value={docDetailsData.FssaiNumber}
          />
          <div className="ml-2 text-red-500 text-[14px]">
            {errors.FssaiNumber}
          </div>
        </div>
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
        <div>
          <Input
            placeholder="Bank Account Number*"
            onChange={(e) => {
              setDocDetailsData("BankAccountNumber", e.target.value);
              setErrors((prev) => ({ ...prev, BankAccountNumber: "" }));
              handleAccountValidation(docDetailsData.ReBankAccountNumber);
            }}
            value={docDetailsData.BankAccountNumber}
          />
          <div className="ml-2 text-red-500 text-[14px]">
            {errors.BankAccountNumber}
          </div>
        </div>
        <div>
          <Input
            placeholder="Re-Enter Account Number*"
            type="password"
            onChange={(e) => handleAccountValidation(e.target.value)}
            value={docDetailsData.ReBankAccountNumber}
          />
          <div className="ml-2 text-red-500 text-[14px]">
            {errors.ReBankAccountNumber}
          </div>
        </div>
        <div>
          <Input
            placeholder="Bank IFSC Code*"
            onChange={(e) => {
              setDocDetailsData("BankIfscCode", e.target.value);
              setErrors((prev) => ({ ...prev, BankIfscCode: "" }));
            }}
            value={docDetailsData.BankIfscCode}
          />
          <div className="ml-2 text-red-500 text-[14px]">
            {errors.BankIfscCode}
          </div>
        </div>
      </div>

      <Button
        className="my-6 w-full text-white font-medium text-lg"
        disabled={!isFormComplete}
        onClick={handleProceedClick}
      >
        Proceed
      </Button>
    </div>
  );
};

export default DocPage;
