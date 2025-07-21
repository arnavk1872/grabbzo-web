import React from "react";

interface PickupProps {
  className?: string;
}

const Pickup: React.FC<PickupProps> = ({ className }) => {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M53.5817 13H26.6825C26.163 13 25.7094 13.3515 25.5797 13.8546L21.0361 31.4783C21.0121 31.5711 21 31.6667 21 31.7626V61.0459C21 61.6059 21.4071 62.0828 21.9601 62.1707L49.3636 66.5271M53.5817 13L49.3848 34.4187C49.3707 34.4909 49.3636 34.5642 49.3636 34.6377V66.5271M53.5817 13L58.486 30.7419C58.5133 30.8408 58.5272 30.9428 58.5272 31.0454V60.3568C58.5272 60.7559 58.3183 61.1259 57.9765 61.332L49.3636 66.5271"
        stroke="black"
        strokeWidth="5"
      />
      <rect
        x="29.8516"
        y="19.3176"
        width="14.2909"
        height="3.81817"
        rx="1.90908"
        stroke="black"
        strokeWidth="2"
      />
    </svg>
  );
};

export default Pickup;
