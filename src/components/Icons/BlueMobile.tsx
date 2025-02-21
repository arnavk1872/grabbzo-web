import React from "react";

interface BlueMobileProps {
  className?: string;
}

const BlueMobile: React.FC<BlueMobileProps> = ({ className }) => {
  return (
    <svg
      width="15"
      height="14"
      viewBox="0 0 15 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={className}
    >
      <rect width="15" height="14" fill="url(#pattern0_1_10651)" />
      <defs>
        <pattern
          id="pattern0_1_10651"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_1_10651"
            transform="matrix(0.0172414 0 0 0.0184729 0 -0.00800493)"
          />
        </pattern>
        <image
          id="image0_1_10651"
          width="58"
          height="55"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};

export default BlueMobile;
