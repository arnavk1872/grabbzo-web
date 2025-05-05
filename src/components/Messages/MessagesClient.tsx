// components/Messages/MessagesClient.jsx
"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import MessageBox from "./MessageBox";

interface UserType {
    name: string;
    lastMessage: string;
    time: string;
    newMessageCount: number;
  }
  

const MessagesClient: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  return (
    <div className="flex mb-8 justify-between w-full">
      <Sidebar setSelectedUser={setSelectedUser} />
      {selectedUser ? (
        <MessageBox selectedUser={selectedUser} />
      ) : (
        <div className="flex justify-center items-center w-full font-poppins text-[24px]">
          Select a conversation to start messaging
        </div>
      )}
    </div>
  );
};

export default MessagesClient;
