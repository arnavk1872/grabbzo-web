"use client";

import React, { useState } from "react";
import { Input } from "../UI/Input";
import { Button } from "../UI/Button";
import { usePageStore } from "@/store/CurrentPage";
import { requestPayout } from "@/helpers/api-utils";
import { useSnackbar } from "notistack";

interface BalanceProps {
  onWithdrawalSuccess?: () => void;
}

const Balance: React.FC<BalanceProps> = ({ onWithdrawalSuccess }) => {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { walletDetails, setWalletDetails } = usePageStore();
  const { enqueueSnackbar } = useSnackbar();

  const handleWithdraw = async () => {
    // Validate amount
    const withdrawAmount = parseFloat(amount);
    
    if (!amount || isNaN(withdrawAmount) || withdrawAmount <= 0) {
      enqueueSnackbar("Please enter a valid amount", {
        variant: "error",
        className: "font-poppins",
      });
      return;
    }

    if (withdrawAmount > (walletDetails?.Wallet || 0)) {
      enqueueSnackbar("Insufficient balance for withdrawal", {
        variant: "error", 
        className: "font-poppins",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await requestPayout(withdrawAmount);
      enqueueSnackbar("Withdrawal request submitted successfully!", {
        variant: "success",
        className: "font-poppins",
      });
      setAmount(""); // Clear the input after successful request
      
      // Update wallet balance in store
      const newBalance = (walletDetails?.Wallet || 0) - withdrawAmount;
      setWalletDetails({
        ...walletDetails,
        Wallet: newBalance
      });
      
      // Trigger refresh of withdrawal history
      if (onWithdrawalSuccess) {
        onWithdrawalSuccess();
      }
    } catch (error: any) {
      console.error("Withdrawal error:", error);
      const errorMessage = error?.message || "Failed to process withdrawal request";
      enqueueSnackbar(errorMessage, {
        variant: "error",
        className: "font-poppins",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[600px] flex flex-col gap-y-12 items-center font-poppins py-2 border-borderColor bg-white rounded-md p-4">
      <div className="text-center">
        <div className="font-bold text-[24px]">Withdraw Money</div>
        <div>Available for Withdrawal</div>
        <div>₹{walletDetails?.Wallet}</div>
      </div>

      <div className="text-center">
        <div>Enter Amount</div>
        <Input
          placeholder="₹0"
          className="border-none text-center"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          disabled={isLoading}
        />
      </div>

      <div className="text-center p-4 border border-borderColor rounded-md bg-blue-200 text-gray-500">
        It may take 2-4 days to complete this transaction
      </div>

      <Button 
        className="bg-blue-500 text-white" 
        onClick={handleWithdraw}
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Withdraw Money"}
      </Button>
    </div>
  );
};

export default Balance;
