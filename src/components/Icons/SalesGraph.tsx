import React from "react";

interface SalesGraphProps {
  className?: string;
}
const data = [
    { x: 22, y: 100 },
    { x: 56, y: 94 },
    { x: 111, y: 101 },
    { x: 164, y: 60 },
    { x: 211, y: 125 },
    { x: 357, y: 7 },
    { x: 449, y: 0 },
    { x: 530, y: 91 },
    { x: 603, y: 46 },
    { x: 704, y: 142 }
  ];

  let pathD = `M ${data[0].x} ${data[0].y} `;
for (let i = 1; i < data.length; i++) {
  pathD += `L ${data[i].x} ${data[i].y} `;
}
pathD += 'L 704 179 L 0 179 Z'; // Close the path to fill area below the curve

const SalesGraph: React.FC<SalesGraphProps> = ({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="704" height="179" viewBox="0 0 704 179" fill="none">

    <path opacity="0.2" fill-rule="evenodd" clip-rule="evenodd" 
          d="M0 100.744C13.9905 105.392 40.5756 94.2451 56.0365 94.2451C71.4974 94.2451 96.044 112.116 111.078 101.514C132.305 86.546 129.124 59.974 164.824 59.974C200.525 59.974 213.234 125.236 261.022 125.236C308.81 125.236 308.81 79.3225 357.847 79.287C413.681 79.2465 409.726 0 449.673 0C489.619 0 501.947 91.4779 530.428 91.4779C563.283 91.4779 562.521 46.4329 603.528 46.4329C644.535 46.4329 663.967 141.927 704 141.927C704 151.056 704 179 704 179H0C0 179 0 110.708 0 100.744Z" 
          fill="url(#gradient1)"/>

    <path opacity="0.2" fill-rule="evenodd" clip-rule="evenodd" 
          d={pathD} 
          fill="url(#gradient2)"/>
 
    <defs>
      <linearGradient id="gradient1" x1="726.423" y1="179" x2="726.423" y2="0" gradientUnits="userSpaceOnUse">
        <stop stop-color="#FF6961" stop-opacity="0.01"/>
        <stop offset="1" stop-color="#FF6961"/>
      </linearGradient>
      <linearGradient id="gradient2" x1="726.423" y1="161.128" x2="726.423" y2="0" gradientUnits="userSpaceOnUse">
        <stop stop-color="#FFCC00" stop-opacity="0.01"/>
        <stop offset="1" stop-color="#FFCC00"/>
      </linearGradient>
    </defs>
  </svg>
  
  );
};

export default SalesGraph;
