"use client";
import React, { KeyboardEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
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
import { postLogin, postSignup } from "@/helpers/api-utils";

const InputBox = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [login, setLogin] = useState<boolean>(true);
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    if (phoneNumber.length !== 10) {
      setError("Please enter a valid Mobile Number!");
      return;
    } else {
      setError("");
      setShowOtpDialog(true);
    }
  };

  const handleOtpVerification = async () => {
    const data = JSON.stringify({
      mobileNumber: phoneNumber,
      otp: otp,
    });
    //9829699382
    try {
      if (login) {
        const loginData = await postLogin(data);
        console.log(loginData);
        if (loginData.status === "success") {
          const token = "Bearer " + loginData.data.accessToken;
          setCookie("AuthToken", token);
          router.push("/dashboard");
        } else {
          // Notistack Error
          alert("Number not registered, Signup First");
        }
      } else {
        const signupData = await postSignup(data);
        console.log(signupData);
        if (signupData.status === "success") {
          const token = "Bearer " + signupData.data.accessToken;
          setCookie("AuthToken", token);
          router.push("/franchise");
        } else {
          // Notistack Error
          alert("Number already registered, Login");
        }
      }
    } catch (error) {
      console.error("Error during OTP verification", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    action: () => void
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      action();
    }
  };
  return (
    <div className="bg-white w-[40%] absolute flex flex-col justify-center items-center rounded-3xl left-1/2 transform -translate-x-1/2 bottom-[5%]">
      <h4 className="text-xl font-poppins font-bold text-neutral-600 pt-8">
        <span className="text-blue-600 font-extrabold pr-2">
          {login ? "Login" : "Sign Up"}
        </span>
        into your Account
      </h4>
      <Input
        className="w-2/3 mt-8 outline outline-1"
        placeholder="Enter Phone number / Restaurant ID"
        minLength={10}
        onChange={(e) => setPhoneNumber(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e, handleClick)}
      />
      <div className="mb-2 mt-1 -ml-36 text-red-500 text-[14px] h-4">
        {error}
      </div>
      <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog}>
        <Button
          className="mb-10 bg-blue-500  hover:bg-blue-600 text-white w-2/3 rounded-full"
          size="lg"
          onClick={handleClick}
        >
          Continue
        </Button>

        <DialogContent className="flex flex-col">
          <DialogHeader>
            <DialogTitle className="pb-2 text-xl">Enter OTP</DialogTitle>
            <DialogDescription className="pb-2">
              6 digit OTP has been sent
            </DialogDescription>
          </DialogHeader>

          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => setOtp(value)}
            onKeyDown={(e) => handleKeyDown(e, handleOtpVerification)}
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
              className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold"
              onClick={handleOtpVerification}
            >
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <p className="pb-2">
        {login ? "Don't have an account ?" : "Already have an account ?"}
        <button
          className="text-blue-600 hover:underline pl-2"
          onClick={() => setLogin(!login)}
        >
          {login ? "Sign Up" : "Login"}
        </button>
      </p>
    </div>
  );
};

export default InputBox;
