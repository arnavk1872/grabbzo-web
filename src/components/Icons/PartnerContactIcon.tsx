import Image from "next/image";
import React from "react";
import { S3_BASE_URL } from "@/lib/constants";

interface PartnerContactIconProps {
  className?: string;
  bgColor?: string;
  borderColor?: string;
}

const PartnerContactIcon: React.FC<PartnerContactIconProps> = ({
  className,
  bgColor = "#D9D9D9",
  borderColor = "8E8E8E",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="62"
      height="62"
      viewBox="0 0 62 62"
      fill="none"
      className={`relative ${className}`}
    >
      <circle
        cx="31"
        cy="31"
        r="29.5"
        fill={bgColor}
        stroke={borderColor}
        strokeWidth="3"
      />
      <foreignObject
        x="9.5"
        y="16"
        width="43"
        height="30"
        className="flex justify-center items-center"
      >
        <div className="w-full h-full flex justify-center items-center">
          <Image
            src={`${S3_BASE_URL}/public/Partner-Contract.png`}
            width={143}
            height={70}
            alt="logo"
            className="object-contain max-w-full max-h-full"
          />
        </div>
      </foreignObject>
    </svg>
  );
};

export default PartnerContactIcon;
