import React from "react";

interface BaseProps {
    className?: string;
}

const Base: React.FC<BaseProps> = ({ className }) => {
    return (
        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.3414 7.13653C27.3349 3.38103 31.8586 3.01528 35.3499 3.90603C38.5384 4.72153 39.2769 8.39128 37.7019 11.144C35.1049 15.6818 32.1596 19.7173 26.7871 25.0163C21.5564 30.1735 16.0981 34.4855 10.8709 37.758C8.01314 39.5483 4.20339 37.9505 3.73964 34.5643C3.22689 30.8298 3.40539 26.789 5.58939 24.6348C6.67964 24.6575 9.13139 25.151 11.4694 26.8188M23.3414 7.13653C15.4401 5.25878 12.0906 10.9463 11.9804 14.3413M23.3414 7.13653C25.0319 7.53903 26.9324 8.28628 29.0534 9.47803M5.58939 24.6365C4.12989 18.0915 9.25739 10.381 21.2904 17.1395" stroke="black" stroke-width="2.625" stroke-linecap="round" stroke-linejoin="round" />
        </svg>


    );
};

export default Base;
