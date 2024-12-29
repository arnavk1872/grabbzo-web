import React from "react";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../UI/Sheet";
import { Button } from "../UI/Button";

import { ArrowRight } from "lucide-react";
import { Input } from "../UI/Input";
import MapComponent from "./MapComponent";

const AddressSidebar = () => {
    return (
        <div>
            <Sheet>
                <SheetTrigger className="relative text-blue-600 font-semibold text-base py-2 w-full border hover:opacity-80 flex justify-center hover:text-opacity-100">
                    Add Restaurants Location
                    <ArrowRight className="absolute right-5" />
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle className="text-stone-500 font-semibold">
                            Add Restaurant Location
                        </SheetTitle>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                        <Input placeholder="Shop No. / Building No." />
                        <Input placeholder="Floor /tower" />
                        <Input placeholder="Area /sector /Locality*" />
                        <Input placeholder="City" />
                        <Input placeholder="Add Any Nearby Landmark (Optional)" />
                        {/* <MapComponent /> */}
                    </div>
                    <SheetFooter>
                        <SheetClose asChild>
                            <Button type="submit" className="text-white">
                                Save Restaurant Address
                            </Button>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default AddressSidebar;
