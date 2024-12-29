"use client";
import FileUpload from "@/components/Details/FileUpload";
import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { Label } from "@/components/UI/Label";
import { RadioGroup, RadioGroupItem } from "@/components/UI/Radio";
import Image from "next/image";
import React, { useState } from "react";

const page = () => {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

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
                <h2 className="font-semibold text-4xl">Menu Setup</h2>
                <Image
                    src="/Menu-Setup.png"
                    width={114}
                    height={73}
                    alt="menu"
                    className="object-contain max-w-full max-h-full"
                />
            </div>
            <div className="bg-white rounded-3xl border border-black border-opacity-25 px-5 py-8shadow-xl py-6">
                <h4 className="text-zinc-800 font-bold text-xl">
                    What kind of food is on your menu?
                </h4>
                <RadioGroup className="flex gap-20 mt-5">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="veg" id="veg" />
                        <Label htmlFor="veg">Veg</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="nonveg" id="nonveg" />
                        <Label htmlFor="nonveg">Non-Veg</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="both" id="both" />
                        <Label htmlFor="both">Both</Label>
                    </div>
                </RadioGroup>
            </div>
            <div className="bg-white rounded-3xl border border-black border-opacity-25 px-5 py-8shadow-xl py-6 mt-12">
                <h4 className="text-zinc-800 font-bold text-xl">
                    Select the service you want to register for
                </h4>
                <RadioGroup className="flex gap-20 mt-5">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pickup" id="pickup" />
                        <Label htmlFor="pickup">Pickup</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="dining" id="dining" />
                        <Label htmlFor="dining">Dining</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="both" id="both" />
                        <Label htmlFor="both">Both</Label>
                    </div>
                </RadioGroup>
            </div>
            <div className="bg-white rounded-3xl border border-black border-opacity-25 px-5 py-8 flex flex-col gap-8 shadow-xl mt-12">
                <div>
                    <h3 className="text-zinc-800 text-xl font-extrabold">
                        Add Restaurant Image
                    </h3>
                    <span className="text-neutral-400 text-sm font-light">
                        Upload at least one entrance image of your restaurant.
                    </span>
                </div>
                <FileUpload onFileChange={handleFileChange} />
            </div>
            <div className="bg-white rounded-3xl border border-black border-opacity-25 px-5 py-8 flex flex-col gap-8 shadow-xl mt-12">
                <div>
                    <h3 className="text-zinc-800 text-xl font-extrabold">
                        Add delivery menu image
                    </h3>
                    <span className="text-neutral-400 text-sm font-light">
                        These will be used to creat your in-app menu.
                    </span>
                </div>
                <FileUpload onFileChange={handleFileChange} />
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
