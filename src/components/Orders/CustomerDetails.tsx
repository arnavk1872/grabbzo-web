import React from 'react';

const CustomerDetails = () => {
  return (
    <div className="flex items-center justify-center w-1/2">
      <div className="bg-white border rounded-[40px] flex flex-col items-center w-full ">
 
        <h1 className="font-poppins font-bold text-[22px] mb-4">Harsh Ghai</h1>


        <div className="w-full">
          <div className="bg-[#3F4354] w-full rounded-t-[16px] p-4">
            <h2 className="text-white font-poppins text-[22px] font-semibold mb-2">Order Note</h2>
            <p className="text-white font-poppins text-[12px] text-left">Order ka note</p>
          </div>


          <div className="bg-[#FF704D] rounded-b-[30px] p-4">
            <h2 className="text-white font-poppins text-[22px] font-semibold mb-2 text-center">Customer Arriving Time</h2>
            <p className="text-center text-white font-poppins font-bold">12:22AM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;