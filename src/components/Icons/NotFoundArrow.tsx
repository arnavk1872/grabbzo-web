import React from "react";

interface NotFoundArrowProps {
  className?: string;
}

const NotFoundArrow: React.FC<NotFoundArrowProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
    >
      <mask
        id="mask0_236_2058"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="21"
        height="21"
      >
        <path
          d="M0.245117 0.229187H20.2451V20.2292H0.245117V0.229187Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0_236_2058)">
        <path
          d="M20.1882 11.8646C12.8444 14.0156 11.7507 18.0209 11.7507 20.2136H8.32878C8.32878 18.4479 8.8444 14.9011 12.4746 11.9323H0.255859V8.51044H12.4746C8.8444 5.5469 8.32878 2.00002 8.32878 0.229187H11.7507C11.7507 2.4271 12.8444 6.43231 20.1882 8.58335V11.8646Z"
          fill="#FFFCF9"
        />
      </g>
    </svg>
  );
};

export default NotFoundArrow;
