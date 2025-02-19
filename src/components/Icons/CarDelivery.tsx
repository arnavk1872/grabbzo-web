import React from "react";

interface CarDeliveryProps {
  className?: string;
}

const CarDelivery: React.FC<CarDeliveryProps> = ({ className }) => {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M63.3337 56.6666H70.0003C72.0003 56.6666 73.3337 55.3333 73.3337 53.3333V43.3333C73.3337 40.3333 71.0003 37.6666 68.3337 36.9999C62.3337 35.3333 53.3337 33.3333 53.3337 33.3333C53.3337 33.3333 49.0003 28.6666 46.0003 25.6666C44.3337 24.3333 42.3337 23.3333 40.0003 23.3333H16.667C14.667 23.3333 13.0003 24.6666 12.0003 26.3333L7.33366 35.9999C6.89226 37.2873 6.66699 38.6389 6.66699 39.9999V53.3333C6.66699 55.3333 8.00033 56.6666 10.0003 56.6666H16.667"
        stroke="black"
        strokeWidth="6.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.3337 63.3333C27.0156 63.3333 30.0003 60.3486 30.0003 56.6667C30.0003 52.9848 27.0156 50 23.3337 50C19.6518 50 16.667 52.9848 16.667 56.6667C16.667 60.3486 19.6518 63.3333 23.3337 63.3333Z"
        stroke="black"
        strokeWidth="6.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30 56.6665H50"
        stroke="black"
        strokeWidth="6.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M56.6667 63.3333C60.3486 63.3333 63.3333 60.3486 63.3333 56.6667C63.3333 52.9848 60.3486 50 56.6667 50C52.9848 50 50 52.9848 50 56.6667C50 60.3486 52.9848 63.3333 56.6667 63.3333Z"
        stroke="black"
        strokeWidth="6.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CarDelivery;
