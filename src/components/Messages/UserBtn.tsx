import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../Dashboard/Avatar";

type UserBtnProps = {
  name: string;
  lastMessage: string;
  time: string;
  newMessageCount: number;
};

const UserBtn: React.FC<UserBtnProps> = ({
  name,
  lastMessage,
  time,
  newMessageCount,
}) => {
  return (
    <div className="flex justify-evenly cursor-pointer hover:bg-gray-200 p-3 rounded-3xl">
      <Avatar className="size-14">
        <AvatarImage  />
        <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <span className="text-lg font-semibold">{name}</span>
        <p className="text-sm text-gray-500">{lastMessage}</p>
      </div>
      <p className="text-start text-gray-500">{time}</p>
    </div>
  );
};

export default UserBtn;
