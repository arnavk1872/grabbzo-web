"use client";
import React from "react";
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
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import Link from "next/link";

const InputBox = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [otp, setOtp] = useState<string>(""); // Store OTP input
  const [showOtpDialog, setShowOtpDialog] = useState<boolean>(false);
  const router = useRouter();
  const handleClick = async () => {
    // Check if phone number matches predefined number before showing OTP dialog
    if (phoneNumber !== "9829699382") {
      router.push("/details/information");
      return;
    }
    setShowOtpDialog(true);
  };

  const handleOtpVerification = async () => {
    try {
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
    } catch (error) {
      console.error("Error during OTP verification", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="bg-white w-[45%] absolute flex flex-col justify-center items-center -top-1/2 rounded-3xl">
      <h4 className="text-xl font-poppins font-bold text-neutral-600 pt-12">
        <span className="text-blue-600 font-extrabold">Login</span> to your
        Account to manage all the service and explore our tools
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
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>One-Time Password</DialogTitle>
            <DialogDescription>
              Please enter the one-time password sent to your phone.
            </DialogDescription>
          </DialogHeader>
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => setOtp(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <DialogFooter>
            <Button type="submit" onClick={handleOtpVerification}>
              Verify
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="flex gap-24 -mb-12 text-blue-600 font-semibold text-lg absolute bottom-1/4">
        <Link className="hover:underline" href={"/terms-and-conditions"}>
          Terms & Conditions
        </Link>
        <Link className="hover:underline" href={"/privacy-policy"}>
          Policy Policy
        </Link>
      </div>
    </div>
  );
};

export default InputBox;
