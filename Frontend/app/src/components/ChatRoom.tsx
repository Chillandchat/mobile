import React from "react";
import "./style/ChatRoom.css";
import { InputField } from "./InputField";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/reducers/index";
import { Redirect } from "react-router-dom";
import { SendButton } from "./SendButton";
import { UserBar } from "./UserBar";
import { Logout } from "./Logout";
import { logout, clearUsername } from "../redux/action";

export const ChatRoom: React.FC = () => {
  let users: any;
  const username = useSelector((state: RootState) => {
    return state.username;
  });
  const authenticated = useSelector((state: RootState) => {
    return state.login;
  });
  const dispatch = useDispatch();
  if (authenticated) {
    return (
      <div id="chatRoom">
        <Logout
          onClick={() => {
            dispatch(logout());
            dispatch(clearUsername());
          }}
        />
        <p>Hi {username}! and welcome to chill and chat🚀</p>
        <div id="sendBar">
          <InputField placeholder="Type a message..." />
          <SendButton
            onclick={() => {
              console.log(users);
              console.log("Hello!");
            }}
          />
        </div>
        <UserBar />
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
