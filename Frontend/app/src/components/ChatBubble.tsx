import React, { useEffect, useState } from "react";
import { Message } from "./Message";
import { getAllMessage } from "../scripts/getAllMessages";
import "./style/ChatBubble.css";

export const ChatBubble: React.FC = () => {
  let [messages, setMessages] = useState([]);
  useEffect(() => {
    getAllMessage().then((message) => {
      setMessages(message.messages);
    });
  }, []);
  return (
    <div id="chatBubble">
      {messages.map((message) => {
        return (
          <div>
            <Message user={message.user} content={message.content} />
          </div>
        );
      })}
    </div>
  );
};
