import React from "react";

interface CrownProps {
  className?: string;
}

const Crown: React.FC<CrownProps> = ({ className }) => {
  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="161"
        height="161"
        viewBox="0 0 161 161"
        fill="none"
      >
        <g clipPath="url(#clip0_1563_673)">
          <path
            d="M126.067 65.165L121.525 53.9149C117.958 45.0859 116.173 40.6671 113.828 39.6757C113.229 39.4125 112.585 39.2701 111.931 39.2569C111.277 39.2437 110.628 39.36 110.019 39.5989C107.827 40.4993 106.749 44.8545 104.589 53.5673C103.473 58.0761 102.912 60.326 101.523 61.3526C100.746 61.9234 99.8079 62.2333 98.8436 62.2377C97.0742 62.2605 95.1533 60.8263 91.3007 57.9692L70.9994 42.8863C63.722 37.4808 60.0822 34.7758 57.3964 36.1667C54.7106 37.5575 54.8192 42.0911 55.0341 51.1538L55.6364 76.4377C55.7532 81.235 55.8093 83.6293 54.7696 85.0611C54.2071 85.8437 53.4135 86.4304 52.5003 86.7388C50.8603 87.2809 48.6994 86.44 44.3732 84.7494C36.0107 81.486 31.8317 79.8532 29.8316 81.1234C29.2853 81.4825 28.8154 81.9462 28.4489 82.4876C28.0825 83.0291 27.8267 83.6377 27.6964 84.2783C27.1572 86.7631 29.7355 90.7716 34.8876 98.7797L41.4501 108.983C52.262 125.786 57.6659 134.194 65.6356 136.818C73.5944 139.453 81.3965 135.413 97.0096 127.327L108.981 121.128C124.59 113.045 132.392 109.005 134.842 100.98C137.292 92.955 133.55 83.6917 126.067 65.165Z"
            fill="#FFCC00"
          />
        </g>
        <defs>
          <clipPath id="clip0_1563_673">
            <rect
              width="119"
              height="119"
              fill="white"
              transform="translate(0 54.7214) rotate(-27.3771)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default Crown;
