"use client";

import Header from "@/components/Dashboard/Header";
import Balance from "@/components/wallet/Balance";
import Withdraw from "@/components/wallet/Withdraw";
import WithdrawlHistory from "@/components/wallet/WithdrawlHistory";
import React, { useState, useCallback } from "react";

const WalletPage = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refreshWithdrawals = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  return (
    <>
      <Header storeStatus={false} />
      <h1 className="hidden">Wallet Page</h1>
      <div className="px-8 sm:flex justify-between">
        <div className="sm:w-3/4 px-4 max-sm:py-6">
          <Withdraw />
          <WithdrawlHistory refreshTrigger={refreshTrigger} />
        </div>

        <Balance onWithdrawalSuccess={refreshWithdrawals} />
      </div>
    </>
  );
};

export default WalletPage;
