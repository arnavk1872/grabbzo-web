import React from "react";
interface Bill {
  Subtotal: number;
  Gst: number;
  Platform: number;
}

interface SubtotalProps {
  bill: Bill;
}

const Subtotal: React.FC<SubtotalProps> = ({ bill }) => {
  return (
    <div className="border-b border-gray-300 pb-5 pt-2">
      <div className="flex justify-between items-center">
        <h4 className="text-2xl font-medium">Subtotal</h4>
        <h6 className="text-blue-600 font-bold text-xl">
          {bill.Subtotal.toFixed(2)}
        </h6>
      </div>
      <div className="flex justify-between items-center">
        <h4 className="text-gray-500">GST(18%)</h4>
        <h6 className="text-blue-600 font-medium text-lg">
          {bill.Gst.toFixed(2)}
        </h6>
      </div>
      <div className="flex justify-between items-center">
        <h4 className="text-gray-500">Platflorm fee</h4>
        <h6 className="text-blue-600 font-medium text-lg">
          {bill.Platform.toFixed(2)}
        </h6>
      </div>
    </div>
  );
};

export default Subtotal;
