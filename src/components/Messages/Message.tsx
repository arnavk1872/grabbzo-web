import React from "react";

type MessageProps = {
  message: string;
  time: string;
  sender: boolean;
};

const Message: React.FC<MessageProps> = ({ message, time, sender }) => {
  return (
    <div>
      <div className={`flex ${sender ? "justify-end" : "items-end"}`}>

        {/* <div className="flex flex-col"> */}
        <div
          className={`${
            sender
              ? "bg-blue-500 text-white rounded-bl-full"
              : "bg-blue-100 text-black rounded-br-full"
          } p-5 rounded-t-full max-w-xs`}
        >
          <p>{message}</p>
        </div>
      </div>
      <p
        className={`text-gray-400 text-sm mt-3 ${
          sender ? "text-end" : "pl-2"
        }`}
      >
        {time}
      </p>
      {/* </div> */}
    </div>
  );
};

export default Message;
