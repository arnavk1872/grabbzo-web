"use client";
import { Button } from "@/components/UI/Button";
import { Label } from "@/components/UI/Label";
import { RadioGroup, RadioGroupItem } from "@/components/UI/Radio";
import Image from "next/image";
import React, { useState } from "react";

const ContractPage = () => {
  const [agreement, setAgreement] = useState<string>("");

  const handleSubmit = () => {
    // Empty function for now, you can add functionality here
    console.log("Button clicked");
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
