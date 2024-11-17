import React from "react";

interface TruckProps {
  className?: string;
}

const Truck: React.FC<TruckProps> = ({ className }) => {
  return (
    <svg
      width="52"
      height="46"
      viewBox="0 0 52 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="52" height="46" fill="black" fill-opacity="0.01" />
    </svg>
  );
};

export default Truck;
