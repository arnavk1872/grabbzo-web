import React from "react";

interface OrdersDeliveredProps {
  className?: string;
}

const OrdersDelivered: React.FC<OrdersDeliveredProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="33"
      height="34"
      viewBox="0 0 33 34"
      fill="none"
    >
      <path
        d="M16.4295 30.7279V17.0812M16.4295 17.0812L28.3431 10.2032M16.4295 17.0812L4.51592 10.2032M28.7116 22.5508V11.6088C28.7108 11.1326 28.5841 10.6651 28.3445 10.2537C28.1048 9.8422 27.7607 9.50136 27.3469 9.26568L17.7942 3.79606C17.3784 3.55915 16.9081 3.43457 16.4295 3.43457C15.951 3.43457 15.4807 3.55915 15.0649 3.79606L5.51214 9.26568C4.6674 9.75014 4.14746 10.644 4.14746 11.6102V22.5521C4.14746 23.5197 4.6674 24.4122 5.51214 24.8953L15.0649 30.3649C15.4807 30.6018 15.951 30.7264 16.4295 30.7264C16.9081 30.7264 17.3784 30.6018 17.7942 30.3649L27.3469 24.8953C28.1917 24.4108 28.7116 23.517 28.7116 22.5508Z"
        stroke="#1DBF73"
        strokeWidth="1.88955"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default OrdersDelivered;
