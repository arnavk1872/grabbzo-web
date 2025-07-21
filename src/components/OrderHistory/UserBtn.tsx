import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../Dashboard/Avatar";

type UserBtnProps = {
  orderNumber: number;
  date: string;
  amount: number;
};

const UserBtn: React.FC<UserBtnProps> = ({ orderNumber, date, amount }) => {
  return (
    <div className="flex justify-evenly cursor-pointer hover:bg-gray-200 p-3 rounded-3xl">
      <Avatar className="size-14">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>You</AvatarFallback>
      </Avatar>
      <div>
        <span className="text-lg font-medium"># {orderNumber}</span>
        <p className="text-sm text-gray-500">{date}</p>
      </div>
      <p className="text-start font-medium">Rs. {amount.toFixed(2)}</p>
    </div>
  );
};

export default UserBtn;
