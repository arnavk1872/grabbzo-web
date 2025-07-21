import React from "react";

interface MenuVisitsProps {
  className?: string;
}

const MenuVisits: React.FC<MenuVisitsProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="23"
      height="30"
      viewBox="0 0 23 30"
      fill="none"
    >
      <path
        d="M5.39609 7.46963H9.49922M5.39609 14.6501H17.7055M5.39609 18.7532H17.7055M5.39609 22.8563H9.49922M3.34453 27.9853H19.757C20.3011 27.9853 20.823 27.7691 21.2077 27.3844C21.5924 26.9996 21.8086 26.4778 21.8086 25.9337V3.3665C21.8086 2.8224 21.5924 2.30057 21.2077 1.91583C20.823 1.53109 20.3011 1.31494 19.757 1.31494H3.34453C2.80042 1.31494 2.2786 1.53109 1.89386 1.91583C1.50911 2.30057 1.29297 2.8224 1.29297 3.3665V25.9337C1.29297 26.4778 1.50911 26.9996 1.89386 27.3844C2.2786 27.7691 2.80042 27.9853 3.34453 27.9853Z"
        stroke="#1DBF73"
        strokeWidth="2.05157"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MenuVisits;
