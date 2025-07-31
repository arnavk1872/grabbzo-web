import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../Dashboard/Avatar";

type UserBtnProps = {
  orderNumber: number;
  date: string;
  amount: number;
};

// Generate a random Dicebear avatar URL using orderNumber as seed
const getRandomAvatar = (orderNumber: number): string => {
  const styles = ['adventurer', 'avataaars', 'big-ears', 'bottts', 'croodles', 'fun-emoji', 'micah', 'miniavs', 'personas', 'pixel-art'];
  const randomStyle = styles[orderNumber % styles.length];
  const seed = `order-${orderNumber}`;
  return `https://api.dicebear.com/7.x/${randomStyle}/svg?seed=${seed}`;
};

const UserBtn: React.FC<UserBtnProps> = ({ orderNumber, date, amount }) => {
  const avatarUrl = getRandomAvatar(orderNumber);

  return (
    <div className="flex justify-evenly cursor-pointer hover:bg-gray-200 p-3 rounded-3xl">
      <Avatar className="size-14">
        <AvatarImage src={avatarUrl} alt={`Order ${orderNumber} avatar`} />
        <AvatarFallback>#{orderNumber}</AvatarFallback>
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
