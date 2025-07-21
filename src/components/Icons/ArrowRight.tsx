import React from "react";

interface ArrowRightProps {
  className?: string;
}

const ArrowRight: React.FC<ArrowRightProps> = ({ className }) => {
  return (
    <svg
      width="72"
      height="33"
      // viewBox="0 0 72 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="56" cy="16" r="15.5" fill="#F9F9F9" stroke="#EFEFF4" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M53 12.1538L54.125 11L59 16L54.125 21L53 19.8462L56.75 16L53 12.1538Z"
        fill="#8A8A8F"
      />
    </svg>
  );
};

export default ArrowRight;
