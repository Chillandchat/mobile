import React from "react";
import "./style/ChatRoom.css";
import { InputField } from "./InputField";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers/index";
import { Redirect } from "react-router-dom";
import { SendButton } from "./SendButton";

export const ChatRoom: React.FC = () => {
  const username = useSelector((state: RootState) => {
    return state.username;
  });
  const authenticated = useSelector((state: RootState) => {
    return state.login;
  });

  if (authenticated) {
    return (
      <div id="chatRoom">
        <p>Hi {username}! and welcome to chill and chat🚀</p>
        <div id="sendBar">
          <InputField placeholder="Type a message..." />
          <SendButton
            onclick={() => {
              console.log("Hello world!");
            }}
          />
        </div>
      </div>
    );
  }
  if (!authenticated) {
    return (
      <div>
        <Redirect to="/" />
      </div>
    );
  } else {
    return (
      <div>
        <p>Error</p>
      </div>
    );
  }
};
