"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/UI/Dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/UI/InputOtp";
import { Input } from "@/components/UI/Input";
import { Button } from "@/components/UI/Button";

const InputBox = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setShowOtpDialog(true);
  };

  const handleOtpVerification = async () => {
    try {
      console.log(phoneNumber, otp);
      if (phoneNumber === "9829699382") {
        const response = await fetch(
          "https://api.grabbzo.com/restaurant/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              mobileNumber: phoneNumber,
              otp: otp,
            }),
          }
        );
        const data = await response.json();
        if (data.statusCode === 200) {
          const token = "Bearer " + data.data.accessToken;
          setCookie("AuthToken", token);
          router.push("/dashboard");
        } else {
          alert("OTP is incorrect. Please try again.");
        }
      } else {
        const response = await fetch(
          "https://api.grabbzo.com/restaurant/auth/signup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              mobileNumber: phoneNumber,
              otp: otp,
            }),
          }
        );
        const data = await response.json();
        if (data.statusCode === 200) {
          const token = "Bearer " + data.data.accessToken;
          setCookie("AuthToken", token);
          router.push("/details/information");
        } else {
          alert("OTP is incorrect. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error during OTP verification", error);
      alert("An error occurred. Please try again later.");
    }
  };
  return (
    <div className="bg-white w-[45%] absolute flex flex-col justify-center items-center bottom-[15%] rounded-3xl">
      <h4 className="text-xl font-poppins font-bold text-neutral-600 pt-12">
        <span className="text-blue-600 font-extrabold">Login</span> to your
        Account
      </h4>
      <Input
        className="w-1/2 my-9"
        placeholder="Enter Phone number / Restaurant ID"
        minLength={10}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />

      <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog}>
        <Button
          className="mb-20 bg-blue-600 hover:bg-opacity-50 hover:bg-blue-600 text-white"
          size="lg"
          onClick={handleClick}
        >
          Continue
        </Button>

        <DialogContent className="flex flex-col">
          <DialogHeader>
            <DialogTitle className="pb-2 text-xl">Enter OTP</DialogTitle>
            <DialogDescription className="pb-2">
              6 digit OTP has been sent to you
            </DialogDescription>
          </DialogHeader>

          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => setOtp(value)}
          >
            <InputOTPGroup className="flex justify-center space-x-3 w-full">
              {[...Array(6)].map((_, index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  className={`w-full h-14 rounded-full text-center focus:outline-gray-500 font-bold text-xl flex items-center justify-center transition-all ${
                    otp[index] ? "bg-blue-600 text-white" : "bg-gray-100"
                  }`}
                />
              ))}
            </InputOTPGroup>
          </InputOTP>

          <div className="flex items-center mt-2 w-full">
            <span className="text-gray-500 text-sm ">
              Didn't receive the code?
            </span>
            <button
              className="text-blue-600 font-semibold ml-9 text-m"
              onClick={() => alert("A new OTP has been sent!")}
            >
              Resend Code
            </button>
          </div>

          <DialogFooter className="w-full flex justify-center">
            <Button
              className="w-full py-3 bg-blue-600 hover:bg-opacity-50 hover:bg-blue-600 text-white text-lg font-semibold"
              onClick={handleOtpVerification}
            >
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex justify-between w-full px-5 -mb-12 text-blue-600 font-semibold absolute bottom-1/4 text-xs">
        <Link className="hover:underline" href="/guidelines-and-policy">
          Guidelines and Policy
        </Link>
        <Link className="hover:underline" href="/privacy-policy">
          Privacy Policy
        </Link>
        <Link className="hover:underline" href="/channel-partner-agreement">
          Channel Partner Agreement
        </Link>
        <Link className="hover:underline" href="/terms-and-conditions">
          Terms of Services
        </Link>
        <Link
          className="hover:underline"
          href="/cancellation-and-refund-policy"
        >
          Cancellation and Refund Policy
        </Link>
      </div>
    </div>
  );
};

export default InputBox;
