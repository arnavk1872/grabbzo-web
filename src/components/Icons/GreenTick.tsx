import React from "react";

interface GreenTickProps {
  className?: string;
}

const GreenTick: React.FC<GreenTickProps> = ({ className }) => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M6.25 10L3.125 6.875L4.00625 5.9875L6.25 8.23125L10.9937 3.4875L11.875 4.375M11.875 0.625H3.125C2.43125 0.625 1.875 1.18125 1.875 1.875V9.95625C1.875 10.3875 2.09375 10.7688 2.425 10.9937L7.5 14.375L12.5688 10.9937C12.9 10.7688 13.125 10.3875 13.125 9.95625V1.875C13.125 1.54348 12.9933 1.22554 12.7589 0.991117C12.5245 0.756696 12.2065 0.625 11.875 0.625Z"
        fill="#3AB757"
      />
    </svg>
  );
};

export default GreenTick;
