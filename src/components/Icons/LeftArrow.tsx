import React from "react";

interface LeftArrowProps {
  className?: string;
}

const LeftArrow: React.FC<LeftArrowProps> = ({ className }) => {
  return (
    <svg width="72" height="32" viewBox="0 0 72 32" fill="none" xmlns="http://www.w3.org/2000/svg">
   
    <circle cx="16" cy="16" r="15.5" fill="#F9F9F9" stroke="#EFEFF4"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M19 12.1538L15.25 16L19 19.8462L17.875 21L13 16L17.875 11L19 12.1538Z" fill="#8A8A8F"/>
    </svg>
    
  );
};

export default LeftArrow;
