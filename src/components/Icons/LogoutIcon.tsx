import React from "react";

interface LogoutIconProps {
  className?: string;
}

const LogoutIcon: React.FC<LogoutIconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28.8108 38H20.1622C18.973 38 18 37.01 18 35.7752V20.202C18 18.9783 18.973 18 20.1622 18H28.8108C30 18 30.973 18.9783 30.973 20.202V24.6626H28.8108V20.1908H20.1622V35.7975H28.8108V31.3369H30.973V35.7752C30.973 36.9989 30 38 28.8108 38ZM38 27.9997L33.6757 32.4492V29.1121H25.027V26.8873H33.6757V23.5502L38 27.9997Z"
        fill="#8A8A8F"
      />
    </svg>
  );
};

export default LogoutIcon;
