"use client";

import React, { useState } from "react";
import { Input } from "../UI/Input";
import { Button } from "../UI/Button";

const Balance = () => {
  const [amount, setAmount] = useState("");

  return (
    <div className="h-[600px] flex flex-col gap-y-12 items-center font-poppins py-2 border-borderColor bg-white rounded-md p-4">
      <div className="text-center">
        <div className="font-bold text-[24px]">Withdraw Money</div>
        <div>Available for Withdrawl</div>
        <div>₹0</div>
      </div>

      <div className="text-center">
        <div>Enter Amount</div>
        <Input
          placeholder="₹0"
          className="border-none text-center"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div className="text-center p-4 border border-borderColor rounded-md bg-blue-200 text-gray-500">
        It may take  to 2-4 days to complete this transaction
      </div>

      <Button className="bg-blue-500 text-white">Withdraw Money</Button>
    </div>
  );
};

export default Balance;
