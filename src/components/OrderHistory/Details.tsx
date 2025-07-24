import React from "react";
import NoDetailsPage from "./NoDetailsPage";
import OrderReceipt from "./OrderRecipt";
import { Order } from "../../../types/type";

interface DetailsProps {
  selectedOrder: Order | null;
}

const Details: React.FC<DetailsProps> = ({ selectedOrder }) => {
  return (
    <div className="flex justify-center items-center w-full">
      {selectedOrder ? (
        <OrderReceipt order={selectedOrder} />
      ) : (
        <NoDetailsPage />
      )}
    </div>
  );
};

export default Details;
