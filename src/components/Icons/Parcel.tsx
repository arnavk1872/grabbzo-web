import React from "react";

interface ParcelProps {
  className?: string;
}

const Parcel: React.FC<ParcelProps> = ({ className }) => {
  return (
    <svg
      width="73"
      height="101"
      viewBox="0 0 73 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M60.7662 3H13.5279C12.6157 3 11.819 3.61732 11.5913 4.5007L3.61216 35.45C3.57011 35.6131 3.54883 35.7809 3.54883 35.9493V87.3744C3.54883 88.3577 4.26366 89.1952 5.23482 89.3496L53.3586 97M60.7662 3L53.3959 40.6139C53.3711 40.7406 53.3586 40.8694 53.3586 40.9984V97M60.7662 3L69.3787 34.157C69.4267 34.3305 69.451 34.5097 69.451 34.6898V86.1642C69.451 86.865 69.0841 87.5148 68.484 87.8768L53.3586 97"
        stroke="#1663DE"
        strokeWidth="6"
      />
      <rect
        x="19.3374"
        y="14.3389"
        width="24.6087"
        height="6.21739"
        rx="3.1087"
        stroke="#1663DE"
        strokeWidth="4"
      />
    </svg>
  );
};

export default Parcel;
