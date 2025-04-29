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
import {
  getFlag,
  getRestaurantPlans,
  postLogin,
  postSignup,
  sendOtp,
} from "@/helpers/api-utils";
import { numbers } from "./data";
import { useSnackbar } from "notistack";
import { getDaysLeft } from "@/lib/utils";
import { usePageStore } from "@/store/CurrentPage";

const InputBox = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [login, setLogin] = useState<boolean>(true);
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [isContinueDisabled, setIsContinueDisabled] = useState(false);

  const { setPlanDetails } = usePageStore();
  const router = useRouter();

  const handleClick = async () => {
    if (phoneNumber.length !== 10) {
      setError("Please enter a valid Mobile Number!");
      return;
    } else {
      if (!numbers.includes(phoneNumber)) {
        const sendOtpResponse = await sendOtp(phoneNumber);
      }
      setError("");
      setShowOtpDialog(true);
    }
  };

  const handleOtpVerification = async () => {
    const data = JSON.stringify({
      mobileNumber: phoneNumber,
      otp: otp,
    });

    if (!otp) {
      enqueueSnackbar("Please enter the OTP to continue", {
        variant: "warning",
        className: "font-poppins",
      });
      return;
    }

    try {
      if (login) {
        const loginData = await postLogin(data);
        if (loginData.status === "success") {
          const token = "Bearer " + loginData.data.accessToken;
          setCookie("AuthToken", token);
          const routeData = await getFlag();
          if (routeData.flag === false) {
            if (routeData.franchise) {
              router.push("/details/information");
            } else {
              router.push("/franchise");
            }
          }
          try {
            const planDetails = await getRestaurantPlans();
            setPlanDetails(planDetails);
            const daysLeft = getDaysLeft(planDetails?.Expiry);
            if (daysLeft === "Plan Expired") {
              setCookie("planExpired", true);
              return router.push("plan-expired");
            } else {
              router.push("/dashboard");
            }
          } catch (err) {
            console.log("Error fetching plan details", err);
          }
        } else {
          // Notistack Error
          enqueueSnackbar("Number not registered, Signup First", {
            variant: "error",
            className: "font-poppins",
          });
        }
      } else {
        const signupData = await postSignup(data);
        if (signupData.status === "success") {
          const token = "Bearer " + signupData.data.accessToken;
          setCookie("AuthToken", token);
          router.push("/franchise");
        }
      }
    } catch (error) {
      console.error("Error during OTP verification", error);
      if (login) {
        enqueueSnackbar("Something went wrong. Please try again later.", {
          variant: "error",
          className: "font-poppins",
        });
      } else {
        enqueueSnackbar("Number already registered, Login.", {
          variant: "error",
          className: "font-poppins",
        });
      }
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
      <h4 className="text-xl font-bold text-neutral-600 pt-8">
        <span className="text-blue-600 font-extrabold pr-2">
          {login ? "Login" : "Sign Up"}
        </span>
        into your Account
      </h4>
      <Input
        className="w-2/3 mt-8 outline outline-1"
        placeholder="Enter Phone number"
        minLength={10}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <div className="mb-2 mt-1 -ml-36 text-red-500 text-[14px] h-4">
        {error}
      </div>
      <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog}>
        <Button
          className="mb-6 bg-blue-500   hover:bg-blue-600 text-white w-2/3 font-semibold rounded-full"
          onClick={() => {
            handleClick();
            setIsContinueDisabled(true);
            setTimeout(() => {
              setIsContinueDisabled(false);
            }, 5000);
          }}
          disabled={isContinueDisabled}
        >
          Continue
        </Button>

        <DialogContent className="flex flex-col font-poppins">
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
              onClick={() =>
                enqueueSnackbar("A new OTP has been sent!", {
                  variant: "success",
                  className: "font-poppins",
                })
              }
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
      <p className="pb-4">
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
