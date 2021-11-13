//Importing packages
import React, { useState } from "react";
import "./style/ChatRoom.css";
import { InputField } from "./InputField";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/reducers/index";
import { Redirect } from "react-router-dom";
import { SendButton } from "./SendButton";
import { UserBar } from "./UserBar";
import { Menu } from "./Menu";

//Chat room component
export const ChatRoom: React.FC = () => {
  //State
  let [view, setView] = useState(false);
  //Redux state
  const username = useSelector((state: RootState) => {
    return state.username;
  });
  const authenticated = useSelector((state: RootState) => {
    return state.login;
  });

  //Render user component
  if (view) {
    return (
      <div>
        {/*UserBar*/}
        <UserBar
          viewOnClick={() => {
            //Change state 
            setView(false);
          }}
        />
      </div>
    );
  }
  //Redirect user if not authenticated
  if (!authenticated) {
    return (
      <div>
        {/*Redirect user*/}
        <Redirect to="/" />
      </div>
    );
  }
  //Render default component
  return (
    <div id="chatRoom">
      {/*Menu*/}
      <Menu
        viewOnClick={() => {
          //Change state
          setView(true);
        }}
      />
      {/*Send bar*/}
      <div id="sendBar">
        {/*Input field*/}
        <InputField placeholder="Type a message..." />
        {/*Send button*/}
        <SendButton
          onclick={() => {
            //TODO - Send message
            console.log("Hello!");
          }}
        />
      </div>
    </div>
  );
};
