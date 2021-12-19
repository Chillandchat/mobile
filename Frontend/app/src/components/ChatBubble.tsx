// Importing packages
import React, { useEffect, useState, useRef } from "react";
import { Message } from "./Message";
import { RootState } from "../redux/reducers/index";
import {
  Message as MessageType,
  MessageListReturnType,
} from "../scripts/types";
import dotenv from "dotenv";
import { io } from "socket.io-client";
import { getAllMessage } from "../scripts/getAllMessages";
import "./style/ChatBubble.css";
import { notify } from "../scripts/notify";
import { useSelector } from "react-redux";

// SocketIO connection
const socket = io(process.env.REACT_APP_WEBSOCKET_URL);

// Chat bubble component
export const ChatBubble: React.FC = () => {
  // Show message handler reference
  const showMessageHandler = useRef(null);

  // Redux state
  const username = useSelector((state: RootState): RootState => {
    return state.username;
  });

  // Message state
  let [messages, setMessages] = useState<Array<MessageType | []>>([]);

  // Use effect to run code
  useEffect((): void => {
    // Get all messages from api
    getAllMessage().then((message: MessageListReturnType): void => {
      // Set state
      setMessages(message.messages);
    });

    // Env configuration
    dotenv.config();
  }, []);

  useEffect((): void => {
    // SocketIO listener
    socket.on("message", (chatMessage: MessageType) => {
      // New message variable
      let newMessage: Array<MessageType | []> = messages;

      // Notify user
      if ("Notification" in window) {
        if (chatMessage.user !== "SYSTEM" || chatMessage.user !== username) {
          notify({
            tittle: "You have a new message from Chill&chat!",
            body: `${chatMessage.user} says: ${chatMessage.content}`,
          });
        }
      }
      // Assign and set message
      newMessage = [...messages, chatMessage];
      setMessages([]);
      setMessages(newMessage);
    });
  });

  useEffect((): void => {
    // Scroll handler
    showMessageHandler.current.scrollIntoView();
  }, [messages]);

  // Render messages
  return (
    <div id="chatBubble">
      {messages.map((message: MessageType): any => {
        // Render messages
        return (
          <div>
            {/*Message*/}
            <Message
              key={message.id}
              user={message.user}
              content={message.content}
              verified={message.verified}
            />
          </div>
        );
      })}
      {/*Scroll handler*/}
      <div ref={showMessageHandler} id="showMessageHandler" />
    </div>
  );
};
