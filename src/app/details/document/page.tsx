"use client";
import FileUpload from "@/components/Details/FileUpload";
import { Button } from "@/components/UI/Button";
import { Checkbox } from "@/components/UI/Checkbox";
import { Input } from "@/components/UI/Input";
import { Label } from "@/components/UI/Label";
import { RadioGroup, RadioGroupItem } from "@/components/UI/Radio";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const page = () => {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [isGstRegistered, setIsGstRegistered] = useState<string>("no");

    const handleGstRegistrationChange = (value: string) => {
        setIsGstRegistered(value);
    };

    const handleFileChange = (file: File | null) => {
        setUploadedFile(file);
        if (file) {
            console.log("Uploaded file:", file.name);
        } else {
            console.log("No file selected");
        }
    };
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
                <Input placeholder="PAN Number*" required />
                <Input placeholder="Full Name As Per PAN*" required />
                <FileUpload onFileChange={handleFileChange} />
            </div>

            <div className="bg-white rounded-3xl border border-black border-opacity-25 px-5 py-8 flex flex-col gap-6 shadow-xl mt-12">
                <div>
                    <h3 className="text-zinc-800 text-xl font-extrabold">
                        GST Information
                    </h3>
                    <span className="text-neutral-400 text-sm font-light">
                        This will help us in calculate your taxes, verify PAN to
                        proceed
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
                        <Input placeholder="GST Number*" required />
                        <FileUpload onFileChange={handleFileChange} />
                    </>
                )}
            </div>
            <div className="bg-white rounded-3xl border border-black border-opacity-25 px-5 py-8 flex flex-col gap-8 shadow-xl mt-12">
                <div>
                    <h3 className="text-zinc-800 text-xl font-extrabold">
                        FSSAI Certificate
                    </h3>
                    <span className="text-neutral-400 text-sm font-light">
                        This is required to comply with regulations on food
                        safety
                    </span>
                </div>
                <Input placeholder="FSSAI Certificate Number*" required />
                <Input placeholder="Full Name As Per PAN*" required />
                <FileUpload onFileChange={handleFileChange} />
            </div>

            <div className="bg-white rounded-3xl border border-black border-opacity-25 px-5 py-8 flex flex-col gap-8 shadow-xl mt-12">
                <div>
                    <h3 className="text-zinc-800 text-xl font-extrabold">
                        Bank details
                    </h3>
                    <span className="text-neutral-400 text-sm font-light">
                        Let us know where to deposit your money
                    </span>
                </div>
                <Input placeholder="Bank Account Number*" required />
                <Input placeholder="Re-Enter Account Number*" required />
                <Input placeholder="Bank IFSC Code*" required />
            </div>

            <Button
                className="my-6 w-full text-white font-medium text-lg"
                disabled
            >
                Proceed
            </Button>
        </div>
    );
};

export default page;
