import React from "react";

interface PencilProps {
  className?: string;
}

const Pencil: React.FC<PencilProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="29"
      viewBox="0 0 30 29"
      fill="none"
    >
      <path
        d="M10.8617 24.4687H5.625C5.37636 24.4687 5.1379 24.3733 4.96209 24.2033C4.78627 24.0333 4.6875 23.8028 4.6875 23.5625V18.5004C4.6875 18.3814 4.71175 18.2635 4.75886 18.1536C4.80598 18.0436 4.87503 17.9437 4.96209 17.8595L19.0246 4.2658C19.2004 4.09585 19.4389 4.00037 19.6875 4.00037C19.9361 4.00037 20.1746 4.09585 20.3504 4.2658L25.5871 9.32792C25.7629 9.49787 25.8617 9.72838 25.8617 9.96873C25.8617 10.2091 25.7629 10.4396 25.5871 10.6095L11.5246 24.2033C11.4375 24.2875 11.3342 24.3542 11.2204 24.3998C11.1067 24.4453 10.9848 24.4687 10.8617 24.4687Z"
        stroke="#D6D6D6"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.9375 7.25L22.5 13.5938"
        stroke="#D6D6D6"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.19 24.4108L4.74707 18.1826"
        stroke="#D6D6D6"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Pencil;
