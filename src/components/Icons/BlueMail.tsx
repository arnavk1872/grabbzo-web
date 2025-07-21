import React from "react";

interface BlueMailProps {
  className?: string;
}

const BlueMail: React.FC<BlueMailProps> = ({ className }) => {
  return (
    <svg
      width="15"
      height="12"
      viewBox="0 0 15 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={className}
    >
      <rect width="15" height="12" fill="url(#pattern0_1_10655)" />
      <defs>
        <pattern
          id="pattern0_1_10655"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_1_10655"
            transform="scale(0.0181818 0.0227273)"
          />
        </pattern>
        <image
          id="image0_1_10655"
          width="55"
          height="44"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};

export default BlueMail;
