"use client"
import { Button } from "@/components/UI/Button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/UI/Dialog";
import { Input } from "@/components/UI/Input";
import Image from "next/image";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/UI/InputOtp"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState<string>(''); // Store phone number input
  const [otp, setOtp] = useState<string>(''); // Store OTP input
  const router = useRouter();
  const handleClick = async () => {
    // If the number is present in DB, open the OTP Dialog box else redirect to register page.
    try {
      const response = await fetch('http://52.66.237.148/restaurant/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobileNumber: phoneNumber,
          otp: otp,
        }),
      });
      console.log(otp,phoneNumber);
      const data = await response.json();
      console.log(data);
      if (data.statusCode === 200) {
 
        router.push('/dashboard');  
      } else {
        alert("OTP is incorrect. Please try again.");
      }
    } catch (error) {
      console.error("Error during OTP verification", error);
      alert("An error occurred. Please try again later.");
    }
  }
  return (
    <div className="h-screen overflow-y-hidden flex flex-col">
      <div className="relative">
        <Image src={"/home-main.png"}
          width={1920}
          height={774}
          alt={"home-main"}
          className="h-[72vh] object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[790px] text-center flex items-center flex-col gap-5">
            <Image
              src={"/logo.jpg"}
              width={194}
              height={68}
              alt={"logo"}
              className=""
            />
            <h2 className="text-white text-[64px] font-black font-poppins leading-tight tracking-tight">
              Want to Grow your Business? Join Grabbzo!
            </h2>
            <div className="relative flex items-center justify-center">
              <div className="relative">
                <div className="w-48 h-1.5 bg-[#b3b3b3] rounded-md" />
                <div className="absolute w-20 h-1.5 bg-white rounded-md left-0 top-0" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center relative">
        <div className="bg-white w-[45%] absolute flex flex-col justify-center items-center -top-1/2 rounded-3xl">
          <h4 className="text-xl font-poppins font-bold text-neutral-600 pt-12"><span className="text-blue-600 font-extrabold">Login</span> to your Account to manage all the service and explore our tools</h4>
          <Input className="w-1/2 my-9" placeholder="Enter Phone number / Restaurant ID" minLength={10} 
           onChange={(e) => setPhoneNumber(e.target.value)}/>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mb-20 bg-blue-600 hover:bg-opacity-50 hover:bg-blue-600" size="lg">Continue</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>One-Time Password</DialogTitle>
                <DialogDescription>
                Please enter the one-time password sent to your phone.
                </DialogDescription>
              </DialogHeader>
              <InputOTP maxLength={6} value={otp} onChange={(e) => setOtp(e)}>
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
                <Button type="submit" onClick={handleClick}>Verify</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <Image src={"/home-footer.png"}
          width={1920}
          height={296}
          alt={"home-footer"}
          className="h-[28vh] object-cover"
        />
      </div>
    </div>
  );
}
