import AddressSidebar from "@/components/Details/AddressSidebar";
import { Button } from "@/components/UI/Button";
import { Checkbox } from "@/components/UI/Checkbox";
import { Input } from "@/components/UI/Input";
import { Label } from "@/components/UI/Label";
import { RadioGroup, RadioGroupItem } from "@/components/UI/Radio";
import Image from "next/image";
import React from "react";

const page = () => {
    return (
        <div className="font-poppins ml-10 min-w-[750px]">
            <div className="flex justify-between items-center mb-1">
                <h2 className="font-semibold text-4xl">
                    Restaurant Information
                </h2>
                <Image
                    src="/Restaruant-Information.png"
                    width={114}
                    height={73}
                    alt="information"
                    className="object-contain max-w-full max-h-full"
                />
            </div>
            <div className="bg-white rounded-3xl border border-black border-opacity-25 px-5 py-8 flex flex-col gap-8 shadow-xl">
                <h3 className="text-zinc-800 text-xl font-extrabold">
                    Basic Details
                </h3>
                <Input placeholder="Owner Full Name*" required />
                <Input placeholder="Restaurant Name*" required />
                <Input placeholder="Email Address" />
                <Input placeholder="Mobile Number*" required />
                <AddressSidebar />
                <div>
                    <h6 className="text-zinc-800 font-medium text-base">
                        Restaurant's primary contact number
                    </h6>
                    <span className="text-neutral-400 text-sm font-light">
                        Customers and Grabbzo may call on this number for order
                        support
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
                </div>
            </div>
            <div className="bg-white rounded-3xl border border-black border-opacity-25 px-5 py-8shadow-xl mt-12 py-6">
                <h4 className="text-zinc-800 font-bold text-xl">
                    Car Delivery
                </h4>
                <span className="text-neutral-400 text-sm font-light ">
                    You will deliver the food to the customer car
                </span>
                <RadioGroup className="flex gap-20 mt-5">
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
