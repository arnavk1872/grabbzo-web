import React from "react";
import StompConnection from "@/helpers/stomp";
import RealTimeOrders from "@/components/Orders/RealTimeOrders";

const page = async () => {
  return (
    <>
      <StompConnection />
      <RealTimeOrders orderType="NEW" />
    </>
  );
};

export default page;
