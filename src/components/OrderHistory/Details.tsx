import React from "react";
import NoDetailsPage from "./NoDetailsPage";
import OrderRecipt from "./OrderRecipt";

const Details = () => {
  return (
    <div className={`${true && "flex justify-center items-center w-full"}`}>
      {false ? <OrderRecipt /> : <NoDetailsPage />}
    </div>
  );
};

export default Details;
