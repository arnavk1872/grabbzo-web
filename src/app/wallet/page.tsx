import Header from "@/components/Dashboard/Header";
import Balance from "@/components/wallet/Balance";
import Withdraw from "@/components/wallet/Withdraw";
import WithdrawlHistory from "@/components/wallet/WithdrawlHistory";
import React from "react";

const page = () => {
  return (
    <>
      <Header />
      <div className="px-8 flex justify-between">
        <div className="w-3/4 px-4">
          <Withdraw />
          <WithdrawlHistory />
        </div>

        <Balance />
      </div>
    </>
  );
};

export default page;
