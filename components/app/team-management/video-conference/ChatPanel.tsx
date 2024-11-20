"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";

const ChatPanel = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    setMessages([...messages, newMessage]);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col w-1/3">
      <ScrollArea className="flex-1 p-4 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className="p-2 bg-primary w-fit  my-2 rounded-md text-sm shadow-sm"
          >
            {msg}
          </div>
        ))}
      </ScrollArea>
      <div className="flex p-4 ">
        <Input
          type="text"
          className="flex-1"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <Button variant="default" className="ml-2" onClick={sendMessage}>
          <Send />
        </Button>
      </div>
    </div>
  );
};

export default ChatPanel;
