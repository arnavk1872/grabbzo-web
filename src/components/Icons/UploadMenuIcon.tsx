import React from "react";

interface UploadMenuIconProps {
  className?: string;
}

const UploadMenuIcon: React.FC<UploadMenuIconProps> = ({ className }) => {
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
        d="M31 31H27V20H31V31ZM21 15H25V31H21V15ZM15 19H19V31H15V19ZM27 18V14C27 13.449 26.552 13 26 13H20C19.448 13 19 13.449 19 14V17H14C13.448 17 13 17.449 13 18V32C13 32.553 13.448 33 14 33H20H26H32C32.552 33 33 32.553 33 32V19C33 18.449 32.552 18 32 18H27Z"
        fill="#8A8A8F"
      />
    </svg>
  );
};

export default UploadMenuIcon;
