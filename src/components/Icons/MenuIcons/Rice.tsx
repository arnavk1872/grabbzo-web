import React from "react";

interface RiceProps {
  className?: string;
}

const Rice: React.FC<RiceProps> = ({ className }) => {
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.375 9.18655H21M18.375 14.4365H21M14.4375 11.8115H17.0625M24.9375 11.8115H27.5625M21 11.8115H23.625M5.14502 18.3583C5.14502 24.6583 8.83314 30.0973 14.1698 32.6304V35.279H27.7069V32.6304C30.4069 31.3485 32.688 29.3271 34.2854 26.8009C35.8828 24.2746 36.7311 21.3472 36.7316 18.3583H5.14502ZM33.7601 18.3583C33.7601 11.9533 28.0009 6.76367 20.895 6.76367C13.7891 6.76367 8.02989 11.9559 8.02989 18.3583H33.7601Z" stroke="black" stroke-width="2.625"/>
</svg>


  );
};

export default Rice;
