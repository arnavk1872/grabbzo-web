import React from "react";

interface DiningProps {
  className?: string;
}

const Dining: React.FC<DiningProps> = ({ className }) => {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.5 53.3834H72.5M68.8333 53.3834C68.8333 37.46 55.925 24.55 40 24.55C24.075 24.55 11.1667 37.46 11.1667 53.3834"
        stroke="black"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M40 25L40 20"
        stroke="black"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 59.5H73"
        stroke="black"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Dining;
