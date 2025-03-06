"use client"

import React, { useState } from 'react'
import { Slider } from '../discounts/Slider'
import { Button } from '../UI/Button';
import { buyAdCredits } from '@/helpers/api-utils';
import { useSnackbar } from 'notistack';
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

const BuyAdCredits = () => {

    const [ads,setAds] = useState(100);

    const {enqueueSnackbar} = useSnackbar();

    const processCredits = async() => {
     const response = await buyAdCredits(ads);
     enqueueSnackbar(response.message, {
      variant: "success",
      className: "font-poppins",
    });
    }
  return (
    <div className='px-12 font-poppins'>
      <Slider
            value={[ads]}
            onValueChange={(value) => setAds(value[0])}
            className="h-16 cursor-pointer w-full"
            min={100}
            max={10000}
          />
          <div className='font-poppins'>You pay<span className='font-semibold'> &#8377;{ads} </span> + taxes. The sum will be deducted from your wallet.</div>
        
          <div >
          <AlertDialog>
            <AlertDialogTrigger asChild>
            <Button className='bg-blue-600 text-white mt-4 px-12 hover:bg-blue-800' >Confirm</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="font-poppins">
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmation</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want buy these credits for your account? The amount selected will be withdrawn from your wallet.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="text-white" onClick={processCredits}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
    </div>
  )
}

export default BuyAdCredits
