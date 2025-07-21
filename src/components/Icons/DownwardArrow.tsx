import React from "react";

interface DownwardArrowProps {
  className?: string;
}

const DownwardArrow: React.FC<DownwardArrowProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="15"
      viewBox="0 0 22 15"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.4615 0L22 2.8125L11 15L0 2.8125L2.53846 0L11 9.375L19.4615 0Z"
        fill="#8A8A8F"
      />
    </svg>
  );
};

export default DownwardArrow;
