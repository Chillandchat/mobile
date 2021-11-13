import React, { useState } from "react";
import "./style/ChatRoom.css";
import { InputField } from "./InputField";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/reducers/index";
import { Redirect } from "react-router-dom";
import { SendButton } from "./SendButton";
import { UserBar } from "./UserBar";
import { Logout } from "./Logout";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { logout, clearUsername } from "../redux/action";

export const ChatRoom: React.FC = () => {
  let [view, setView] = useState<boolean>(false);
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
        <div id="menu">
          <Logout
            onClick={() => {
              dispatch(logout());
              dispatch(clearUsername());
            }}
          />
          <VisibilityIcon
            className="viewButton"
            onClick={() => {
              setView(true);
            }}
          />
        </div>
        <p>Hi {username}! and welcome to chill and chat🚀</p>
        <div id="sendBar">
          <InputField placeholder="Type a message..." />
          <SendButton
            onclick={() => {
              console.log("Hello!");
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
  }
  if (view) {
    return (
      <div>
        <p>HI</p>
      </div>
    );
  }
};
