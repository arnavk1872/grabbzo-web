import React from "react";

interface LaptopProps {
  className?: string;
}

const Laptop: React.FC<LaptopProps> = ({ className }) => {
  return (
    <div>
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="105" viewBox="0 0 100 114" fill="none">
  <path d="M82.0204 76.5844V29.8465C82.0204 28.4696 81.5379 27.149 80.679 26.175C79.8201 25.2009 78.6551 24.6531 77.4399 24.6519H22.4414C21.2262 24.6531 20.0611 25.2009 19.2023 26.175C18.3434 27.149 17.8609 28.4696 17.8609 29.8465V76.5797M10.5156 76.5844H89.2745V82.9955C89.2745 84.7004 88.5822 86.3302 87.3511 87.5326C86.12 88.735 84.4494 89.4113 82.7085 89.4113H17.0816C15.3862 89.4305 13.7402 88.7644 12.439 87.5326C11.8488 86.9783 11.3717 86.2857 11.0403 85.5025C10.709 84.7192 10.5314 83.8639 10.5198 82.9955L10.5156 76.5844Z" stroke="#1663DE" strokeWidth="7.0452" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
</div>
  );
};

export default Laptop;
