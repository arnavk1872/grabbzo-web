"use client";
import Link from "next/link";
import { Button } from "../UI/Button";
import SelectFranchise from "./SelectFranchise";
import { useState } from "react";

const Franchise = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <div className="font-poppins px-12 -mt-12">
      <div className="font-semibold text-[30px]">
        Are you a Franchise Owner?
      </div>
      <div>Grow your business with Grabbzo!</div>
      <div className="flex gap-x-6 my-4">
        <Link href="details/information">
          <Button className="px-12 py-4" variant={"outline"}>
            No
          </Button>
        </Link>
        <Button
          className="text-white px-12 py-4"
          onClick={() => setIsEnabled(true)}
        >
          Yes
        </Button>
      </div>
      <section
        className={`my-8 ${isEnabled ? "" : "opacity-50 pointer-events-none"}`}
      >
        <div className="font-semibold text-[30px]">Select Your Franchise</div>
        <div>Select your franchise from the list to proceed with setup.</div>
        <SelectFranchise />
      </section>
    </div>
  );
};

export default Franchise;
