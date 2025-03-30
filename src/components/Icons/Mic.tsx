import React from "react";

interface MicProps {
  className?: string;
}

const Mic: React.FC<MicProps> = ({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="130" height="100" viewBox="0 0 125 126" fill="none">
  <path d="M85.2815 25.0864C98.4701 32.7154 107.343 46.974 107.343 63.3065M85.2815 25.0864V41.2445M85.2815 25.0864H101.44M101.44 85.3684C93.8106 98.557 79.552 107.43 63.2196 107.43M101.44 85.3684H85.2815M101.44 85.3684V101.527M41.1576 101.527C27.969 93.8975 19.0957 79.6389 19.0957 63.3065M41.1576 101.527V85.3684M41.1576 101.527H24.9995M24.9995 41.2445C32.6285 28.0559 46.8871 19.1826 63.2196 19.1826M24.9995 41.2445H41.1576M24.9995 41.2445V25.0864" stroke="#1663DE" strokeWidth="7.0452" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M101.44 85.3684C93.8106 98.557 79.552 107.43 63.2196 107.43M101.44 85.3684H85.2815M101.44 85.3684V101.527M41.1576 101.527C27.969 93.8975 19.0957 79.6389 19.0957 63.3065M41.1576 101.527V85.3684M41.1576 101.527H24.9995M24.9995 41.2445C32.6285 28.0559 46.8871 19.1826 63.2196 19.1826M24.9995 41.2445H41.1576M24.9995 41.2445V25.0864M85.2815 25.0864C98.4701 32.7154 107.343 46.974 107.343 63.3065M85.2815 25.0864V41.2445M85.2815 25.0864H101.44" stroke="#1663DE" strokeWidth="7.0452" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
  );
};

export default Mic;
