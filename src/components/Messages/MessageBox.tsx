import React from "react";
import Message from "./Message";
import { Input } from "../UI/Input";

interface MessageBoxProps {
  selectedUser: {
    name: string;
    lastMessage: string;
    time: string;
    newMessageCount: number;
  };
}


const MessageBox: React.FC<MessageBoxProps> = ({ selectedUser }) => {
  const Messages = {
    reciever: selectedUser.name,
    messages: [
      {
        message: "Hi, How much time to complete my order.",
        time: "9:36 PM",
        sender: false,
      },
      {
        message: "It will take about 15 minutes. Please reach on time",
        time: "9:45 PM",
        sender: true,
      },
      
    ],
  };
console.log(selectedUser.name);

  return (
    <div className="flex flex-col justify-between bg-white rounded-3xl w-full font-poppins h-screen">
      <h4 className="text-2xl font-medium text-center mb-14 border-b-2 py-4">
        {Messages.reciever}
      </h4>
      <div className="flex-1 w-full px-4 overflow-y-auto">
        {Messages.messages.map((message, key) => (
          <Message
            key={key}
            message={message.message}
            time={message.time}
            sender={message.sender} 
          />
        ))}
      </div>
      <div className="p-4 border-t">
        <Input placeholder="Message" className="h-12" />
      </div>
    </div>
  );
};

export default MessageBox;
