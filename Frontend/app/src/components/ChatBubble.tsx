//Importing packages
import React, { useEffect, useState, useRef } from "react";
import { Message } from "./Message";
import { Message as MessageType } from "../scripts/types";
import dotenv from "dotenv";
import { io } from "socket.io-client";
import { getAllMessage } from "../scripts/getAllMessages";
import "./style/ChatBubble.css";

//SocketIO connection
const socket = io(process.env.REACT_APP_WEBSOCKET_URL);

//Chat bubble component
export const ChatBubble: React.FC = () => {
  //Show message handler reference
  const showMessageHandler = useRef<any>(null);

  //Message state
  let [messages, setMessages] = useState<Array<MessageType | any>>([]);

  //Use effect to run code
  useEffect(() => {
    //Get all messages from api
    getAllMessage().then((message) => {
      //Set state
      setMessages(message.messages);
    });

    //Env configuration
    dotenv.config();

    /*eslint-disable-next-line*/
  }, []);

  useEffect(() => {
    //SocketIO listener
    socket.on("message", (chatMessage: MessageType) => {
      //New message variable
      let newMessage: Array<MessageType> = messages;

      //Assign and set message
      newMessage = [...messages, chatMessage];
      setMessages([]);
      setMessages(newMessage);
    });
    /*eslint-disable-next-line*/
  });

  useEffect(() => {
    //Scroll handler
    showMessageHandler.current.scrollIntoView();
  }, [messages]);

  //Render messages
  return (
    <div id="chatBubble">
      {messages.map((message) => {
        //Render no message
        if (message == []) {
          return <div></div>;
        }
        //Render messages
        else {
          return (
            <div>
              {/*Message*/}
              <Message
                key={message.id}
                user={message.user}
                content={message.content}
              />
            </div>
          );
        }
      })}
      {/*Scroll handler*/}
      <div ref={showMessageHandler} id="showMessageHandler" />
    </div>
  );
};
