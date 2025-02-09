import React from "react";
import Message from "./Message";
import { Input } from "../UI/Input";

const MessageBox = () => {
  const Messages = {
    reciever: "Harsh",
    messages: [
      {
        message: "Hi, How much time to complete my order.",
        time: "9:36 PM",
        sender: false,
      },
      {
        message: "It will take about 30 minutes. Please reach on time",
        time: "9:45 PM",
        sender: true,
      },
    ],
  };
  return (
    <div className="min-w-full bg-white rounded-3xl">
      <h4 className="text-2xl font-medium text-center pt-2 mb-14 border-b-2 pb-4">
        {Messages.reciever}
      </h4>
      <div className="w-full ml-3">
        {Messages.messages.map((message, key) => (
          <Message
            key={key}
            message={message.message}
            time={message.time}
            sender={message.sender}
          />
        ))}
      </div>
      <div className="fixed bottom-4 w-full mr-12">
        <Input className="" placeholder="Message" />
      </div>
    </div>
  );
};

export default MessageBox;
