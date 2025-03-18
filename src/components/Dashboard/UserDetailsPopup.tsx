import React, { useEffect, useState } from "react";
import { Button } from "../UI/Button";
import Image from "next/image";
import creds from "public/creds.svg";
import Link from "next/link";
import { getRestaurantPlans } from "@/helpers/api-utils";
import Diamondsvg from "@public/diamond.svg";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/AlertDialog";
import { IoClose } from "react-icons/io5";

interface PlanDetails {
  adCredit?: number;
  Plan?: string;
}

const UserDetailsPopup: React.FC = () => {
  const [planDetails, setPlanDetails] = useState<PlanDetails>({});

  useEffect(() => {
    const getPlanDetails = async () => {
      try {
        const response = await getRestaurantPlans();
        setPlanDetails(response);
      } catch (err) {
        console.error("Error in Fetching Plans", err);
      }
    };

    getPlanDetails();
  }, []);

  return (
    <div className="bg-[#d9dada] rounded-md font-poppins px-4 py-2 min-w-80">
      <div>Grabbzo Credits</div>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div className="flex items-center gap-x-4 cursor-pointer border-b border-[#8A8A8F] pb-2">
            <Image
              src={creds}
              height={1000}
              width={1000}
              alt="Credits Illustration"
              className="h-16 w-16 m-2"
            />
            <div className="font-bold text-4xl">
              ₹{planDetails?.adCredit ?? 0}
            </div>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className="font-poppins bg-[#d9dada]">
          <AlertDialogTitle className="flex justify-between items-center">
            Boost Your Restaurant’s Reach!{" "}
            <AlertDialogCancel className="border-none shadow-none bg-[#d9dada]">
              <IoClose />
            </AlertDialogCancel>
          </AlertDialogTitle>
          <div className="flex items-center justify-center flex-col text-center ">
            You have {planDetails.adCredit} Grabbzo credits available! They will
            be used to promote and attract more customers to your restaurant.
            <div className=" border-[#d9dada] z-50 border-4">
              {" "}
              <Image
                src={creds}
                height={1000}
                width={1000}
                alt="Creds Illustration"
                className="w-[180px] h-[200px] border-none"
              />
            </div>
            Promote your best dishes & offers now!
          </div>
          <div className="flex justify-center">
            <AlertDialogFooter>
              <Link href="/growth/adCredits">
                <AlertDialogAction>Get Credits</AlertDialogAction>
              </Link>
            </AlertDialogFooter>
          </div>
        </AlertDialogContent>
      </AlertDialog>
      <div>
        <div className="mt-2">Current Plan</div>
        <div className="font-semibold my-2">
          Your {planDetails?.Plan ?? "SILVER"} Plan is expiring soon!
        </div>
        <div>
          Renew your {planDetails?.Plan ?? "SILVER"} premium plan now to
          continue enjoying all the benefits!
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="text-white w-full my-1 cursor-pointer">
              Renew Plan
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="font-poppins">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex justify-between text-[20px]">
                Your {planDetails?.Plan} Plan is expiring Soon!{" "}
                <AlertDialogCancel className="border-none shadow-none">
                  <IoClose />
                </AlertDialogCancel>
              </AlertDialogTitle>
              <AlertDialogDescription className="flex items-center justify-center flex-col text-center text-[15px]">
                Don't let your premium experience end—renew today and keep
                enjoying seamless access!
                <Image
                  src={Diamondsvg}
                  height={1000}
                  width={1000}
                  alt="Diamond Illustration"
                  className="h-[350px] w-[400px] ml-16"
                />
                <div className="-mt-12 text-[15px]">
                  Stay ahead with uninterrupted access to exclusive features.
                  Renew your diamond premium plan now to continue enjoying all
                  the benefits!
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex justify-center">
              <AlertDialogFooter>
                <Link href="/pricing">
                  <AlertDialogAction className="text-white px-8 py-3 text-[16px]">
                    Renew Now
                  </AlertDialogAction>
                </Link>
              </AlertDialogFooter>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default UserDetailsPopup;
