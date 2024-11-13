import React from "react";

interface CustomerRevIconProps {
  className?: string;
}

const CustomerRevIcon: React.FC<CustomerRevIconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="46"
      height="46"
      viewBox="0 0 46 46"
      fill="none"
    >
      <rect width="46" height="46" rx="16" fill="#F9F9F9" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.0003 16.25C21.7595 16.25 20.7503 17.258 20.7503 18.5C20.7503 19.7409 21.7595 20.75 23.0003 20.75C24.2412 20.75 25.2503 19.7409 25.2503 18.5C25.2503 17.258 24.2412 16.25 23.0003 16.25ZM23.0003 23C20.5186 23 18.5003 20.9818 18.5003 18.5C18.5003 16.0182 20.5186 14 23.0003 14C25.4821 14 27.5003 16.0182 27.5003 18.5C27.5003 20.9818 25.4821 23 23.0003 23ZM16.4289 29.75H29.5723C28.8984 27.716 26.384 26.375 23 26.375C19.616 26.375 17.1016 27.716 16.4289 29.75ZM32 32H14V30.875C14 26.9004 17.7013 24.125 23 24.125C28.2999 24.125 32 26.9004 32 30.875V32Z"
        fill="#8A8A8F"
      />
    </svg>
  );
};

export default CustomerRevIcon;
