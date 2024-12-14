import React from "react";

interface CrossProps {
  className?: string;
}

const Cross: React.FC<CrossProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-1 -1 16 16"
      fill="none"
      id="Close--Streamline-Majesticons"
      height="24"
      width="24"
    >
      <path
        stroke="red"
        stroke-linecap="round"
        stroke-linejoin="round"
        strokeWidth="2"
        d="M6.999999999999999 6.999999999999999 4.083333333333333 4.083333333333333m2.916666666666666 2.916666666666666 2.916666666666666 2.916666666666666m-2.916666666666666 -2.916666666666666 2.916666666666666 -2.916666666666666m-2.916666666666666 2.916666666666666 -2.916666666666666 2.916666666666666"
      ></path>
    </svg>
  );
};

export default Cross;
