import React from "react";

interface MessagesIconProps {
  className?: string;
}

const MessagesIcon: React.FC<MessagesIconProps> = ({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 46 46" fill="none">
    <rect width="46" height="46" rx="16" fill="#F9F9F9"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M15 15V27H19V29L21.667 27H31V15H15ZM17 33V29H15C13.897 29 13 28.103 13 27V15C13 13.897 13.897 13 15 13H31C32.103 13 33 13.897 33 15V27C33 28.103 32.103 29 31 29H22.333L17 33Z" fill="#8A8A8F"/>
  </svg>
  );
};

export default MessagesIcon;
